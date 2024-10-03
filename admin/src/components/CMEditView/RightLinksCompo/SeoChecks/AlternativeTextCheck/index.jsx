import * as React from 'react';
import { useIntl } from 'react-intl';

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import { Box, Flex, Typography, Status } from '@strapi/design-system';
import { More } from '@strapi/icons';

import { getTrad } from '../../../../../utils/getTrad';

import { SEOAccordion } from '../SEOAccordion';

import { SeoCheckerContext } from '../../Summary';
import { qualityVerdict } from '../../../utils/checks';

export const AlternativeTextCheck = ({ intersections, richTextAlts, altTexts, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.alternativeTextCheck.default'),
      defaultMessage: 'All your images contain an alt attribute! Congrats!',
    }),
    qualityVerdict: qualityVerdict.good,
  };

  React.useEffect(() => {
    const missingRichTextAlt = richTextAlts.filter((x) => x.occurences != 0).length;

    if (intersections === 0) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.intersection-zero'),
          defaultMessage:
            'The name and the alternative text of your images are all the same. Strapi automatically generate the alt attribute from the name by default if the field was empty during the media upload. Having alt attribute clearly describing images is a very good practice.',
        }),
        qualityVerdict: qualityVerdict.bad,
      };
    } else if (altTexts.includes('')) {
      const count = altTexts.filter((x) => x === '').length;
      status = {
        message: `${count} ${formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.intersection-negative'),
          defaultMessage: 'Some images from a media field are missing an alt attribute.',
        })}`,
        qualityVerdict: qualityVerdict.improvements,
      };
    } else if (missingRichTextAlt >= 1) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.alternativeTextCheck.richtext-missing-one'),
          defaultMessage:
            'At least one image in any 1st level richtext editor is missing an alt attribute.',
        }),
        qualityVerdict: qualityVerdict.improvements,
      };
    }
    if (!isEqual(status, checks.alternativeText))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'alternativeText' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.alt-attributes'),
        defaultMessage: 'Alternative Text',
      })}
      status={checks.alternativeText}
      label={formatMessage({
        id: getTrad('SEOChecks.alternativeTextCheck.label'),
        defaultMessage:
          'This will check if you have any missing alternative text for your images (media fields) and in your 1st level richtext editors.',
      })}
      component={
        <Box padding={2}>
          {richTextAlts.map((alt, index) => (
            <Flex key={index} spacing={2} horizontal background="neutral0" padding={2}>
              <More
                aria-hidden={true}
                colors={(theme) => ({
                  rect: {
                    fill: get(theme, `colors.${alt.occurences === 0 ? 'success' : 'danger'}600`),
                  },
                })}
              />

              <Typography>
                <Typography fontWeight="bold">{alt.occurences} </Typography>
                {formatMessage({
                  id: getTrad('SEOChecks.alternativeTextCheck.missing-text'),
                  defaultMessage: 'missing alt in the following richtext field:',
                })}
                <Typography fontWeight="bold"> {alt.field}</Typography>
              </Typography>
            </Flex>
          ))}
          <Flex spacing={2} paddingTop={4} paddingLeft={2} paddingRight={2} paddingBottom={4}>
            <Status variant="secondary" showBullet={false}>
              <Typography>
                <Typography fontWeight="bold">Tip: </Typography>
                Implement a rule in your front-end code that uses the name of your images if the
                <Typography fontWeight="bold"> alternativeText </Typography>
                field is empty to further reduce the risk of an empty alt attribute on your website.
              </Typography>
            </Status>
          </Flex>
        </Box>
      }
    />
  );
};
