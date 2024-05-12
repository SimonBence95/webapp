import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { PotterEditorStatus } from './potter-editor-form';
import doneIcon from '../../images/done.svg';

export interface PotterEditorFeedbackProps {
  status: PotterEditorStatus;
}

export const PotterEditorFeedback: FC<PotterEditorFeedbackProps> = ({ status }) => {
  const isError = status === PotterEditorStatus.ERROR
  const statusText = (() => {
    if (isError) {
      return 'A módosítás során hiba történt, kérjük próbálja újból!';
    }
    return status === PotterEditorStatus.ADDED
      ? 'A film sikeresen hozzáadásra került az adatbázisba'
      : 'A film módosítása sikeresen megtörtént';
  })();
  return (
    <VStack gap={8}>
      {isError ? (
        <IconButton
          as={Box}
          icon={<CloseIcon />}
          aria-label=''
          backgroundColor="text.highlighted"
          color="text.default"
          borderRadius="50%"
          fontSize="3xl"
          height="2.1334em"
          width="2.1334em"
        />
      ) : (
        <Image src={doneIcon} width="4em" />
      )}
      <Heading fontSize="4xl" textTransform="uppercase">{isError ? 'Hoppá!' : 'Gratulálunk'}</Heading>
      <Text fontSize="xl" maxWidth="15em" textAlign="center">{statusText}</Text>
    </VStack>
  );
};
