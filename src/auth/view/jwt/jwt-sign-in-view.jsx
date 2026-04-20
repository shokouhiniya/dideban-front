'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { getErrorMessage } from '../../utils';
import { FormHead } from '../../components/form-head';
import { signInWithPassword } from '../../context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'ایمیل الزامی است' })
    .email({ message: 'ایمیل معتبر وارد کنید' }),
  password: zod
    .string()
    .min(1, { message: 'رمز عبور الزامی است' })
    .min(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();
  const showPassword = useBoolean();
  const { checkUserSession } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState(null);

  const defaultValues = { email: '', password: '' };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();
      router.push(paths.dashboard.submit);
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  });

  return (
    <>
      <FormHead
        title="ورود به دیده‌بان"
        description={
          <>
            حساب کاربری ندارید؟{' '}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              ثبت‌نام کنید
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text
            name="email"
            label="ایمیل"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
            <Link
              component={RouterLink}
              href="#"
              variant="body2"
              color="inherit"
              sx={{ alignSelf: 'flex-end' }}
            >
              فراموشی رمز عبور؟
            </Link>

            <Field.Text
              name="password"
              label="رمز عبور"
              placeholder="حداقل ۶ کاراکتر"
              type={showPassword.value ? 'text' : 'password'}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <Iconify
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="در حال ورود..."
          >
            ورود
          </Button>

          <Divider sx={{ my: 0 }}>
            <Typography variant="body2" color="text.secondary">
              یا
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => router.push(paths.dashboard.search)}
            startIcon={<Iconify icon="solar:users-group-rounded-bold" />}
          >
            بدون ورود، شناخت افراد
          </Button>
        </Box>
      </Form>
    </>
  );
}
