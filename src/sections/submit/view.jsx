'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { useSearchParams } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const STEPS = ['ثبت لینک', 'انتخاب گزاره', 'دسته‌بندی', 'تایید نهایی'];

const MOCK_TOPICS_TREE = [
  {
    id: '1',
    label: 'اقتصاد',
    children: [
      { id: '1-1', label: 'تجارت' },
      { id: '1-2', label: 'ارز' },
      { id: '1-3', label: 'مالیات' },
      { id: '1-4', label: 'بانکداری' },
    ],
  },
  {
    id: '2',
    label: 'سیاست خارجی',
    children: [
      { id: '2-1', label: 'روابط با غرب' },
      { id: '2-2', label: 'روابط منطقه‌ای' },
      { id: '2-3', label: 'دیپلماسی' },
    ],
  },
  {
    id: '3',
    label: 'فرهنگ و اجتماع',
    children: [
      { id: '3-1', label: 'آزادی‌های مدنی' },
      { id: '3-2', label: 'رسانه' },
      { id: '3-3', label: 'آموزش' },
    ],
  },
];

const MOCK_POLITICIANS_LIST = [
  { id: '1', name: 'شخصیت نمونه ۱' },
  { id: '2', name: 'شخصیت نمونه ۲' },
  { id: '3', name: 'شخصیت نمونه ۳' },
  { id: '4', name: 'شخصیت نمونه ۴' },
  { id: '5', name: 'شخصیت نمونه ۵' },
];

// ----------------------------------------------------------------------

