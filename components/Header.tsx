
import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <ChefHatIcon className="h-12 w-12 text-amber-500" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Bếp Trưởng AI
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
        Biến những nguyên liệu sẵn có của bạn thành một tuyệt tác. Hôm nay tủ bếp của bạn có gì?
      </p>
    </header>
  );
};
