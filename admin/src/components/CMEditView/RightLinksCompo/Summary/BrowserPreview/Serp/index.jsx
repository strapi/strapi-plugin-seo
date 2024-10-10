import { Box, Typography, Flex } from '@strapi/design-system';

export const Serp = ({ metaTitle, metaDescription }) => {
  const metaTitleToDisplay =
    metaTitle.length > 60 ? `${metaTitle.substring(0, 56)} ...` : metaTitle;
  const metaDescriptionToDisplay =
    metaDescription.length > 160 ? `${metaDescription.substring(0, 156)} ...` : metaDescription;

  return (
    <Box padding={4} background="neutral100" width={"580px"}>
      <Typography variant="beta" textColor="primary600">
        {metaTitleToDisplay}
      </Typography>
      <Flex marginTop={1}>
        <Typography variant="pi" textColor="neutral600">
          {metaDescriptionToDisplay}
        </Typography>
      </Flex>
    </Box>
  );
};
