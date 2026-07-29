import React from 'react';
import { Tractor } from 'lucide-react';

export const RedTractor: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 pointer-events-none z-50 overflow-hidden">
      <div className="absolute bottom-3 left-0 animate-[drive_20s_linear_infinite] flex items-end">
        {/* Harrow Attachment */}
        <div className="flex items-end mb-1 mr-1 relative">
          <div className="w-8 h-1 bg-zinc-400 rounded-full absolute bottom-2 -left-1 z-10" />
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-zinc-500 rounded-sm skew-x-12" />
            <div className="w-1 h-4 bg-zinc-500 rounded-sm skew-x-12" />
            <div className="w-1 h-4 bg-zinc-500 rounded-sm skew-x-12" />
            <div className="w-1 h-4 bg-zinc-500 rounded-sm skew-x-12" />
          </div>
          {/* Connector to tractor */}
          <div className="w-4 h-1 bg-zinc-600 absolute bottom-1.5 -right-3" />
        </div>
        {/* Red Tractor */}
        <div className="text-red-500 relative">
           <Tractor className="w-10 h-10 drop-shadow-lg fill-red-500 stroke-red-700" strokeWidth={1.5} />
        </div>
      </div>
      <style>{`
        @keyframes drive {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(105vw); }
        }
      `}</style>
    </div>
  );
};
