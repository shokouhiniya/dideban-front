import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'صفحه اصلی',
    href: paths.landing,
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'شناخت افراد',
    href: paths.dashboard.search,
    icon: <Iconify icon="solar:users-group-rounded-bold-duotone" />,
  },
  {
    label: 'ثبت مستندات',
    href: paths.dashboard.submit,
    icon: <Iconify icon="solar:document-add-bold-duotone" />,
  },
  {
    label: 'تنظیمات حساب',
    href: '#',
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
