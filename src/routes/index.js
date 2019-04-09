import { mount, route, lazy, map, redirect } from 'navi';
import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import '@patternfly/react-core/dist/styles/base.css';

import { withKeycloak } from 'react-keycloak';

import Oldhome from '../pages/Oldhome';
import Home from '../pages/Home';

import { withAuthentication } from './utils';

// Define your routes
const routes = mount({
  '/oldhome': withAuthentication(
    route({
      title: 'Home',
      view: <Oldhome />
    })
  ),
  '/home': 
    route({
      title: 'Home',
      view: <Home />
    }
  ),
  '/login': map(async (request, context) =>
    context.isAuthenticated
      ? redirect(
          // Redirect to the value of the URL's `redirectTo` parameter. If no
          // redirectTo is specified, default to `/home`.
          request.params.redirectTo ? decodeURIComponent(request.params.redirectTo) : '/home'
        )
      : lazy(() => import('../pages/Login'))
  ),
  '/': redirect('/login')
});

export const AppRouter = withKeycloak(({ keycloak }) => {
  return (
    <Router routes={routes} context={{ isAuthenticated: keycloak.authenticated }}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
});