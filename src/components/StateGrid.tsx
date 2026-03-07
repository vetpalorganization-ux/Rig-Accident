'use client';

import Image from 'next/image';

type StateItem = { code: string; name: string };

const STATES: StateItem[] = [
  { code: 'TX', name: 'Texas' },
  { code: 'FL', name: 'Florida' },
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'IL', name: 'Illinois' },
  { code: 'GA', name: 'Georgia' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'OH', name: 'Ohio' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'MI', name: 'Michigan' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'MO', name: 'Missouri' },
  { code: 'CO', name: 'Colorado' },
  { code: 'WA', name: 'Washington' },
];

export default function StateGrid() {
  return (
    <ul className="flex flex-wrap gap-3 md:gap-4">
      {STATES.map((s) => (
        <li key={s.code}>
          <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={`/images/state-flags/${s.code}.svg`}
              alt={`${s.name} flag`}
              fill
              sizes="120px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/40" />
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
