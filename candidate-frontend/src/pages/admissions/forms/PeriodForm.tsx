import { CheckCircleIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Flex, VStack } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PeriodModel } from '../../../api/model/period.model'
import { TextField } from '../../../components/form-elements/TextField'

type Props = {
  sendButtonText: string
  onSend: (title: string) => void
  defaultValues?: PeriodModel
  isSendLoading: boolean
}

export const PeriodForm = ({ sendButtonText, onSend, defaultValues, isSendLoading }: Props) => {
  const navigate = useNavigate()
  const methods = useForm<{ title: string }>({ mode: 'all' })
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = methods

  const onSubmit: SubmitHandler<{ title: string }> = (values) => {
    onSend(values.title)
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={defaultValues?.title}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="title"
          fieldTitle="Felvételi időszak címe"
          helper={<>Félévet jelöl általában.</>}
        />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Button variant="outline" leftIcon={<ChevronLeftIcon />} colorScheme="green" onClick={() => navigate(-1)} type="button">
            Vissza
          </Button>
          <Button disabled={!isValid} rightIcon={<CheckCircleIcon />} colorScheme="green" isLoading={isSendLoading} type="submit">
            {sendButtonText}
          </Button>
        </Flex>
      </VStack>
    </FormProvider>
  )
}
