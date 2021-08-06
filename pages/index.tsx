/* eslint-disable @next/next/no-img-element */
import React from 'react';
// components
import AppHead from '@/components/atoms/AppHead';
import AppHeader from '@/components/organisms/AppHeader';
import AppHero from '@/components/atoms/AppHero';
import AppBanner from '@/components/atoms/AppBanner';

export default function Home() {
  return (
    <>
      <AppHead />
      <AppHeader />
      <AppHero />
      <AppBanner />
    </>
  );
}
