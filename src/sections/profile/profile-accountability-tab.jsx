'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Mock promises data
const MOCK_PROMISES = [
  {
    id: '1',
    text: 'کاهش نرخ تورم به زیر ۲۰ درصد تا پایان سال',
    status: 'expired',
    deadline: '۱۴۰۴/۱۲/۲۹',
    source: 'مصاحبه تلویزیونی',
  },
  {
    id: '2',
    text: 'ایجاد ۵۰۰ هزار شغل جدید',
    status: 'in_progress',
    deadline: '۱۴۰۵/۰۶/۳۱',
    source: 'سخنرانی انتخاباتی',
  },
  {
    id: '3',
    text: 'راه‌اندازی سامانه شفافیت مالی مسئولان',
    status: 'fulfilled',
    deadline: '۱۴۰۴/۰۶/۳۱',
    source: 'برنامه انتخاباتی',
  },
  {
    id: '4',
    text: 'کاهش قیمت مسکن با افزایش عرضه زمین',
    status: 'expired',
    deadline: '۱۴۰۴/۰۹/۳۰',
    source: 'جلسه هیئت دولت',
  },
];

// Mock Say-Do Gap data
const MOCK_SAY_DO = [
  {
    id: '1',
    topic: 'تورم',
    said: 'تورم را به زیر ۲۰ درصد می‌رسانیم',
    reality: 'نرخ تورم ۳۵ درصد (مرکز آمار)',
    gap: 'high',
  },
  {
    id: '2',
    topic: 'اشتغال',
    said: 'نرخ بیکاری را ۳ درصد کاهش می‌دهیم',
    reality: 'نرخ بیکاری ۰.۵ درصد کاهش یافته',
    gap: 'medium',
  },
];

// ----------------------------------------------------------------------

export function ProfileAccountabilityTab({ profile }) {
  const fulfilled = MOCK_PROMISES.filter((p) => p.status === 'fulfilled').length;
  const inProgress = MOCK_PROMISES.filter((p) => p.status === 'in_progress').length;
  const expired = MOCK_PROMISES.filter((p) => p.status === 'expired').length;
  const total = MOCK_PROMISES.length;

  return (
    <Grid container spacing={3}>
      {/* Promise Tracker Summary */}
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            وعده‌سنج
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Promise Tracker - پیگیری سرنوشت وعده‌های داده شده
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 1, bgcolor: 'success.lighter' }}>
                <Typography variant="h3" color="success.main">{fulfilled}</Typography>
                <Typography variant="body2">محقق شده</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 1, bgcolor: 'warning.lighter' }}>
                <Typography variant="h3" color="warning.main">{inProgress}</Typography>
                <Typography variant="body2">در جریان</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, borderRadius: 1, bgcolor: 'error.lighter' }}>
                <Typography variant="h3" color="error.main">{expired}</Typography>
                <Typography variant="body2">منقضی شده</Typography>
              </Box>
            </Grid>
          </Grid>

          <LinearProgress
            variant="determinate"
            value={(fulfilled / total) * 100}
            color="success"
            sx={{ height: 10, borderRadius: 1, mb: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            {Math.round((fulfilled / total) * 100)}% از وعده‌ها محقق شده
          </Typography>
        </Card>
      </Grid>

      {/* Promise List */}
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            لیست وعده‌ها
          </Typography>

          <Stack spacing={2}>
            {MOCK_PROMISES.map((promise) => (
              <PromiseCard key={promise.id} promise={promise} />
            ))}
          </Stack>
        </Card>
      </Grid>

      {/* Say-Do Gap */}
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            تطبیق قول و فعل
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Say-Do Gap - مقایسه مواضع کلامی با آمارهای عملکردی
          </Typography>

          <Stack spacing={2}>
            {MOCK_SAY_DO.map((item) => (
              <SayDoCard key={item.id} item={item} />
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function PromiseCard({ promise }) {
  const statusConfig = {
    fulfilled: { label: 'محقق شده', color: 'success', icon: 'eva:checkmark-circle-2-fill' },
    in_progress: { label: 'در جریان', color: 'warning', icon: 'eva:clock-fill' },
    expired: { label: 'منقضی شده', color: 'error', icon: 'eva:close-circle-fill' },
  };

  const config = statusConfig[promise.status];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ flex: 1 }}>
          <Iconify icon={config.icon} color={`${config.color}.main`} width={24} sx={{ mt: 0.25 }} />
          <Box>
            <Typography variant="body1">{promise.text}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                مهلت: {promise.deadline}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                | منبع: {promise.source}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Chip label={config.label} color={config.color} size="small" />
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

function SayDoCard({ item }) {
  const gapConfig = {
    high: { label: 'شکاف زیاد', color: 'error' },
    medium: { label: 'شکاف متوسط', color: 'warning' },
    low: { label: 'شکاف کم', color: 'success' },
  };

  const config = gapConfig[item.gap];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">{item.topic}</Typography>
        <Chip label={config.label} color={config.color} size="small" variant="outlined" />
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: 'grey.100' }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              گفته:
            </Typography>
            <Typography variant="body2">{item.said}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: 'grey.100' }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              واقعیت:
            </Typography>
            <Typography variant="body2">{item.reality}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
