import React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';

interface Skill {
  value: string;
  label: string;
  logo: string;
}

interface SelectMultipleAppearanceProps {
  options: Skill[];
  value: string[];
  onChange: (event: unknown, newValue: string[]) => void;
}

const SelectMultipleAppearance: React.FC<SelectMultipleAppearanceProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      multiple
      value={value}
      onChange={onChange}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
          {selected.map((selectedOption) => {
            const option = options.find((opt) => opt.value === (selectedOption as unknown as string));
            return (
              <Chip
                key={selectedOption as unknown as string}
                variant="soft"
                color="primary"
                startDecorator={
                  <img
                    src={option?.logo}
                    alt={option?.label}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                }
              >
                {option?.label}
              </Chip>
            );
          })}
        </Box>
      )}
      sx={{ minWidth: '15rem' }}
      slotProps={{
        listbox: {
          sx: {
            width: '100%',
          },
        },
      }}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={option.logo}
              alt={option.label}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            {option.label}
          </Box>
        </Option>
      ))}
    </Select>
  );
};

export default SelectMultipleAppearance;
