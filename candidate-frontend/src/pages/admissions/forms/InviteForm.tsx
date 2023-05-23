import { CheckCircleIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Checkbox, Flex, FormControl, FormHelperText, FormLabel, VStack } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CommunityString, CreateInviteDto, InviteModel } from '../../../api/model/invite.model'
import { CheckboxGroupField } from '../../../components/form-elements/CheckboxGroupField'
import { TextField } from '../../../components/form-elements/TextField'

type Props = {
  sendButtonText: string
  onSend: (dto: CreateInviteDto) => void
  defaultValues?: InviteModel
  isSendLoading: boolean
}

type CommunitiesBooleans = {
  ac: boolean
  bss: boolean
  ha5kfu: boolean
  kirdev: boolean
  mgmt: boolean
  lego: boolean
  sem: boolean
  spot: boolean
  schdesign: boolean
}

type FormValuesType = {
  supposedEmail: string
  supposedFirstName: string
  supposedLastName: string
  communities: CommunitiesBooleans
  needsOralExam: boolean
}

export const InviteForm = ({ sendButtonText, onSend, defaultValues, isSendLoading }: Props) => {
  const navigate = useNavigate()
  const methods = useForm<FormValuesType>({ mode: 'all' })
  const {
    handleSubmit,
    watch,
    register,
    formState: { isValid, errors }
  } = methods

  const onSubmit: SubmitHandler<FormValuesType> = (values) => {
    const comms = Object.keys(values.communities).filter((key) => values.communities[key as keyof CommunitiesBooleans]) as CommunityString[]
    onSend({
      supposedEmail: values.supposedEmail,
      supposedFirstName: values.supposedFirstName,
      supposedLastName: values.supposedLastName,
      communities: comms,
      needsOralExam: !!values.needsOralExam
    })
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={defaultValues?.supposedEmail}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true,
            pattern: { value: /\S+@\S+\.\S+/, message: 'Nem megfelelő email cím.' }
          }}
          fieldName="supposedEmail"
          fieldTitle="Felvételiző email címe"
          helper={<>Erre a címre fog kimenni a meghívó.</>}
        />
        <TextField
          defaultValue={defaultValues?.supposedLastName}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="supposedLastName"
          fieldTitle="Vezetéknév"
        />
        <TextField
          defaultValue={defaultValues?.supposedFirstName}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="supposedFirstName"
          fieldTitle="Keresztnév"
          helper={<>Több keresztnév esetén szóközzel elválasztva.</>}
        />
        <CheckboxGroupField
          defaultSelectedValues={defaultValues?.communities}
          fieldName="communities"
          fieldTitle="Körök, amelyek ÍRÁSBELI felvételijét megírja:"
          helper={<>Lehet több is, lehet, hogy egyiket sem, mert már korábban sikeresen megírta.</>}
        />
        <FormControl>
          <FormLabel htmlFor="needsOralExam">SZÓBELI felvételit is tesz:</FormLabel>
          <Checkbox colorScheme="green" value="1" {...register(`needsOralExam`)} defaultChecked>
            Igen, szóbelit is fog tenni
          </Checkbox>
          <FormHelperText>
            Abban az esetben, hogyha korábbi felvételi során kapott Simonyis megajánlottat, hagyd bepipálatlanul a checkboxot.
          </FormHelperText>
        </FormControl>
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
