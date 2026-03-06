'use client';

import Image from 'next/image';

type StateItem = { code: string; name: string; flag: string };

// Basic set of states with flag image URLs (Wikimedia). Overlay ensures text contrast.
const STATES: StateItem[] = [
  // Using Wikimedia PNG thumbnails to avoid cross-origin SVG ORB blocking
  { code: 'TX', name: 'Texas', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/120px-Flag_of_Texas.svg.png' },
  { code: 'FL', name: 'Florida', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/120px-Flag_of_Florida.svg.png' },
  { code: 'CA', name: 'California', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/120px-Flag_of_California.svg.png' },
  { code: 'NY', name: 'New York', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/120px-Flag_of_New_York.svg.png' },
  { code: 'IL', name: 'Illinois', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/120px-Flag_of_Illinois.svg.png' },
  { code: 'GA', name: 'Georgia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/120px-Flag_of_Georgia_%28U.S._state%29.svg.png' },
  { code: 'PA', name: 'Pennsylvania', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/120px-Flag_of_Pennsylvania.svg.png' },
  { code: 'OH', name: 'Ohio', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/120px-Flag_of_Ohio.svg.png' },
  { code: 'NC', name: 'North Carolina', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/120px-Flag_of_North_Carolina.svg.png' },
  { code: 'AZ', name: 'Arizona', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/120px-Flag_of_Arizona.svg.png' },
  { code: 'MI', name: 'Michigan', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/120px-Flag_of_Michigan.svg.png' },
  { code: 'TN', name: 'Tennessee', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/120px-Flag_of_Tennessee.svg.png' },
  { code: 'MO', name: 'Missouri', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/120px-Flag_of_Missouri.svg.png' },
  { code: 'CO', name: 'Colorado', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/120px-Flag_of_Colorado.svg.png' },
  { code: 'WA', name: 'Washington', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/120px-Flag_of_Washington.svg.png' },
];

export default function StateGrid() {
  return (
    <ul className="flex flex-wrap gap-3 md:gap-4">
      {STATES.map((s) => (
        <li key={s.code}>
          <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={s.flag}
              alt={`${s.name} flag`}
              fill
              sizes="120px"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
              <div className="text-white text-2xl font-extrabold leading-none">{s.code}</div>
              <div className="text-white text-xs font-semibold mt-1">{s.name}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
