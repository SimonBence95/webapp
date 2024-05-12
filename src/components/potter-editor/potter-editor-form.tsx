import { CalendarIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, FormEvent } from 'react';
import { GenreSelector } from './genre-selector';
import { Genre, Potter} from '../../models';
import { useFormik } from 'formik';
import { potterValidationSchema } from './potter-validation-schema';
import { PotterEditorFeedback } from './potter-editor-feedback';

const numberInputStyle = {
  backgroundColor: "interactive.input.background.default",
  borderColor: "transparent",
  _hover: {
    borderColor: 'background.medium'
  },
};

export interface PotterEditorFormProps {
  potter: Potter | null;
  onCancel: () => void;
  onSubmit: (potter: Potter) => Promise<Potter>;
}

export enum PotterEditorStatus {
  ADDED = 'added',
  UPDATED = 'updated',
  ERROR = 'error',
};

export const PotterEditorForm: FC<PotterEditorFormProps> = ({ potter, onCancel, onSubmit }) => {
  const { status, errors, isSubmitting, isValid, isValidating, values, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik<Potter>({
    initialValues: potter || {
      title: '',
      tagline: '',
      vote_average: undefined,
      release_date: new Date(),
      poster_path: '',
      overview: '',
      budget: undefined,
      revenue: undefined,
      genres: [],
      runtime: 0,
    },
    onSubmit: async (potterValue, { setSubmitting, setValues, setStatus }) => {
      try {
        const result = await onSubmit(potterValue);
        if (potter) {
          setValues(result);
        }
        setStatus(potter ? PotterEditorStatus.UPDATED : PotterEditorStatus.ADDED);
      } catch (error) {
        setStatus(PotterEditorStatus.ERROR);
      } finally {
        potter && setSubmitting(false);
      }
    },
    onReset: onCancel,
    validationSchema: potterValidationSchema,
  });

  if (status) {
    return <PotterEditorFeedback status={status} />;
  }

  return (
    <VStack
      as="form"
      spacing="8"
      onSubmit={(event: FormEvent<HTMLDivElement>) => handleSubmit(event as unknown as FormEvent<HTMLFormElement>)}
      noValidate
    >
      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors.title} isRequired={true}>
          <FormLabel>Film címe</FormLabel>
          <Input name="title" onChange={handleChange} value={values.title} />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.release_date} isRequired={true} flexBasis="35%" flexShrink={0}>
          <FormLabel>Bemutató ideje</FormLabel>
          <InputGroup>
            <Input
              type="date"
              placeholder="Bemutató ideje"
              name="release_date"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFieldValue('release_date', new Date(event.target.value));
              }}
              value={values.release_date?.toISOString().split('T')[0]}
            />
            <InputRightElement>
              <CalendarIcon color="text.highlighted" />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{`${errors.release_date}`}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors.poster_path} isRequired={true}>
          <FormLabel>Poszter</FormLabel>
          <Input type="url" placeholder="https://" name="poster_path" onChange={handleChange} value={values.poster_path} />
          <FormErrorMessage>{errors.poster_path}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.vote_average} flexBasis="35%" flexShrink={0}>
          <FormLabel>Értékelés</FormLabel>
          <NumberInput
            name="vote_average"
            onChange={(_, voteAverage) => setFieldValue('vote_average', voteAverage)}
            value={values.vote_average}
            min={0} max={10} precision={1} step={0.1}
          >
            <NumberInputField placeholder="" sx={numberInputStyle} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.vote_average}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors.genres}>
          <FormLabel>Típus *</FormLabel>
          <GenreSelector value={values.genres} onChange={(genres: Genre[] | null) => setFieldValue('genres', genres ?? [])} />
          <FormErrorMessage>{errors.genres}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.runtime} flexBasis="35%" flexShrink={0}>
          <FormLabel>Hossz</FormLabel>
          <NumberInput
            name="runtime"
            onChange={(_, runtime) => setFieldValue('runtime', runtime)}
            value={values.runtime}
            min={0}
          >
            <NumberInputField placeholder="perc" sx={numberInputStyle} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.runtime}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors.overview} isRequired={true}>
        <FormLabel>Összegzés</FormLabel>
        <Textarea
          name="overview"
          onChange={handleChange}
          value={values.overview}
          placeholder="Potter description"
          resize="none"
          rows={8}
        />
        <FormErrorMessage>{errors.overview}</FormErrorMessage>
      </FormControl>

      <ButtonGroup width="full" justifyContent="flex-end" gap={3} paddingTop={8} isDisabled={isSubmitting}>
        <Button type="reset" variant="secondary" size="lg" onClick={handleReset}>Mégsem</Button>
        <Button
          type="submit"
          size="lg"
          isDisabled={isSubmitting || !isValid || isValidating || status === PotterEditorStatus.ADDED}
        >Mentés</Button>
      </ButtonGroup>
    </VStack>
  );
}