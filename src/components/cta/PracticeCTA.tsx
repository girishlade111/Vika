import { VikaButton } from '@/components/common/VikaButton';
import { useBooking } from '@/context/BookingContext';

interface PracticeCTAProps {
  label?: string;
  headingPrimary?: string;
  headingMuted?: string;
  buttonLabel?: string;
  buttonHover?: string;
}

export function PracticeCTA({
  label = 'Talk to a partner',
  headingPrimary = 'Not sure which practice you need?',
  headingMuted = 'Start with thirty minutes.',
  buttonLabel = 'Book a call',
  buttonHover = 'with a partner',
}: PracticeCTAProps) {
  const { openBooking } = useBooking();

  return (
    <section className="band_component">
      <div className="padding-global">
        <div className="grid-global">
          <div className="band_content">
            <p className="text-style-label">{label}</p>
            <h2 className="band_heading heading-style-h2">
              {headingPrimary} <span className="text-color-secondary">{headingMuted}</span>
            </h2>
          </div>
          <div className="band_action">
            <VikaButton
              label={buttonLabel}
              hoverLabel={buttonHover}
              variant="light"
              onClick={() => openBooking()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
