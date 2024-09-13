/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Page,
  private_AutoReloadOverlayBlockerProvider as AutoReloadOverlayBlockerProvider,
} from '@strapi/strapi/admin';

import { HomePage } from '../HomePage';
import { pluginPermissions } from '../../permissions';

export const App = () => {
  return (
    <AutoReloadOverlayBlockerProvider>
      <Page.Protect permissions={pluginPermissions.main}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </Page.Protect>
    </AutoReloadOverlayBlockerProvider>
  );
};
