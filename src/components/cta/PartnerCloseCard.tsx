import { OFFICES } from '@/data/offices';
import { VikaButton } from '@/components/common/VikaButton';
import { useBooking } from '@/context/BookingContext';

interface PartnerCloseCardProps {
  id?: string;
  sectionClassName?: string;
  description?: string;
}

export function PartnerCloseCard({
  id,
  sectionClassName = 'section-home-close',
  description = 'Thirty minutes with our managing partner. By the end of the call you will know whether we are the right firm for you.',
}: PartnerCloseCardProps) {
  const { openBooking } = useBooking();

  return (
    <section id={id} className={sectionClassName}>
      <div className="padding-global padding-section-large">
        <div className="grid-global">
          <div className="home-close_card">
            <div className="home-close_media">
              <img
                src="/assets/images/insights/6ad74ed70180ecbacfafd39d_hf_20261020_105655_0524c85e-01bc-443b-b4b9-f24330481881_min.webp"
                alt="Two hands passing a burgundy document folder across an oak table"
                loading="lazy"
                className="home-close_image"
              />
            </div>
            <div className="home-close_content">
              <div className="home-close_top">
                <p className="text-style-label">Talk to a partner</p>
                <h2 className="home-close_heading heading-style-h1">Talk to Sara.</h2>
                <p className="text-size-large">{description}</p>
              </div>
              <div className="home-close_bottom">
                <p className="home-close_status text-style-label">
                  <span className="navbar_dot" aria-hidden="true" />
                  Dubai office open {OFFICES.dubai.hoursLabel}
                </p>
                <div className="home-close_actions">
                  <VikaButton
                    label="Book a call"
                    hoverLabel="with a partner"
                    variant="dark"
                    onClick={() => openBooking({ partnerSlug: 'sara-lindqvist' })}
                  />
                  <a href="mailto:sara@vika.example" className="text-style-link">
                    sara@vika.example
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
