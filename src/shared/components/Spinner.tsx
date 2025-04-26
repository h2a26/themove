'use client';

import { SpinnerGap } from 'phosphor-react';
import React from 'react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 32, className = '' }) => (
  <span className={className}>
    <SpinnerGap size={size} weight="duotone" className="animate-spin" />
  </span>
);

export default Spinner;
