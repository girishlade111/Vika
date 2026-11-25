import { useEffect, useState } from 'react';
import { formatOfficeTime } from '@/data/offices';

interface OfficeClockProps {
  timezone: string;
  size?: 'mini' | 'large';
  showDigital?: boolean;
  className?: string;
}

export function OfficeClock({
  timezone,
  size = 'mini',
  showDigital = true,
  className = '',
}: OfficeClockProps) {
  const [time, setTime] = useState(() => formatOfficeTime(timezone));

  useEffect(() => {
    const update = () => setTime(formatOfficeTime(timezone));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timezone]);

  const hourDeg = (time.hour % 12) * 30 + time.minute * 0.5;
  const minuteDeg = time.minute * 6 + time.second * 0.1;
  const secondDeg = time.second * 6;
  const miniCls = size === 'mini' ? 'is-mini' : '';

  return (
    <span className={`navbar_menu-clock ${className}`.trim()} data-clock-tz={timezone}>
      <span aria-hidden="true" className={`clock_dial ${miniCls}`.trim()}>
        <span
          className={`clock_hand is-hour ${miniCls}`.trim()}
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        <span
          className={`clock_hand is-minute ${miniCls}`.trim()}
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />
        <span
          className="clock_hand is-second"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />
        <span className={`clock_pin ${miniCls}`.trim()} />
      </span>
      {showDigital && (
        <span data-clock-time="" className={size === 'mini' ? 'navbar_menu-time' : 'office-text_time'}>
          {time.formatted}
        </span>
      )}
    </span>
  );
}
