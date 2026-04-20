import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  analytics: icon('ic-analytics'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  user: icon('ic-user'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: 'دیده‌بان',
    items: [
      {
        title: 'شناخت افراد',
        path: paths.dashboard.search,
        icon: ICONS.analytics,
      },
      {
        title: 'ثبت مستندات',
        path: paths.dashboard.submit,
        icon: ICONS.file,
      },
    ],
  },
  {
    subheader: 'مدیریت',
    items: [
      {
        title: 'میز کار ناظر',
        path: paths.dashboard.moderator,
        icon: ICONS.lock,
      },
    ],
  },
];
