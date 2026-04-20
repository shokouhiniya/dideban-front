import { CONFIG } from 'src/global-config';

import { SubmitView } from 'src/sections/submit/view';

// ----------------------------------------------------------------------

export const metadata = { title: `ثبت مستندات | ${CONFIG.appName}` };

export default function Page() {
  return <SubmitView />;
}
