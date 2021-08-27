import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: string | number;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string | number;
  disable?: boolean;

  options: SelectOption[];
}

export function SelectField({
  name,
  label,
  control,
  disable,
  options,
}: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      disabled={disable}
      error={invalid}
      fullWidth
      variant="outlined"
      size="small"
      margin="normal"
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>

      <Select
        labelId={`${name}-label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {options.map((option: SelectOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
