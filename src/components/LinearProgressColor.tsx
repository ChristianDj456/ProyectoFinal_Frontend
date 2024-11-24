import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { VariantProp } from '@mui/joy/styles';

export default function LinearProgressColors() {
  const [variant] = React.useState<VariantProp>('plain');

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 3 }}>
      <Stack spacing={2} sx={{ flex: 1 }}>
        <LinearProgress color="primary" variant={variant} />
      </Stack>
    </Box>
  );
}
