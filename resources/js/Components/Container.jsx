import clsx from 'clsx';
import React from 'react';

export default function Container({ children, className }) {
  return (
    <div className={clsx('container px-3 py-3', className)}>{children}</div>
  );
}
