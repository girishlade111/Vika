import { Link } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { OFFICES } from '@/data/offices';

export function CinematicContact() {
  return (
    <SiteLayout
      title="Contact | Book thirty minutes with a partner, Cinematic layout"
      description="Pick a partner, a day and a time. A calendar invitation follows within the hour."
    >
      <section className="section-contact-cinematic-booking">
        <div className="booking_component">
          <div className="booking_side">
            <img
              src="/assets/images/studio/6ad74e66105689040c7bc939_vika-london-reception.webp"
              alt="Quiet office reception interior in London"
              className="cinematic-media_image"
            />
            <div className="booking_overlay" />

            <div className="booking_top">
              <p className="cinematic-media_label text-style-label">
                <Link to="/cinematic/home-cinematic" className="booking_crumb-link">
                  Index
                </Link>{' '}
                / Contact
              </p>
              <p className="cinematic-media_label text-style-label">(05) Contact</p>
            </div>

            <div className="booking_copy">
              <h1 className="booking_heading">
                Book thirty minutes <span className="booking_muted">with a partner.</span>
              </h1>
              <p className="booking_text">
                Pick a partner, a day and a time. A calendar invitation follows within the hour,
                with a video link and a short list of what to bring.
              </p>

              <div className="booking_offices">
                {[OFFICES.dubai, OFFICES.london].map((office) => (
                  <div key={office.id} className="booking_office">
                    <p className="booking_office-city">{office.city}</p>
                    <p className="booking_office-hours">{office.hoursLabel}</p>
                    <a href={office.phoneHref} className="booking_office-link">
                      {office.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="booking_card">
            <div className="booking_card-top">
              <p className="booking_card-title">Request a call</p>
              <p className="text-style-label">Reply within the hour</p>
            </div>
            <div className="form_component">
              <BookingFlow />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
