import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AuthSplitSection({
  sx,
  layoutQuery = 'md',
  title = 'دیده‌بان',
  subtitle = 'پایش هوشمند مواضع، وعده‌ها و کارنامه رجال سیاسی بر اساس متدولوژی اصالت متن.',
  ...other
}) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(0deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)})`,
              `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
            ],
          }),
          px: 3,
          pb: 3,
          width: 1,
          maxWidth: 480,
          display: 'none',
          position: 'relative',
          pt: 'var(--layout-header-desktop-height)',
          [theme.breakpoints.up(layoutQuery)]: {
            gap: 6,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
          }}
        >
          <Iconify icon="solar:eye-bold-duotone" width={32} sx={{ color: 'common.white' }} />
        </Box>

        <Typography variant="h3" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box
        component="img"
        alt="Dashboard illustration"
        src={`${CONFIG.assetsDir}/assets/illustrations/illustration-dashboard.webp`}
        sx={{ width: 1, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 2 }}
      />
    </Box>
  );
}
