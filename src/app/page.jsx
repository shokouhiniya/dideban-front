'use client';

import { useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/landing');
  }, [router]);

  return null;
}
