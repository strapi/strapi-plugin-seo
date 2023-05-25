/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound, CheckPagePermissions } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

import pluginPermissions from '../../permissions';

const App = () => {
  return (
    <CheckPagePermissions permissions={pluginPermissions.main}>
      <div>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </CheckPagePermissions>
  );
};

export default App;
