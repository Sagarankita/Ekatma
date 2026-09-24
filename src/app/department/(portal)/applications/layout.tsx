'use client';

export default function ApplicationsLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex-1 flex overflow-hidden max-w-[1440px] w-full mx-auto">
        {/* No sidebar in application workflow */}
        <div className="flex-1 overflow-auto bg-white">
          {children}
        </div>
      </div>
  );
}
