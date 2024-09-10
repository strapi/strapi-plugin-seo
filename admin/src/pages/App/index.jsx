/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from '@strapi/strapi/admin';

import { HomePage } from '../HomePage';
import pluginId from '../../pluginId';
import { pluginPermissions } from '../../permissions';

export const App = () => {
  return (
    <Page.Protect permissions={pluginPermissions.main}>
      <Routes>
        <Route path={`/plugins/${pluginId}`} element={<HomePage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </Page.Protect>
  );
};
