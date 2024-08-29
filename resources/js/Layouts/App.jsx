import React from 'react';
import Sidebar from './Sidebar';
import { Toaster } from '@/Components/ui/toaster';

export default function App({ children }) {
  return (
    <>
      <div className="flex items-start justify-between ">
        <Sidebar />
        <main className="w-full h-full ml-[300px]">{children}</main>
        <Toaster />
      </div>
    </>
  );
}
