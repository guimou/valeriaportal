import React from 'react';

import { useKeycloak } from 'react-keycloak';

export default () => {
  const keycloak = useKeycloak();

  return (
    <div>
      <div>{`User is ${!keycloak.authenticated ? 'NOT ' : ''}authenticated`}</div>
      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  );
};