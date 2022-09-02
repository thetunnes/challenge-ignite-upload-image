import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      lessThan10MB: (img) => img[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
      // acceptedFormats: (img) => img[0].type.includes(regex) || 'Somente são aceitos arquivos PNG, JPEG e GIF'
    },
    title: { required: true, minLength: 2, maxLength: 20 },
    description: { required: true, maxLength: 65 },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (formData) => {
      console.log(formData)
      const response = await api.post('/api/images', formData);
    },
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
    watch
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {

      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description: 'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.'
        })
        return
      }

      data.url = imageUrl

      mutation.mutateAsync(data, {onSuccess: toast({
        title: 'Imagem cadastrada',
        description: 'Sua imagem foi cadastrada com sucesso.'
      })})
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem'
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      setImageUrl(null);
      setLocalImageUrl(null);
      reset()
      closeModal();
    }
  };

  let regex = '[^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$';

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>

        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', {
            required: true, validate: formValidations.image
          })}
          error={errors.image}
        // TODO SEND IMAGE ERRORS
        // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', formValidations.title)}
          error={errors.title}

        // TODO SEND TITLE ERRORS
        // TODO REGISTER TITLE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
          error={errors.description}

        // TODO SEND DESCRIPTION ERRORS
        // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
