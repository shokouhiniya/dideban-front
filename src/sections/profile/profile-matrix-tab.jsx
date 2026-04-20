'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

// ----------------------------------------------------------------------

// Mock heatmap data
const MOCK_TOPICS = [
  { id: '1', name: 'اقتصاد', subtopics: [
    { name: 'سیاست ارزی', score: 4 },
    { name: 'تجارت خارجی', score: 3 },
    { name: 'مالیات', score: 2 },
    { name: 'بانکداری', score: 5 },
  ]},
  { id: '2', name: 'سیاست خارجی', subtopics: [
    { name: 'روابط با غرب', score: 2 },
    { name: 'روابط منطقه‌ای', score: 4 },
    { name: 'دیپلماسی', score: 3 },
  ]},
  { id: '3', name: 'فرهنگ و اجتماع', subtopics: [
    { name: 'آزادی‌های مدنی', score: 3 },
    { name: 'رسانه', score: 2 },
    { name: 'آموزش', score: 4 },
  ]},
];

// Mock coded statements (Policy Deep Dive)
const MOCK_STATEMENTS = [
  {
    id: '1',
    quote: 'ما باید نرخ ارز را به بازار بسپاریم و دخالت دولتی را کاهش دهیم.',
    topic: 'سیاست ارزی',
    score: 1,
    aiReason: 'صراحتاً با دخالت دولت در بازار ارز مخالفت کرده و خواستار آزادسازی شده است.',
    source: 'خبرگزاری ایسنا',
    speechDate: '۱۴۰۴/۰۹/۱۵',
  },
  {
    id: '2',
    quote: 'بانک مرکزی باید استقلال کامل داشته باشد و از فشارهای سیاسی مصون باشد.',
    topic: 'بانکداری',
    score: 5,
    aiReason: 'حمایت صریح از استقلال بانک مرکزی و مدیریت حرفه‌ای منابع.',
    source: 'خبرگزاری ایرنا',
    speechDate: '۱۴۰۴/۱۰/۰۲',
  },
  {
    id: '3',
    quote: 'تحریم‌ها فرصتی برای خودکفایی اقتصادی هستند.',
    topic: 'تجارت خارجی',
    score: 4,
    aiReason: 'نگاه مثبت به خودکفایی و کاهش وابستگی به تجارت خارجی.',
    source: 'شبکه خبر',
    speechDate: '۱۴۰۴/۱۱/۲۰',
  },
];

// ----------------------------------------------------------------------

export function ProfileMatrixTab({ profile }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = useCallback((topicName) => {
    setSelectedTopic((prev) => (prev === topicName ? null : topicName));
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Expertise Heatmap */}
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            نقشه حرارتی موضوعات
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Expertise Heatmap - نمره فرد در حوزه‌های مختلف تخصصی (۰ تا ۵)
          </Typography>

          <Stack spacing={3}>
            {MOCK_TOPICS.map((topic) => (
              <Box key={topic.id}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {topic.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {topic.subtopics.map((sub) => (
                    <HeatmapBlock
                      key={sub.name}
                      label={sub.name}
                      score={sub.score}
                      selected={selectedTopic === sub.name}
                      onClick={() => handleTopicClick(sub.name)}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>
      </Grid>

      {/* Policy Deep Dive */}
      <Grid size={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            تحلیل عمیق مواضع
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Policy Deep Dive - گزاره‌های کدگذاری شده به همراه نمره و دلیل
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>نقل‌قول</TableCell>
                  <TableCell>موضوع</TableCell>
                  <TableCell align="center">نمره</TableCell>
                  <TableCell>دلیل AI</TableCell>
                  <TableCell>منبع</TableCell>
                  <TableCell>تاریخ بیان</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_STATEMENTS
                  .filter((s) => !selectedTopic || s.topic === selectedTopic)
                  .map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell sx={{ maxWidth: 250 }}>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          &ldquo;{statement.quote}&rdquo;
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={statement.topic} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="center">
                        <ScoreBadge score={statement.score} />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <Typography variant="caption">{statement.aiReason}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{statement.source}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">{statement.speechDate}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function HeatmapBlock({ label, score, selected, onClick }) {
  const getColor = (s) => {
    if (s <= 1) return 'error.main';
    if (s <= 2) return 'warning.main';
    if (s <= 3) return 'info.main';
    if (s <= 4) return 'success.light';
    return 'success.main';
  };

  const getBgColor = (s) => {
    if (s <= 1) return 'error.lighter';
    if (s <= 2) return 'warning.lighter';
    if (s <= 3) return 'info.lighter';
    if (s <= 4) return 'success.lighter';
    return 'success.light';
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 1,
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: 100,
        bgcolor: getBgColor(score),
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        transition: 'all 0.2s',
        '&:hover': { opacity: 0.85 },
      }}
    >
      <Typography variant="caption" display="block">
        {label}
      </Typography>
      <Typography variant="h6" color={getColor(score)}>
        {score}/5
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ScoreBadge({ score }) {
  const getColor = () => {
    if (score <= 1) return 'error';
    if (score <= 2) return 'warning';
    if (score <= 3) return 'info';
    if (score <= 4) return 'success';
    return 'success';
  };

  return (
    <Chip label={`${score}/5`} color={getColor()} size="small" />
  );
}
