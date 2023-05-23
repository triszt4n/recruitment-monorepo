import { Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormHelperText, FormLabel, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  fieldName: string
  fieldTitle?: string
  helper?: JSX.Element
  defaultSelectedValues?: string[]
  required?: boolean
}

const COMMS = [
  { value: 'ac', label: 'AC Studio & Live' },
  { value: 'bss', label: 'Budavári Schönherz Stúdió' },
  { value: 'ha5kfu', label: 'HA5KFU Rádióamatőr Klub' },
  { value: 'lego', label: 'LEGO Kör' },
  { value: 'kirdev', label: 'Kir-Dev' },
  { value: 'mgmt', label: 'MGMT Kör' },
  { value: 'sem', label: 'Schönherz Elektronikai Műhely' },
  { value: 'spot', label: 'SPOT Fotókör' },
  { value: 'schdesign', label: 'schdesign' }
]

export const CheckboxGroupField: React.FC<Props> = ({ fieldTitle, fieldName, helper, required, defaultSelectedValues }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl isRequired={required} isInvalid={!!errors[fieldName]}>
      {fieldTitle && <FormLabel htmlFor={fieldName}>{fieldTitle}</FormLabel>}
      <CheckboxGroup defaultValue={defaultSelectedValues}>
        <VStack align="stretch" px={2} py={1}>
          {COMMS.map(({ value, label }) => (
            <Checkbox
              colorScheme="green"
              value={value}
              key={value}
              {...register(`${fieldName}.${value}`, { required: required ? 'Kötelező mező' : false })}
            >
              {label}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
      {errors?.[fieldName] ? (
        <FormErrorMessage>{errors[fieldName]?.message?.toString()}</FormErrorMessage>
      ) : (
        helper && <FormHelperText>{helper}</FormHelperText>
      )}
    </FormControl>
  )
}
