'use client';

import { useRef } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'solar:document-text-bold-duotone',
    title: 'اصالت متن',
    desc: 'هر نمره مستقیماً به یک نقل‌قول صریح متصل است. بدون نیت‌خوانی، بدون حدس و گمان.',
    color: '#2065D1',
  },
  {
    icon: 'solar:chart-2-bold-duotone',
    title: 'تایم‌لاین مواضع',
    desc: 'سیر تحول فکری هر فرد را در بازه ۲ تا ۳ ساله با نمودار زمانی دقیق دنبال کنید.',
    color: '#0EA5E9',
  },
  {
    icon: 'solar:danger-triangle-bold-duotone',
    title: 'هشدار تناقض',
    desc: 'موتور هوش مصنوعی به‌صورت خودکار تناقض بین مواضع قدیم و جدید را شناسایی می‌کند.',
    color: '#EF4444',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'مشارکت مردمی',
    desc: 'هر کاربر می‌تواند مستندات جدید ارسال کند و در تکمیل پروفایل‌ها سهیم باشد.',
    color: '#22C55E',
  },
  {
    icon: 'solar:verified-check-bold-duotone',
    title: 'اعتبارسنجی سه‌لایه',
    desc: 'منابع معتبر، بررسی همتایان، و تأیید کارشناسان — سه لایه برای حفظ صحت داده.',
    color: '#F59E0B',
  },
  {
    icon: 'solar:radar-2-bold-duotone',
    title: 'رادار شخصیت',
    desc: 'تیپولوژی سیاسی هر فرد را در ۶ محور تهاجمی، جهانی، شفاف، عقلانی و... ببینید.',
    color: '#8B5CF6',
  },
];

const STATS = [
  { value: '+۲۰۰', label: 'شخصیت سیاسی', icon: 'solar:user-bold-duotone' },
  { value: '+۵۰۰۰', label: 'گزاره ثبت‌شده', icon: 'solar:document-bold-duotone' },
  { value: '+۱۲۰۰', label: 'منبع تأیید‌شده', icon: 'solar:verified-check-bold-duotone' },
  { value: '+۳۰۰', label: 'تناقض شناسایی‌شده', icon: 'solar:danger-triangle-bold-duotone' },
];

const HOW_IT_WORKS = [
  {
    step: '۰۱',
    title: 'جمع‌آوری داده',
    desc: 'کراولر ماهانه خبرگزاری‌های معتبر را پایش می‌کند. کاربران نیز می‌توانند مستندات ارسال کنند.',
    icon: 'solar:database-bold-duotone',
  },
  {
    step: '۰۲',
    title: 'اعتبارسنجی',
    desc: 'منابع در سه لاین سبز، زرد و قرمز بررسی می‌شوند. هیچ داده‌ای بدون تأیید وارد سیستم نمی‌شود.',
    icon: 'solar:shield-check-bold-duotone',
  },
  {
    step: '۰۳',
    title: 'تحلیل هوش مصنوعی',
    desc: 'AI گزاره‌های مستقل را استخراج کرده، نمره‌دهی می‌کند و دلیل هر نمره را مستند می‌سازد.',
    icon: 'solar:magic-stick-3-bold-duotone',
  },
  {
    step: '۰۴',
    title: 'پروفایل پویا',
    desc: 'نمودارها، شاخص‌ها و هشدارهای تناقض به‌صورت خودکار در پروفایل هر فرد به‌روز می‌شوند.',
    icon: 'solar:chart-bold-duotone',
  },
];

// ----------------------------------------------------------------------

