import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { VariantProp } from '@mui/joy/styles';


export default function AlertColors() {
  const [variant] = React.useState<VariantProp>('solid');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Stack spacing={1} sx={{ width: '100%', maxWidth: 400 }}>
        <Alert variant={variant} color="danger">
          Error al Cargar los Datos
        </Alert>
      </Stack>
    </Box>
  );
}
