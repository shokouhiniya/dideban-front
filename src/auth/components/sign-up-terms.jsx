import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }) {
  return (
    <Box
      component="span"
      sx={[
        () => ({
          mt: 3,
          display: 'block',
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      با ثبت‌نام، با{' '}
      <Link underline="always" color="text.primary">
        شرایط استفاده
      </Link>
      {' و '}
      <Link underline="always" color="text.primary">
        حریم خصوصی
      </Link>
      {' موافقت می‌کنید.'}
    </Box>
  );
}
