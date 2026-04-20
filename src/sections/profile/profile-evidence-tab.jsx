'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Mock timeline data
const MOCK_TIMELINE = [
  {
    id: '1',
    type: 'interview',
    title: 'مصاحبه با شبکه خبر',
    date: '۱۴۰۵/۰۱/۲۵',
    summary: 'اظهارنظر درباره سیاست‌های ارزی و تجارت خارجی',
    source: 'https://example.com/news/1',
  },
  {
    id: '2',
    type: 'speech',
    title: 'سخنرانی در مجلس',
    date: '۱۴۰۵/۰۱/۱۵',
    summary: 'دفاع از لایحه بودجه و انتقاد از عملکرد بانک مرکزی',
    source: 'https://example.com/news/2',
  },
  {
    id: '3',
    type: 'social',
    title: 'پست توییتر',
    date: '۱۴۰۵/۰۱/۱۰',
    summary: 'واکنش به افزایش قیمت بنزین',
    source: 'https://example.com/tweet/1',
  },
  {
    id: '4',
    type: 'interview',
    title: 'مصاحبه با خبرگزاری ایسنا',
    date: '۱۴۰۴/۱۲/۲۰',
    summary: 'بررسی عملکرد دولت در حوزه مسکن',
    source: 'https://example.com/news/3',
  },
];

// Mock verified sources
const MOCK_SOURCES = [
  { id: '1', title: 'مصاحبه تلویزیونی - شبکه خبر', url: 'https://example.com', date: '۱۴۰۵/۰۱/۲۵', status: 'verified' },
  { id: '2', title: 'خبرگزاری ایرنا - گزارش مجلس', url: 'https://example.com', date: '۱۴۰۵/۰۱/۱۵', status: 'verified' },
  { id: '3', title: 'خبرگزاری ایسنا - مصاحبه اختصاصی', url: 'https://example.com', date: '۱۴۰۴/۱۲/۲۰', status: 'verified' },
];

// Mock pending submissions
const MOCK_PENDING = [
  { id: '1', submitter: 'کاربر ۱۲۳', url: 'https://example.com/claim', topic: 'اقتصاد', status: 'pending_review', date: '۱۴۰۵/۰۱/۲۸' },
  { id: '2', submitter: 'کاربر ۴۵۶', url: '', topic: 'سیاست خارجی', status: 'pending_expert', date: '۱۴۰۵/۰۱/۲۷' },
];

// ----------------------------------------------------------------------

export function ProfileEvidenceTab({ profile }) {
  return (
    <Grid container spacing={3}>
      {/* Narrative Timeline */}
      <Grid size={{ xs: 12, md: 7 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            تایم‌لاین روایتی
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            ترکیب پست‌ها، مصاحبه‌ها و وقایع در یک خط زمانی
          </Typography>

          <Timeline position="right">
            {MOCK_TIMELINE.map((item, index) => (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot color={getTimelineDotColor(item.type)} />
                  {index < MOCK_TIMELINE.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.summary}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 1 }}>
                      {item.date}
                    </Typography>
                  </Stack>
                  <Link href={item.source} target="_blank" variant="caption" sx={{ mt: 0.5 }}>
                    مشاهده منبع
                  </Link>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Card>
      </Grid>

      {/* Source Vault + Community Feed */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Stack spacing={3}>
          {/* Source Vault */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              مخزن منابع
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Source Vault - لیست تمام لینک‌های تایید شده
            </Typography>

            <Stack spacing={1.5}>
              {MOCK_SOURCES.map((source) => (
                <Box
                  key={source.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Link href={source.url} target="_blank" variant="body2">
                        {source.title}
                      </Link>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {source.date}
                      </Typography>
                    </Box>
                    <Chip
                      label="تایید شده"
                      color="success"
                      size="small"
                      icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Community Feed */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              فید مشارکت
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              لینک‌های ارسالی توسط مردم
            </Typography>

            <Stack spacing={1.5}>
              {MOCK_PENDING.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2">
                        {item.submitter} - {item.topic}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.status === 'pending_review' ? 'در انتظار بررسی' : 'نیاز به کارشناس'}
                      color={item.status === 'pending_review' ? 'warning' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function getTimelineDotColor(type) {
  switch (type) {
    case 'interview':
      return 'primary';
    case 'speech':
      return 'success';
    case 'social':
      return 'info';
    default:
      return 'grey';
  }
}
