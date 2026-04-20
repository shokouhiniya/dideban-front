'use client';

import {
  Radar,
  Legend,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const KPI_CONFIG = [
  {
    key: 'truthScore',
    title: 'نمره صداقت',
    subtitle: 'Truth-O-Meter',
    color: 'success',
    icon: 'solar:verified-check-bold-duotone',
    desc: 'انطباق گفتار با واقعیت',
  },
  {
    key: 'stabilityScore',
    title: 'شاخص ثبات',
    subtitle: 'Flip-Flop Index',
    color: 'info',
    icon: 'solar:shield-check-bold-duotone',
    desc: 'پایداری مواضع در طول زمان',
  },
  {
    key: 'clarityScore',
    title: 'ضریب صراحت',
    subtitle: 'Clarity Score',
    color: 'warning',
    icon: 'solar:eye-bold-duotone',
    desc: 'دقت و شفافیت در بیان',
  },
  {
    key: 'populismScore',
    title: 'شاخص عوام‌گرایی',
    subtitle: 'Populism Index',
    color: 'error',
    icon: 'solar:users-group-rounded-bold-duotone',
    desc: 'احساسی vs. تکنوکراتیک',
    invert: true,
  },
];

const WORD_COLORS = [
  '#2065D1', '#0EA5E9', '#22C55E', '#F59E0B',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
  '#6366F1', '#EF4444', '#84CC16', '#06B6D4',
];

// ----------------------------------------------------------------------

export function ProfileOverviewTab({ profile }) {
  const radarData = [
    { subject: 'تهاجمی', value: profile.personaRadar.aggressive, fullMark: 10 },
    { subject: 'جهانی', value: profile.personaRadar.global, fullMark: 10 },
    { subject: 'تحول‌خواه', value: profile.personaRadar.reformist, fullMark: 10 },
    { subject: 'شفاف', value: profile.personaRadar.transparent, fullMark: 10 },
    { subject: 'عقلانی', value: profile.personaRadar.rational, fullMark: 10 },
    { subject: 'رسمی', value: profile.personaRadar.formal, fullMark: 10 },
  ];

  return (
    <Grid container spacing={3}>
      {/* KPI 2×2 */}
      <Grid size={12}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          {KPI_CONFIG.map((kpi) => (
            <KpiCard key={kpi.key} kpi={kpi} value={profile[kpi.key]} />
          ))}
        </Box>
      </Grid>

      {/* Radar Chart */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ p: 3, height: '100%' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Iconify icon="solar:radar-2-bold-duotone" color="primary.main" />
            <Typography variant="h6">رادار شخصیت ۶ محوری</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Persona Radar — تیپولوژی سیاسی
          </Typography>

          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(145,158,171,0.2)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 12, fill: '#637381', fontFamily: 'Vazirmatn, sans-serif' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  tick={{ fontSize: 10, fill: '#919EAB' }}
                  tickCount={6}
                />
                <Radar
                  name={profile.name}
                  dataKey="value"
                  stroke="#2065D1"
                  fill="#2065D1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#2065D1' }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* Axis descriptions */}
          <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
            {[
              { low: 'تعاملی', high: 'تهاجمی' },
              { low: 'بومی', high: 'جهانی' },
              { low: 'محافظه‌کار', high: 'تحول‌خواه' },
              { low: 'مبهم', high: 'شفاف' },
              { low: 'پوپولیستی', high: 'عقلانی' },
              { low: 'غیررسمی', high: 'رسمی' },
            ].map((item) => (
              <Stack key={item.high} direction="row" spacing={0.5} alignItems="center">
                <Typography variant="caption" color="text.disabled" sx={{ minWidth: 52, textAlign: 'right' }}>
                  {item.low}
                </Typography>
                <Box sx={{ flex: 1, height: 2, bgcolor: 'divider', borderRadius: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  {item.high}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Word Cloud */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card sx={{ p: 3, height: '100%' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Iconify icon="solar:text-bold-duotone" color="primary.main" />
            <Typography variant="h6">ابر واژگان مواضع</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            موضوعاتی که بیشترین اظهارنظر درباره آن‌ها بوده — اندازه = تعداد گزاره
          </Typography>

          <WordCloud words={profile.topKeywords} />
        </Card>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function KpiCard({ kpi, value }) {
  const { title, subtitle, color, icon, desc, invert } = kpi;
  const pct = (value / 10) * 100;

  const displayColor = invert
    ? value <= 3 ? 'success' : value <= 6 ? 'warning' : 'error'
    : color;

  const getLabel = () => {
    if (invert) {
      if (value <= 3) return 'تکنوکرات';
      if (value <= 6) return 'متعادل';
      return 'پوپولیست';
    }
    if (value >= 8) return 'عالی';
    if (value >= 6) return 'خوب';
    if (value >= 4) return 'متوسط';
    return 'ضعیف';
  };

  return (
    <Card
      sx={{
        p: 2.5,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: `${displayColor}.main`,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.25 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: `${displayColor}.lighter`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify icon={icon} color={`${displayColor}.main`} width={22} />
        </Box>
      </Stack>

      <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 0.5 }}>
        <Typography variant="h3" color={`${displayColor}.main`} fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="body2" color="text.disabled">/۱۰</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: 0.75,
            bgcolor: `${displayColor}.lighter`,
            color: `${displayColor}.dark`,
            fontWeight: 'bold',
          }}
        >
          {getLabel()}
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={pct}
        color={displayColor}
        sx={{ height: 6, borderRadius: 1, mb: 1 }}
      />

      <Typography variant="caption" color="text.disabled">
        {desc}
      </Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------

function WordCloud({ words }) {
  if (!words?.length) return null;

  const maxVal = Math.max(...words.map((w) => w.value));
  const minVal = Math.min(...words.map((w) => w.value));

  const getFontSize = (val) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1);
    return 13 + ratio * 26;
  };

  const getOpacity = (val) => {
    const ratio = (val - minVal) / (maxVal - minVal || 1);
    return 0.5 + ratio * 0.5;
  };

  // Shuffle for visual variety (stable via index seed)
  const shuffled = [...words].sort((a, b) => (a.value % 3) - (b.value % 3));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 220,
        p: 1,
      }}
    >
      {shuffled.map((word, i) => (
        <Typography
          key={word.text}
          component="span"
          sx={{
            fontSize: getFontSize(word.value),
            fontWeight: word.value > maxVal * 0.6 ? 700 : 400,
            color: WORD_COLORS[i % WORD_COLORS.length],
            opacity: getOpacity(word.value),
            cursor: 'default',
            lineHeight: 1.4,
            transition: 'all 0.2s',
            userSelect: 'none',
            '&:hover': { opacity: 1, transform: 'scale(1.12)' },
          }}
          title={`${word.text}: ${word.value} گزاره`}
        >
          {word.text}
        </Typography>
      ))}
    </Box>
  );
}
