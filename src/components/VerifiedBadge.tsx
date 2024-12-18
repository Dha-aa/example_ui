import React from 'react';
import { BadgeCheck } from 'lucide-react';

export default function VerifiedBadge() {
  return (
    <BadgeCheck className="inline-block w-5 h-5 text-blue-500 ml-1" aria-label="Verified account" />
  );
}