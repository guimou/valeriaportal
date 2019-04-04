import { mount, route, lazy, map, redirect } from 'navi';
import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';

import { withKeycloak } from 'react-keycloak';

import HomePage from '../pages/Home';

import { withAuthentication } from './utils';

// Define your routes
const routes = mount({
  '/home': withAuthentication(
    route({
      title: 'Home',
      view: <HomePage />
    })
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