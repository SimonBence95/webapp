import React, { FC } from 'react';
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { Potter } from '../../models';
import { Rating } from './rating';

export interface PotterDescriptionProps {
  potter: Potter;
}

const formatRuntime = (runtime: number | null): string => {
  if (!runtime) {
    return "";
  }
  const runtimeMins = runtime % 60;
  const runtimeHours = Math.round((runtime - runtimeMins) / 60);
  return `${runtimeHours}h ${runtimeMins}min`;
};

export const PotterDescription: FC<PotterDescriptionProps> = ({ potter }) => {
  return (
    <Box as="article" bgColor="background.dark" pb="7" pt="9" px="16">
      <Flex justifyContent="space-between" gap={10}>
        <AspectRatio ratio={323 / 486} flexBasis="30%" flexShrink={0}>
          <Image src={potter.poster_path} />
        </AspectRatio>
        <Box flexGrow={1}>
          <Box as="header" marginBottom={8}>
            <HStack spacing={6}>
              <Heading fontSize="4xl" textTransform="uppercase">{potter.title}</Heading>
              <Rating rate={potter.vote_average} />
            </HStack>
            {potter.tagline && <Text>{potter.tagline}</Text>}
          </Box>
          <HStack as="time" spacing={12} color="text.highlighted" fontSize="2xl" mb="7">
            <Text as="span">{potter.release_date.getFullYear()}</Text>
            <Text as="span">{formatRuntime(potter.runtime)}</Text>
          </HStack>
          <Text fontSize="xl" opacity={0.5}>{potter.overview}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
