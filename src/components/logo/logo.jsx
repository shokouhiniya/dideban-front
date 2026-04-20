'use client';

import { mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export function Logo({ sx, disabled, className, href = '/', isSingle = true, ...other }) {

  const singleLogo = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        bgcolor: 'primary.main',
      }}
    >
      <Iconify icon="solar:eye-bold-duotone" sx={{ color: 'common.white', width: '60%', height: '60%' }} />
    </Box>
  );

  const fullLogo = (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Box
        sx={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor: 'primary.main',
          flexShrink: 0,
        }}
      >
        <Iconify icon="solar:eye-bold-duotone" sx={{ color: 'common.white', width: 18, height: 18 }} />
      </Box>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ color: 'text.primary', lineHeight: 1 }}
      >
        دیده‌بان
      </Typography>
    </Stack>
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="دیده‌بان"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 40,
          height: 40,
          ...(!isSingle && { width: 'auto', height: 36 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
