'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Mock verification queue
const MOCK_QUEUE = [
  {
    id: '1',
    type: 'yellow_line',
    politician: 'شخصیت نمونه ۱',
    statement: 'ما باید نرخ ارز را آزاد کنیم',
    source: 'وبلاگ شخصی',
    sourceUrl: 'https://example.com/blog/1',
    submittedBy: 'کاربر ۱۲۳',
    date: '۱۴۰۵/۰۱/۲۸',
    peerVotes: { approve: 1, reject: 0, total: 3 },
  },
  {
    id: '2',
    type: 'red_line',
    politician: 'شخصیت نمونه ۲',
    statement: 'در جلسه خصوصی گفته که با FATF موافق است',
    source: 'ادعای بدون منبع',
    sourceUrl: '',
    submittedBy: 'کاربر ۴۵۶',
    date: '۱۴۰۵/۰۱/۲۷',
    peerVotes: null,
  },
  {
    id: '3',
    type: 'ai_review',
    politician: 'شخصیت نمونه ۳',
    statement: 'بانک مرکزی باید مستقل باشد',
    source: 'خبرگزاری ایرنا',
    sourceUrl: 'https://example.com/news/3',
    aiScore: 5,
    aiTopic: 'بانکداری',
    aiReason: 'حمایت صریح از استقلال بانک مرکزی',
    date: '۱۴۰۵/۰۱/۲۶',
  },
];

// Mock conflicts
const MOCK_CONFLICTS = [
  {
    id: '1',
    politician: 'شخصیت نمونه ۱',
    event: 'سخنرانی ۱۴۰۵/۰۱/۲۰',
    sourceA: { name: 'خبرگزاری الف', claim: 'گفت: با افزایش یارانه موافقم' },
    sourceB: { name: 'خبرگزاری ب', claim: 'گفت: یارانه باید هدفمند شود' },
  },
];

// Mock activity log
const MOCK_ACTIVITY = [
  { id: '1', action: 'تایید', target: 'گزاره ارزی - شخصیت ۱', date: '۱۴۰۵/۰۱/۲۵', moderator: 'ناظر ۱' },
  { id: '2', action: 'رد', target: 'ادعای بدون منبع - شخصیت ۲', date: '۱۴۰۵/۰۱/۲۴', moderator: 'ناظر ۱' },
  { id: '3', action: 'تغییر نمره', target: 'نمره AI از ۴ به ۳ - شخصیت ۳', date: '۱۴۰۵/۰۱/۲۳', moderator: 'ناظر ۲' },
];

// ----------------------------------------------------------------------

