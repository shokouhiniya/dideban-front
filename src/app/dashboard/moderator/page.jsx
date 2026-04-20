import { CONFIG } from 'src/global-config';

import { ModeratorView } from 'src/sections/moderator/view';

// ----------------------------------------------------------------------

export const metadata = { title: `میز کار ناظر | ${CONFIG.appName}` };

export default function Page() {
  return <ModeratorView />;
}
