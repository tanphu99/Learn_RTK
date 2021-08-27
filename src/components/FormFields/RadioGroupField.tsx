import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormHelperText } from '@material-ui/core';

export interface OptionGroup {
  label?: string;
  value: string | number;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string | number;
  disable?: boolean;

  options: OptionGroup[];
}

export function RadioGroupField({
  name,
  label,
  control,
  disable,
  options,
}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      component="fieldset"
      disabled={disable}
      error={invalid}
      margin="normal"
    >
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option: OptionGroup) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
