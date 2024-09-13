import React, { useEffect, useContext } from 'react';
import { useIntl } from 'react-intl';

import _ from 'lodash';

import { Box } from '@strapi/design-system';

import SEOAccordion from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

const StructuredDataCheck = ({ structuredData, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.structuredDataCheck.default'),
      defaultMessage:
        'A Structured Data json has been found! However we can validate the accuracy of its content.',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  useEffect(() => {
    if (_.isEmpty(structuredData)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.structuredDataCheck.not-found'),
          defaultMessage: 'No Structured Data json has been found.',
        }),
        qualityVerdict: qualityVerdict.bad,
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
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.structured-data'),
        defaultMessage: 'JSON Structured Data',
      })}
      status={checks.structuredData}
      label={formatMessage({
        id: getTrad('SEOChecks.structuredDataCheck.label'),
        defaultMessage:
          'Structured data is a standardized format for providing information about a page and classifying the page content.',
      })}
      component={<Box padding={2}></Box>}
    />
  );
};

export default StructuredDataCheck;
