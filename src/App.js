import React, { Component } from 'react';
import { AppRouter } from './routes';
import './App.css';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

const keycloak = new Keycloak();

class App extends Component {
  render() {
    return <KeycloakProvider keycloak={keycloak}>(
      <AppRouter />
    )</KeycloakProvider>;
  }
}

export default App;
