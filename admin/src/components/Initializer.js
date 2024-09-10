/**
 *
 * Initializer
 *
 */
import * as React from 'react';
import pluginId from '../pluginId';

export const Initializer = ({ setPlugin }) => {
  const ref = React.useRef(undefined);
  ref.current = setPlugin;

  React.useEffect(() => {
    if (ref.current) {
      ref.current(pluginId);
    }
  }, []);

  return null;
};
