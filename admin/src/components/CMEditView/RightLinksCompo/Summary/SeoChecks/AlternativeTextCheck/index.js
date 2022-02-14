import React, { useEffect, useContext } from 'react';

import _ from 'lodash';

import { Box } from '@strapi/design-system/Box';
import { Icon } from '@strapi/design-system/Icon';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';

import Dot from '@strapi/icons/Dot';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../../Summary';

const AlternativeTextCheck = ({
  intersections,
  richTextAlts,
  altTexts,
  checks,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.alternativeTextCheck.default'),
      defaultMessage: 'All your images contain an alt attribute! Congrats!',
    }),
    color: 'success',
  };

  useEffect(() => {
    const missingRichTextAlt = richTextAlts.filter(
      (x) => x.occurences != 0
    ).length;

    if (intersections === 0) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.intersection-zero'),
          defaultMessage:
            'The name and the alternative text of your images are all the same. Strapi automatically generate the alt attribute from the name by default if the field was empty during the media upload. Having alt attribute clearly describing images is a very good practice.',
        }),
        color: 'warning',
      };
    } else if (altTexts.includes('')) {
      const count = altTexts.filter((x) => x === '').length;
      status = {
        message: `${count} ${formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.intersection-negative'),
          defaultMessage:
            'Some images from a media field are missing an alt attribute.',
        })}`,
        color: 'danger',
      };
    } else if (missingRichTextAlt >= 1) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.richtext-missing-one'),
          defaultMessage:
            'At least one image in any 1st level richtext editor is missing an alt attribute.',
        }),
        color: 'danger',
      };
    }
    if (!_.isEqual(status, checks.alternativeText))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'alternativeText' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Alt"
      status={checks.alternativeText}
      label={formatMessage({
        id: getTrad('SEOChecks.alternativeTextCheck.label'),
        defaultMessage:
          'This will check if you have any missing alternative text for your images (media fields) and in your 1st level richtext editors.',
      })}
      component={
        <Box padding={2}>
          {richTextAlts.map((alt, index) => (
            <Stack
              key={index}
              size={2}
              horizontal
              background="neutral0"
              padding={3}
            >
              <Icon
                aria-hidden={true}
                colors={(theme) => ({
                  rect: {
                    fill: _.get(
                      theme,
                      `colors.${alt.occurences === 0 ? 'success' : 'danger'}600`
                    ),
                  },
                })}
                as={Dot}
              />
              <Typography>
                {alt.occurences}{' '}
                {formatMessage({
                  id: getTrad('SEOChecks.alternativeTextCheck.missing-text'),
                  defaultMessage:
                    'missing alt in the following richtext field:',
                })}{' '}
                {alt.field}
              </Typography>
            </Stack>
          ))}
        </Box>
      }
    />
  );
};

export default AlternativeTextCheck;
