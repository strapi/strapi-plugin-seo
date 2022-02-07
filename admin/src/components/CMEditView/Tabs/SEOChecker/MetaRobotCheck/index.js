import React, { useContext, useState, useEffect } from 'react';

import _ from 'lodash';

import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../utils';

import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Icon } from '@strapi/design-system/Icon';
import { Typography } from '@strapi/design-system/Typography';

import Dot from '@strapi/icons/Dot';

import SEOAccordion from '../SEOAccordion';

import { SeoCheckerContext } from '../../../RightLinksCompo/Summary';

const robotTags = [
  { name: 'noindex', message: 'Search engines will index this page.' },
  {
    name: 'nofollow',
    message: 'Search engines will follow links from this page',
  },
  { name: 'noarchive', message: 'Search engines will cache your page.' },
  {
    name: 'nosnippet',
    message:
      'Search engines will show a snippet of this page in search results.',
  },
  {
    name: 'noimageindex',
    message: 'Google will index the images on this page.',
  },
  {
    name: 'nositelinkssearchbox',
    message: 'Google will show the search box in search results.',
  },
];

const MetaRobotCheck = ({ metaRobots, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.metaRobotsCheck.default'),
      defaultMessage: 'Robot meta tags have been found!',
    }),
    color: 'success',
  };
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (_.isNull(metaRobots) || _.isEmpty(metaRobots)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaRobotsCheck.not-found'),
          defaultMessage: 'No Robot meta tags have been found.',
        }),
        color: 'success',
      };
    } else {
      setTags(metaRobots.split(','));
    }
    if (!_.isEqual(status, checks.metaRobots))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaRobots' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Meta Robots"
      status={checks.metaRobots}
      label={formatMessage({
        id: getTrad('SEOChecks.metaRobotsCheck.label'),
        defaultMessage:
          'The robots meta tag informs search engines which pages on your site should be indexed and more.',
      })}
      component={
        <Box padding={2}>
          {robotTags.map((tag, index) => (
            <Stack
              size={2}
              key={index}
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
                      `colors.${
                        tags.find((x) => x.trim() === tag.name)
                          ? `warning`
                          : `success`
                      }600`
                    ),
                  },
                })}
                as={Dot}
              />
              <Typography>
                {tags.find((x) => x.trim() === tag.name)
                  ? `${tag.name} is activated:
          ${tag.message.replace('will', 'will not')}`
                  : `${tag.name} is disabled: ${tag.message}`}
              </Typography>
            </Stack>
          ))}
        </Box>
      }
    />
  );
};

export default MetaRobotCheck;
