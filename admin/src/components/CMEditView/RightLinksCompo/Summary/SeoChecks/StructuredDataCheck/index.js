import React, { useEffect, useContext } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../../Summary';

const StructuredDataCheck = ({ structuredData, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.structuredDataCheck.default'),
      defaultMessage:
        'A Structured Data json has been found! However we can validate the accuracy of its content.',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isEmpty(structuredData)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.structuredDataCheck.not-found'),
          defaultMessage: 'No Structured Data json has been found.',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.structuredData))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'structuredData' },
      });
  }, []);

  return (
    <SEOAccordion
      title="JSON Structured Data"
      status={checks.structuredData}
      label={formatMessage({
        id: getTrad('SEOChecks.structuredDataCheck.label'),
        defaultMessage:
          'Structured data is a standardized format for providing information about a page and classifying the page content.',
      })}
    />
  );
};

export default StructuredDataCheck;
