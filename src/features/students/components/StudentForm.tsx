import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import {
  InputField,
  RadioGroupField,
  SelectField,
} from 'components/FormFields';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

export interface StudentFormProps {
  initialValue: Student;
  onSubmit: (student: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name !')
    .test('two-words', 'Name too short ! Least two words', (value) => {
      if (!value) return true;
      const parts = value.split(' ');

      return parts.filter((x) => !!x).length >= 2;
    }),
  age: yup
    .number()
    .positive()
    .integer()
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .required('Please enter age !')
    .typeError('Age is number'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select valid gender !')
    .required('Please select gender !'),
  mark: yup
    .number()
    .max(10, 'Max is 10')
    .min(0, 'Min is 0')
    .required('Please enter mark !')
    .typeError('Mark is number'),
  city: yup.string().required('Please select city !'),
});

export default function StudentForm({
  initialValue,
  onSubmit,
}: StudentFormProps) {
  const cityOption = useAppSelector(selectCityOption);
  const [error, setError] = React.useState<string>('');

  const handleFormSubmit = async (student: Student) => {
    try {
      await onSubmit?.(student);
    } catch (error) {
      setError(error.message);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELD */}
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <SelectField
          name="city"
          control={control}
          label="City"
          options={cityOption}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