export function SubmitView() {
  const searchParams = useSearchParams();

  // Pre-select politician from URL params (e.g. coming from profile page)
  const preselectedId = searchParams.get('politician');
  const preselectedName = searchParams.get('name');
  const preselectedPolitician = preselectedId
    ? MOCK_POLITICIANS_LIST.find((p) => p.id === preselectedId) ||
      (preselectedName ? { id: preselectedId, name: preselectedName } : null)
    : null;

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    url: '',
    politician: preselectedPolitician,
    urlPreview: null,
    statement: '',
    topic: null,
    subtopic: null,
    notes: '',
  });

  const handleNext = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleUrlValidate = useCallback(() => {
    // Mock URL validation
    setFormData((prev) => ({
      ...prev,
      urlPreview: {
        title: 'مصاحبه اختصاصی با شخصیت نمونه ۱ درباره سیاست‌های ارزی',
        source: 'خبرگزاری ایسنا',
        date: '۱۴۰۵/۰۱/۲۵',
        isWhitelisted: true,
      },
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    // Submit logic
    setActiveStep(STEPS.length);
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <DashboardContent maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        ثبت مستندات جدید
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === STEPS.length ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Iconify icon="eva:checkmark-circle-2-fill" color="success.main" width={64} sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>
            مدرک شما با موفقیت ثبت شد
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            کد پیگیری: DDB-2025-00142
          </Typography>
          <Typography variant="body2" color="text.secondary">
            پس از بررسی و تایید، امتیاز فعالیت به حساب شما اضافه خواهد شد.
          </Typography>
        </Card>
      ) : (
        <Card sx={{ p: 3 }}>
          {/* Step 1: URL Input */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Typography variant="h6">لینک منبع را وارد کنید</Typography>

              <Autocomplete
                options={MOCK_POLITICIANS_LIST}
                getOptionLabel={(option) => option.name}
                value={formData.politician}
                onChange={(_, value) => updateField('politician', value)}
                renderInput={(params) => (
                  <TextField {...params} label="انتخاب شخصیت سیاسی" />
                )}
              />

              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  label="لینک خبر یا ویدیو"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => updateField('url', e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleUrlValidate}
                  disabled={!formData.url}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  بررسی لینک
                </Button>
              </Stack>

              {/* URL Preview - Smart URL Validator */}
              {formData.urlPreview && (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: formData.urlPreview.isWhitelisted ? 'success.lighter' : 'warning.lighter',
                    border: (theme) =>
                      `1px solid ${formData.urlPreview.isWhitelisted ? theme.palette.success.light : theme.palette.warning.light}`,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Iconify
                      icon={formData.urlPreview.isWhitelisted ? 'eva:checkmark-circle-2-fill' : 'eva:alert-triangle-fill'}
                      color={formData.urlPreview.isWhitelisted ? 'success.main' : 'warning.main'}
                    />
                    <Chip
                      label={formData.urlPreview.isWhitelisted ? 'منبع معتبر (لاین سبز)' : 'منبع غیررسمی (لاین زرد)'}
                      color={formData.urlPreview.isWhitelisted ? 'success' : 'warning'}
                      size="small"
                    />
                  </Stack>
                  <Typography variant="subtitle2">{formData.urlPreview.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formData.urlPreview.source} - {formData.urlPreview.date}
                  </Typography>
                </Box>
              )}

              <Alert severity="info">
                اگر منبع شما لینک وب ندارد، می‌توانید اسکرین‌شات یا فایل صوتی آپلود کنید.
              </Alert>

              <Button variant="outlined" startIcon={<Iconify icon="eva:upload-fill" />}>
                آپلود فایل (اسکرین‌شات / صوت)
              </Button>
            </Stack>
          )}

          {/* Step 2: Statement Extraction */}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <Typography variant="h6">گزاره مورد نظر را مشخص کنید</Typography>
              <Typography variant="body2" color="text.secondary">
                بخش دقیق نقل‌قول یا گزاره‌ای که موضع سیاسی فرد را نشان می‌دهد، در کادر زیر وارد کنید.
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="نقل‌قول یا گزاره"
                placeholder="متن دقیق گفته شخصیت سیاسی را اینجا وارد کنید..."
                value={formData.statement}
                onChange={(e) => updateField('statement', e.target.value)}
              />

              <Alert severity="warning">
                لطفاً فقط متن صریح و مستقیم را وارد کنید. از تفسیر یا خلاصه‌سازی خودداری نمایید.
              </Alert>
            </Stack>
          )}

          {/* Step 3: Topic Categorization */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Typography variant="h6">موضوع مرتبط را انتخاب کنید</Typography>
              <Typography variant="body2" color="text.secondary">
                Contextual Categorizer - انتخاب از درخت موضوعی کتابچه
              </Typography>

              <Grid container spacing={2}>
                {MOCK_TOPICS_TREE.map((topic) => (
                  <Grid key={topic.id} size={{ xs: 12, sm: 4 }}>
                    <Card
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: 2,
                        borderColor: formData.topic?.id === topic.id ? 'primary.main' : 'divider',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => updateField('topic', topic)}
                    >
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        {topic.label}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {topic.children.map((child) => (
                          <Chip
                            key={child.id}
                            label={child.label}
                            size="small"
                            variant={formData.subtopic?.id === child.id ? 'filled' : 'outlined'}
                            color={formData.subtopic?.id === child.id ? 'primary' : 'default'}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateField('topic', topic);
                              updateField('subtopic', child);
                            }}
                          />
                        ))}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={2}
                label="توضیحات اضافی (اختیاری)"
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </Stack>
          )}

          {/* Step 4: Confirmation */}
          {activeStep === 3 && (
            <Stack spacing={3}>
              <Typography variant="h6">بررسی و تایید نهایی</Typography>

              <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'grey.100' }}>
                <Stack spacing={1.5}>
                  <InfoRow label="شخصیت" value={formData.politician?.name || '-'} />
                  <InfoRow label="لینک" value={formData.url || 'فایل آپلود شده'} />
                  <InfoRow label="منبع" value={formData.urlPreview?.source || '-'} />
                  <InfoRow label="گزاره" value={formData.statement || '-'} />
                  <InfoRow label="موضوع" value={formData.topic?.label || '-'} />
                  <InfoRow label="زیرموضوع" value={formData.subtopic?.label || '-'} />
                </Stack>
              </Box>

              <Alert severity="info">
                پس از ثبت، مدرک شما وارد فرآیند اعتبارسنجی می‌شود و نتیجه از طریق نوتیفیکیشن اطلاع‌رسانی خواهد شد.
              </Alert>
            </Stack>
          )}

          {/* Navigation Buttons */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
            >
              مرحله قبل
            </Button>

            {activeStep === STEPS.length - 1 ? (
              <Button variant="contained" color="success" onClick={handleSubmit}>
                ثبت نهایی
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<Iconify icon="eva:arrow-forward-fill" />}
              >
                مرحله بعد
              </Button>
            )}
          </Stack>
        </Card>
      )}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function InfoRow({ label, value }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="subtitle2" sx={{ minWidth: 80 }}>
        {label}:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Stack>
  );
}
