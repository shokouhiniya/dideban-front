import { CONFIG } from 'src/global-config';

import { SearchView } from 'src/sections/search/view';

// ----------------------------------------------------------------------

export const metadata = { title: `شناخت افراد | ${CONFIG.appName}` };

export default function Page() {
  return <SearchView />;
}
