'use client';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import axiosInstance from 'src/lib/axios';
import { CONFIG } from 'src/global-config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProfileMatrixTab } from './profile-matrix-tab';
import { ProfileEvidenceTab } from './profile-evidence-tab';
import { ProfileOverviewTab } from './profile-overview-tab';
import { ProfileAccountabilityTab } from './profile-accountability-tab';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'overview', label: 'ویترین', icon: 'solar:chart-bold' },
  { value: 'matrix', label: 'کارنامه تخصصی', icon: 'solar:document-bold' },
  { value: 'accountability', label: 'وعده‌ها و عملکرد', icon: 'solar:checklist-bold' },
  { value: 'evidence', label: 'آرشیو و مشارکت', icon: 'solar:archive-bold' },
];

const SERVER_URL = CONFIG.serverUrl || 'http://localhost:3000';

// ----------------------------------------------------------------------

export function ProfileView({ id }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('overview');
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/api/politicians/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChangeTab = useCallback((_, v) => setCurrentTab(v), []);

  const handleSubmitEvidence = useCallback(() => {
    if (!profile) return;
    const pid = profile.memberId || profile.id;
    router.push(`${paths.dashboard.submit}?politician=${pid}&name=${encodeURIComponent(profile.name)}`);
  }, [router, profile]);

  const handleShareOpen = useCallback((e) => setShareAnchorEl(e.currentTarget), []);
  const handleShareClose = useCallback(() => setShareAnchorEl(null), []);

  const shareText = profile ? `پروفایل ${profile.name} در دیده‌بان` : '';

  const handleShare = useCallback(
    (type) => {
      const url = window.location.href;
      const text = encodeURIComponent(shareText);
      const encodedUrl = encodeURIComponent(url);

      switch (type) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`, '_blank');
          break;
        case 'telegram':
          window.open(`https://t.me/share/url?url=${encodedUrl}&text=${text}`, '_blank');
          break;
        case 'instagram':
          navigator.clipboard.writeText(url);
          toast.success('لینک کپی شد — در اینستاگرام پیست کنید');
          break;
        case 'bale':
          window.open(`https://ble.ir/share?url=${encodedUrl}&text=${text}`, '_blank');
          break;
        default:
          break;
      }
      handleShareClose();
    },
    [shareText, handleShareClose]
  );

  const avatarUrl = (() => {
    if (!profile?.avatar) return null;
    if (profile.avatar.startsWith('http')) return profile.avatar;
    return `${SERVER_URL}${profile.avatar}`;
  })();

  // Loading
  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  // Not found
  if (!profile) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" color="text.secondary">پروفایل یافت نشد</Typography>
        </Box>
      </DashboardContent>
    );
  }

  // Parse lists
  const occupations = profile.occupation
    ? profile.occupation.split('|').map((o) => o.trim()).filter(Boolean)
    : [];
  const committeesList = profile.committees
    ? profile.committees.split('|').map((c) => c.trim()).filter(Boolean)
    : [];

  // Enriched profile for tabs
  const enrichedProfile = {
    ...profile,
    truthScore: profile.truthScore || 0,
    stabilityScore: profile.stabilityScore || 0,
    clarityScore: profile.clarityScore || 0,
    populismScore: profile.populismScore || 0,
    personaRadar: profile.personaRadar || {
      aggressive: 0, global: 0, reformist: 0, transparent: 0, rational: 0, formal: 0,
    },
    topKeywords: profile.topKeywords
      ? profile.topKeywords.map((kw, i) => ({ text: kw, value: 10 - i }))
      : [],
    recentContradictions: [],
    aiSummary: null,
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* ── Header Card ── */}
      <Card sx={{ p: { xs: 3, md: 4 }, mb: 3, textAlign: 'center' }}>
        <Avatar
          src={avatarUrl}
          sx={{
            width: 110,
            height: 110,
            fontSize: 44,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.main',
            border: (theme) => `3px solid ${theme.palette.primary.lighter}`,
          }}
        >
          {profile.name?.[0]}
        </Avatar>

        <Typography variant="h4" sx={{ mb: 0.5 }}>{profile.name}</Typography>
        <Typography variant="body1" color="text.secondary">{profile.role}</Typography>

        {profile.constituency && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            حوزه انتخابیه: {profile.constituency}
          </Typography>
        )}
        {profile.periodProvince && (
          <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.5 }}>
            {profile.periodProvince}
          </Typography>
        )}

        {/* Actions */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2.5 }}>
          <Button variant="contained" startIcon={<Iconify icon="eva:file-add-fill" />} onClick={handleSubmitEvidence}>
            ثبت مدرک جدید
          </Button>
          <Button variant="outlined" startIcon={<Iconify icon="eva:share-fill" />} onClick={handleShareOpen}>
            اشتراک‌گذاری
          </Button>
          {profile.profileUrl && (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="eva:external-link-fill" />}
              onClick={() => window.open(profile.profileUrl, '_blank')}
            >
              منبع
            </Button>
          )}
        </Stack>

        {/* Share Popover */}
        <Popover
          open={Boolean(shareAnchorEl)}
          anchorEl={shareAnchorEl}
          onClose={handleShareClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MenuItem onClick={() => handleShare('twitter')}>
            <Iconify icon="ri:twitter-x-fill" sx={{ mr: 1 }} /> Twitter / X
          </MenuItem>
          <MenuItem onClick={() => handleShare('telegram')}>
            <Iconify icon="ri:telegram-fill" sx={{ mr: 1 }} /> تلگرام
          </MenuItem>
          <MenuItem onClick={() => handleShare('instagram')}>
            <Iconify icon="ri:instagram-fill" sx={{ mr: 1 }} /> اینستاگرام
          </MenuItem>
          <MenuItem onClick={() => handleShare('bale')}>
            <Iconify icon="solar:share-bold" sx={{ mr: 1 }} /> بله
          </MenuItem>
        </Popover>

        <Divider sx={{ my: 3 }} />

        {/* ── Info Grid ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            textAlign: 'right',
          }}
        >
          {profile.education && (
            <InfoBlock icon="solar:square-academic-cap-bold-duotone" label="تحصیلات" value={profile.education} />
          )}
          {profile.birthDate && (
            <InfoBlock icon="solar:calendar-bold-duotone" label="تاریخ تولد" value={profile.birthDate} />
          )}
          {profile.birthPlace && (
            <InfoBlock icon="solar:map-point-bold-duotone" label="محل تولد" value={profile.birthPlace} />
          )}
          {profile.politicalParty && (
            <InfoBlock icon="solar:flag-bold-duotone" label="حزب" value={profile.politicalParty} />
          )}
          {profile.votesCount && (
            <InfoBlock icon="solar:chart-bold-duotone" label="تعداد آرا" value={profile.votesCount} />
          )}
          {profile.fieldOfStudy && (
            <InfoBlock icon="solar:book-bold-duotone" label="رشته تحصیلی" value={profile.fieldOfStudy} />
          )}
        </Box>
      </Card>

      {/* ── Career & Committees Card ── */}
      {(occupations.length > 0 || committeesList.length > 0) && (
        <Card sx={{ p: { xs: 2.5, md: 3 }, mb: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: occupations.length > 0 && committeesList.length > 0 ? '1fr 1fr' : '1fr' },
              gap: 3,
            }}
          >
            {/* Occupations */}
            {occupations.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'warning.lighter',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:case-round-bold-duotone" width={20} color="warning.main" />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    سوابق شغلی
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  {occupations.map((occ, i) => (
                    <Stack
                      key={i}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'background.neutral',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'warning.main',
                          mt: 0.8,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">{occ}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Committees */}
            {committeesList.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: 'info.lighter',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:buildings-bold-duotone" width={20} color="info.main" />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    عضویت در کمیسیون‌ها
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  {committeesList.map((com, i) => (
                    <Stack
                      key={i}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'background.neutral',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'info.main',
                          mt: 0.8,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">{com}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Card>
      )}

      {/* ── Tabs ── */}
      <Tabs value={currentTab} onChange={handleChangeTab} sx={{ mb: 3 }} variant="scrollable" scrollButtons="auto">
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} icon={<Iconify icon={tab.icon} />} iconPosition="start" />
        ))}
      </Tabs>

      {currentTab === 'overview' && <ProfileOverviewTab profile={enrichedProfile} />}
      {currentTab === 'matrix' && <ProfileMatrixTab profile={enrichedProfile} />}
      {currentTab === 'accountability' && <ProfileAccountabilityTab profile={enrichedProfile} />}
      {currentTab === 'evidence' && <ProfileEvidenceTab profile={enrichedProfile} />}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function InfoBlock({ icon, label, value }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 1,
        bgcolor: 'background.neutral',
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Iconify icon={icon} width={20} color="primary.main" />
        <Box>
          <Typography variant="caption" color="text.disabled" display="block">{label}</Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
