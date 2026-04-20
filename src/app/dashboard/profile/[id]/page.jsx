import { CONFIG } from 'src/global-config';

import { ProfileView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export const metadata = { title: `پروفایل | ${CONFIG.appName}` };

export default function Page({ params }) {
  return <ProfileView id={params.id} />;
}
