import React, { useState } from 'react';

import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
} from '@strapi/design-system/Accordion';

import { Box } from '@strapi/design-system/Box';
import { Icon } from '@strapi/design-system/Icon';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';

import Dot from '@strapi/icons/Dot';
import Information from '@strapi/icons/Information';

import styled from 'styled-components';

const SEOAccordion = ({ title, status, component, label }) => {
  const [expanded, setExpanded] = useState(false);

  const CustomAccordionToggle = styled(AccordionToggle)`
    z-index: auto;
  `;

  return (
    <AccordionGroup>
      <Accordion
        expanded={expanded}
        toggle={() => setExpanded((s) => !s)}
        id="acc-1"
        size="S"
      >
        <CustomAccordionToggle
          title={title}
          togglePosition="left"
          startIcon={
            <Icon
              aria-hidden={true}
              colors={(theme) => ({
                rect: {
                  fill: _.get(theme, `colors.${status?.color}600`),
                },
              })}
              as={Dot}
            />
          }
          action={<IconButton label={label} icon={<Information />} />}
        />
        <AccordionContent>
          <Box paddingLeft={4} paddingTop={4}>
            <Typography variant="omega">{status?.message}</Typography>
          </Box>
        </AccordionContent>

        {component && <AccordionContent>{component}</AccordionContent>}
      </Accordion>
    </AccordionGroup>
  );
};

export default SEOAccordion;
