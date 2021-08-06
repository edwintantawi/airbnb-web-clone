import React from 'react';
// components
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppHero from '@/components/atoms/AppHero';

export default function Home() {
  return (
    <>
      <AppHead />
      <AppHeader />
      <AppHero />
    </>
  );
}
