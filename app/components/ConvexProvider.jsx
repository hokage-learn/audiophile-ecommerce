'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  // NEXT_PUBLIC_CONVEX_URL is not set - using placeholder
}

const convex = new ConvexReactClient(convexUrl || 'https://placeholder.convex.cloud');

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

