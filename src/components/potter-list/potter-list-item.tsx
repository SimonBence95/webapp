import { AspectRatio, Box, Flex, Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Link as NavLink } from 'react-router-dom';
import { Potter } from '../../models';
import { useAuthContext } from '../../auth/auth.context';
import { PotterListItemMenu } from './potter-list-item-menu';

export interface PotterListItemProps {
  potter: Potter;
}

export const PotterListItem: FC<PotterListItemProps> = ({ potter }) => {
  const { user } = useAuthContext();  

  return (
    <Box position="relative">
      {user && <PotterListItemMenu potter={potter} />}
      <LinkBox>
        <AspectRatio ratio={322 / 455} marginBottom={7}>
          <Image src={potter.poster_path} />
        </AspectRatio>
        <Flex justifyContent="space-between" opacity={0.5}>
          <LinkOverlay as={NavLink} to={`/potter/${potter.id}`}>
            <Heading
              as="header"
              flexGrow={1}
              gap={2}
              display="flex"
              flexDirection="column"
            >
              <Text as="h4" fontSize="lg" fontWeight="medium">{potter.title}</Text>
              {potter.tagline && <Text fontSize="sm">{potter.tagline}</Text>}
            </Heading>
          </LinkOverlay>
          <Text sx={{
            border: "solid 1px",
            borderColor: "border.default",
            borderRadius: 4,
            fontSize: "sm",
            height: 8,
            paddingX: 2,
            paddingY: 1,
          }}>
            {potter.release_date.getFullYear()}
          </Text>
        </Flex>
      </LinkBox>
    </Box>
  );
};