export function ModeratorView() {
  const [currentTab, setCurrentTab] = useState('queue');
  const [reviewDialog, setReviewDialog] = useState({ open: false, item: null });
  const [reviewData, setReviewData] = useState({ verdict: '', reason: '', overrideScore: '' });

  const handleChangeTab = useCallback((_, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleOpenReview = useCallback((item) => {
    setReviewDialog({ open: true, item });
    setReviewData({ verdict: '', reason: '', overrideScore: '' });
  }, []);

  const handleCloseReview = useCallback(() => {
    setReviewDialog({ open: false, item: null });
  }, []);

  const handleSubmitReview = useCallback(() => {
    // Submit review logic
    handleCloseReview();
  }, [handleCloseReview]);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }}>
        میز کار ناظر
      </Typography>

      <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mb: 3 }}>
        <Tab value="queue" label="صف انتظار" icon={<Iconify icon="solar:inbox-bold" />} iconPosition="start" />
        <Tab value="conflicts" label="تضاد منابع" icon={<Iconify icon="solar:danger-bold" />} iconPosition="start" />
        <Tab value="activity" label="تاریخچه فعالیت" icon={<Iconify icon="solar:history-bold" />} iconPosition="start" />
      </Tabs>

      {/* Verification Queue */}
      {currentTab === 'queue' && (
        <Stack spacing={2}>
          {MOCK_QUEUE.map((item) => (
            <QueueCard key={item.id} item={item} onReview={() => handleOpenReview(item)} />
          ))}
        </Stack>
      )}

      {/* Conflicts */}
      {currentTab === 'conflicts' && (
        <Stack spacing={2}>
          {MOCK_CONFLICTS.map((conflict) => (
            <ConflictCard key={conflict.id} conflict={conflict} />
          ))}
        </Stack>
      )}

      {/* Activity Log */}
      {currentTab === 'activity' && (
        <Card sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            {MOCK_ACTIVITY.map((log) => (
              <Box
                key={log.id}
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Chip
                    label={log.action}
                    size="small"
                    color={log.action === 'تایید' ? 'success' : log.action === 'رد' ? 'error' : 'warning'}
                  />
                  <Typography variant="body2">{log.target}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    {log.moderator}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {log.date}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>
      )}

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onClose={handleCloseReview} maxWidth="sm" fullWidth>
        <DialogTitle>بررسی و رای‌گیری</DialogTitle>
        <DialogContent>
          {reviewDialog.item && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'grey.100' }}>
                <Typography variant="subtitle2">{reviewDialog.item.politician}</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  &ldquo;{reviewDialog.item.statement}&rdquo;
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  منبع: {reviewDialog.item.source}
                </Typography>
              </Box>

              {reviewDialog.item.aiScore !== undefined && (
                <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'info.lighter' }}>
                  <Typography variant="subtitle2">تحلیل AI</Typography>
                  <Typography variant="body2">
                    موضوع: {reviewDialog.item.aiTopic} | نمره: {reviewDialog.item.aiScore}/5
                  </Typography>
                  <Typography variant="caption">{reviewDialog.item.aiReason}</Typography>
                </Box>
              )}

              <TextField
                fullWidth
                label="دلیل تصمیم"
                multiline
                rows={2}
                value={reviewData.reason}
                onChange={(e) => setReviewData((prev) => ({ ...prev, reason: e.target.value }))}
              />

              {reviewDialog.item.aiScore !== undefined && (
                <TextField
                  fullWidth
                  label="تغییر نمره (اختیاری)"
                  type="number"
                  slotProps={{ htmlInput: { min: 0, max: 5 } }}
                  value={reviewData.overrideScore}
                  onChange={(e) => setReviewData((prev) => ({ ...prev, overrideScore: e.target.value }))}
                  helperText="فقط در صورت عدم توافق با نمره AI"
                />
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview}>انصراف</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setReviewData((prev) => ({ ...prev, verdict: 'reject' }));
              handleSubmitReview();
            }}
          >
            رد
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setReviewData((prev) => ({ ...prev, verdict: 'approve' }));
              handleSubmitReview();
            }}
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function QueueCard({ item, onReview }) {
  const typeConfig = {
    yellow_line: { label: 'لاین زرد', color: 'warning', icon: 'eva:alert-triangle-fill' },
    red_line: { label: 'لاین قرمز', color: 'error', icon: 'eva:alert-circle-fill' },
    ai_review: { label: 'تایید نمره AI', color: 'info', icon: 'eva:bulb-fill' },
  };

  const config = typeConfig[item.type];

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Iconify icon={config.icon} color={`${config.color}.main`} />
            <Chip label={config.label} color={config.color} size="small" />
            <Typography variant="subtitle2">{item.politician}</Typography>
          </Stack>

          <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
            &ldquo;{item.statement}&rdquo;
          </Typography>

          <Stack direction="row" spacing={2}>
            <Typography variant="caption" color="text.secondary">
              منبع: {item.source}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              تاریخ: {item.date}
            </Typography>
            {item.submittedBy && (
              <Typography variant="caption" color="text.secondary">
                ارسال‌کننده: {item.submittedBy}
              </Typography>
            )}
          </Stack>

          {item.peerVotes && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                رای همتایان: {item.peerVotes.approve} تایید / {item.peerVotes.reject} رد (از {item.peerVotes.total} نفر)
              </Typography>
            </Box>
          )}

          {item.aiScore !== undefined && (
            <Box sx={{ mt: 1, p: 1, borderRadius: 1, bgcolor: 'info.lighter', display: 'inline-block' }}>
              <Typography variant="caption">
                نمره AI: {item.aiScore}/5 | موضوع: {item.aiTopic} | {item.aiReason}
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onReview} startIcon={<Iconify icon="eva:edit-fill" />}>
            بررسی
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

// ----------------------------------------------------------------------

function ConflictCard({ conflict }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Iconify icon="eva:alert-triangle-fill" color="warning.main" />
        <Typography variant="subtitle1">{conflict.politician}</Typography>
        <Typography variant="body2" color="text.secondary">
          - {conflict.event}
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'primary.lighter' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {conflict.sourceA.name}
            </Typography>
            <Typography variant="body2">{conflict.sourceA.claim}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'warning.lighter' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {conflict.sourceB.name}
            </Typography>
            <Typography variant="body2">{conflict.sourceB.claim}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button variant="outlined" size="small">
          منبع الف معتبرتر
        </Button>
        <Button variant="outlined" size="small">
          منبع ب معتبرتر
        </Button>
        <Button variant="outlined" size="small" color="warning">
          هر دو روایت متضاد
        </Button>
      </Stack>
    </Card>
  );
}
