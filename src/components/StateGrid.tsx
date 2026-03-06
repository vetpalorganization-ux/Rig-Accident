'use client';

type StateItem = { code: string; name: string; flag: string };

// Basic set of states with flag image URLs (Wikimedia). Overlay ensures text contrast.
const STATES: StateItem[] = [
  { code: 'TX', name: 'Texas', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg' },
  { code: 'FL', name: 'Florida', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg' },
  { code: 'CA', name: 'California', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg' },
  { code: 'NY', name: 'New York', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg' },
  { code: 'IL', name: 'Illinois', flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Illinois.svg' },
  { code: 'GA', name: 'Georgia', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Georgia_%28U.S._state%29.svg' },
  { code: 'PA', name: 'Pennsylvania', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Pennsylvania.svg' },
  { code: 'OH', name: 'Ohio', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Ohio.svg' },
  { code: 'NC', name: 'North Carolina', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_North_Carolina.svg' },
  { code: 'AZ', name: 'Arizona', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg' },
  { code: 'MI', name: 'Michigan', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Flag_of_Michigan.svg' },
  { code: 'TN', name: 'Tennessee', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Tennessee.svg' },
  { code: 'MO', name: 'Missouri', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Flag_of_Missouri.svg' },
  { code: 'CO', name: 'Colorado', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Flag_of_Colorado.svg' },
  { code: 'WA', name: 'Washington', flag: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Flag_of_Washington.svg' },
];

export default function StateGrid() {
  return (
    <ul className="flex flex-wrap gap-3 md:gap-4">
      {STATES.map((s) => (
        <li key={s.code}>
          <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-gray-200">
            <img
              src={s.flag}
              alt={`${s.name} flag`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
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
