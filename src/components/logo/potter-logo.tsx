import React, { FC } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Heading, Link, Text } from '@chakra-ui/react';
export const PotterLogo: FC = () => (
  <Link
    as={NavLink}
    to="/"
    _hover={{
      textDecoration: "none",
    }}
  >
    <Heading fontSize="xl" color="text.highlighted">
      <Text as="span" fontWeight="black">harry</Text>
      <Text as="span" fontWeight="medium">potter</Text>
    </Heading>
  </Link>
);
