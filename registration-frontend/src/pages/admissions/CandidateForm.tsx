import { CheckCircleIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Button, Flex, VStack } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CandidateData, UpdateCandidateDto } from '../../api/model/candidate.model'
import { TextField } from '../../components/form-elements/TextField'

type Props = {
  sendButtonText: string
  onSend: (dto: UpdateCandidateDto) => void
  data: CandidateData
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

export const CandidateForm = ({ sendButtonText, onSend, data, isSendLoading }: Props) => {
  const defaultValues: UpdateCandidateDto = data.candidate

  const navigate = useNavigate()
  const methods = useForm<UpdateCandidateDto>({ mode: 'all' })
  const {
    handleSubmit,
    watch,
    register,
    formState: { isValid, errors }
  } = methods

  const onSubmit: SubmitHandler<UpdateCandidateDto> = (values) => {
    onSend(values)
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={defaultValues.phoneNumber}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="phoneNumber"
          fieldTitle="Mobil telefonszám"
          helper={<>Csupán szakkollégista társaid számára lesz elérhető.</>}
        />
        <TextField
          defaultValue={defaultValues.neptunCode}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true,
            pattern: {
              value: /^[A-Z0-9]{6}$/,
              message: 'Helytelen formátum.'
            }
          }}
          fieldName="neptunCode"
          fieldTitle="Neptun kód"
        />
        <TextField
          defaultValue={defaultValues.nickName}
          validationOptions={{
            maxLength: 64,
            minLength: 1
          }}
          fieldName="nickName"
          fieldTitle="Becenév"
        />
        <TextField
          defaultValue={defaultValues.dormRoom}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            pattern: {
              value: /^([A-Z]*\-[A-Z]*\d*)|(külsős)$/,
              message: 'Helytelen formátum.'
            }
          }}
          fieldName="dormRoom"
          fieldTitle="Kollégiumi szobaszám"
          helper={<>Pl.: SCH-1315, VPK-A132, külsős</>}
        />
        <TextField
          defaultValue={defaultValues.universityFaculty}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="universityFaculty"
          fieldTitle="Oktatási intézmény neve"
          helper={<>Rövidítéssel, egyetemi kart is jelölve. Pl.: BME-VIK</>}
        />
        {/** <FormControl>
          <FormLabel htmlFor="programmeName">Képzés neve</FormLabel>
          <Select {...register('programmeName', { required: true })}>
            <option value="option1">mérnökinformatikus</option>
            <option value="option2">villamosmérnök</option>
            <option value="option3">üzemmérnök-informatikus</option>
            <option value="option3">egészségügyi mérnök</option>
            <option value="option3">gazdaságinformatikus</option>
            <option value="option3">űrmérnök</option>
            <option value="option3">egyéb</option>
          </Select>
        </FormControl> */}
        {/** Same with Képzési szint programmeLevel */}
        <TextField
          defaultValue={defaultValues.programmeStartSemester}
          validationOptions={{
            required: true,
            pattern: /^[0-9]{4}\/[0-9]{2}\/(1|2)$/
          }}
          fieldName="programmeStartSemester"
          fieldTitle="Képzés kezdésének féléve"
          helper={<>Pl.: 2020/21/1</>}
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