export function LandingView() {
  const router = useRouter();
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* ── Sticky Navbar ── */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          px: { xs: 2, md: 5 },
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(12px)',
          bgcolor: 'rgba(255,255,255,0.85)',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:eye-bold-duotone" width={18} sx={{ color: 'common.white' }} />
          </Box>
          <Typography variant="h6" fontWeight={800} letterSpacing={-0.5}>
            دیده‌بان
          </Typography>
          <Chip label="بتا" size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: 10 }} />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={scrollToFeatures}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            ویژگی‌ها
          </Button>
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={() => router.push(paths.dashboard.search)}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            شناخت افراد
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.push(paths.auth.jwt.signIn)}
          >
            ورود
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => router.push(paths.auth.jwt.signUp)}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            ثبت‌نام
          </Button>
        </Stack>
      </Box>

      {/* ── Hero ── */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 14 },
          background: (theme) =>
            `linear-gradient(150deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.light} 100%)`,
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
          {/* Badge */}
          <Stack direction="row" justifyContent="center" sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 2,
                py: 0.75,
                borderRadius: 10,
                bgcolor: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Iconify icon="solar:magic-stick-3-bold-duotone" width={16} sx={{ color: 'primary.lighter' }} />
              <Typography variant="caption" sx={{ color: 'primary.lighter', fontWeight: 600 }}>
                پایش هوشمند با هوش مصنوعی
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              color: 'common.white',
              mb: 2,
              lineHeight: 1.2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            حافظه دیجیتال
            <br />
            رجال سیاسی
          </Typography>

          <Typography
            variant="h6"
            fontWeight={400}
            sx={{
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 520,
              mx: 'auto',
              mb: 5,
              lineHeight: 1.8,
            }}
          >
            دیده‌بان مواضع، وعده‌ها و کارنامه چهره‌های سیاسی را بر اساس متدولوژی
            «اصالت متن» پایش می‌کند و به شاخص‌های عددی تبدیل می‌کند.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            <Button
              size="large"
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="solar:users-group-rounded-bold" />}
              onClick={() => router.push(paths.dashboard.search)}
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: 'common.white',
                color: 'primary.darker',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                '&:hover': { bgcolor: 'grey.50', transform: 'translateY(-1px)', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' },
                transition: 'all 0.2s',
              }}
            >
              شناخت افراد
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<Iconify icon="solar:document-add-bold" />}
              onClick={() => router.push(paths.auth.jwt.signIn)}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'common.white',
                fontWeight: 700,
                fontSize: '1rem',
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s',
              }}
            >
              ثبت مستندات
            </Button>
          </Stack>

          {/* Trust badges */}
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" useFlexGap>
            {['بدون نیت‌خوانی', 'منابع مستند', 'تأیید انسانی', 'کد باز'].map((badge) => (
              <Stack key={badge} direction="row" spacing={0.5} alignItems="center">
                <Iconify icon="solar:check-circle-bold" width={16} sx={{ color: 'rgba(255,255,255,0.6)' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {badge}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ── Stats Bar ── */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          bgcolor: 'background.paper',
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 2,
            }}
          >
            {STATS.map((stat) => (
              <Stack key={stat.label} alignItems="center" spacing={0.5}>
                <Iconify icon={stat.icon} width={28} color="primary.main" />
                <Typography variant="h4" fontWeight={800} color="primary.main">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {stat.label}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Features ── */}
      <Box ref={featuresRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="ویژگی‌ها" color="primary" variant="outlined" size="small" sx={{ mb: 2 }} />
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
              چرا دیده‌بان؟
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
              ابزاری برای داوری منصفانه و علمی — نه یک خبرگزاری، بلکه یک مرکز تحلیل مواضع
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {FEATURES.map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  bgcolor: 'background.paper',
                  transition: 'all 0.25s',
                  '&:hover': {
                    borderColor: feature.color,
                    boxShadow: `0 8px 32px ${feature.color}22`,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1.5,
                    bgcolor: `${feature.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Iconify icon={feature.icon} width={26} sx={{ color: feature.color }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                  {feature.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── How It Works ── */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: 'background.paper',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label="فرآیند" color="primary" variant="outlined" size="small" sx={{ mb: 2 }} />
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
              چطور کار می‌کند؟
            </Typography>
            <Typography variant="body1" color="text.secondary">
              از جمع‌آوری داده تا پروفایل پویا — چهار مرحله شفاف
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
              position: 'relative',
            }}
          >
            {HOW_IT_WORKS.map((step, index) => (
              <Box key={step.step} sx={{ position: 'relative' }}>
                {/* Connector line */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      top: 24,
                      left: '60%',
                      right: '-40%',
                      height: 1,
                      bgcolor: 'divider',
                      zIndex: 0,
                    }}
                  />
                )}

                <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={step.icon} width={22} sx={{ color: 'common.white' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      sx={{ color: 'text.disabled', fontSize: '1.1rem' }}
                    >
                      {step.step}
                    </Typography>
                  </Stack>

                  <Typography variant="subtitle1" fontWeight={700}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    {step.desc}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA Section ── */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.primary.darker} 100%)`,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Iconify
            icon="solar:eye-bold-duotone"
            width={56}
            sx={{ color: 'primary.light', mb: 3 }}
          />
          <Typography variant="h3" fontWeight={800} sx={{ color: 'common.white', mb: 2 }}>
            همین حالا شروع کنید
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 5, lineHeight: 1.8 }}>
            پروفایل سیاستمداران را بررسی کنید، مستندات جدید ثبت کنید
            <br />
            و در ساختن حافظه دیجیتال جمعی سهیم باشید.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              size="large"
              variant="contained"
              onClick={() => router.push(paths.dashboard.search)}
              startIcon={<Iconify icon="solar:users-group-rounded-bold" />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(32,101,209,0.4)',
              }}
            >
              شناخت افراد
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => router.push(paths.auth.jwt.signUp)}
              startIcon={<Iconify icon="solar:user-plus-bold" />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'common.white',
                '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              ثبت‌نام
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          py: 4,
          px: { xs: 2, md: 5 },
          bgcolor: 'grey.900',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:eye-bold-duotone" width={14} sx={{ color: 'common.white' }} />
              </Box>
              <Typography variant="subtitle2" sx={{ color: 'grey.400' }}>
                دیده‌بان
              </Typography>
            </Stack>

            <Typography variant="caption" sx={{ color: 'grey.600' }}>
              © ۱۴۰۵ دیده‌بان — پایش هوشمند مواضع رجال سیاسی
            </Typography>

            <Stack direction="row" spacing={2}>
              {['درباره ما', 'تماس', 'حریم خصوصی'].map((link) => (
                <Typography
                  key={link}
                  variant="caption"
                  sx={{ color: 'grey.500', cursor: 'pointer', '&:hover': { color: 'grey.300' } }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Stack>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap" useFlexGap>
            {[
              'اصالت متن',
              'بدون نیت‌خوانی',
              'منابع مستند',
              'تأیید انسانی',
              'شفافیت کامل',
            ].map((tag) => (
              <Typography key={tag} variant="caption" sx={{ color: 'grey.700' }}>
                {tag}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
