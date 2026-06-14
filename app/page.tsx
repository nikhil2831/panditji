import { BookingForm } from "@/components/booking-form";
import { PoojaCard } from "@/components/pooja-card";
import { poojaServices } from "@/lib/data/poojas";

export default function Home() {
  return (
    <main className="page">
      <header className="header">
        <nav className="container nav">
          <a className="brand" href="#">
            <span className="brand-mark">ॐ</span>
            <span>Pandit <span className="brand-text-accent">Ji</span></span>
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#booking">Booking</a>
            <a className="button-call" href="tel:+919999999999">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="call-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call Now</span>
            </a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Pooja, Havan, Muhurat</div>
            <h1>Book trusted Pandit ji for every sacred occasion.</h1>
            <p>
              Ghar, mandir, office ya online pooja ke liye verified Pandit ji,
              clear samagri list, and simple booking flow.
            </p>
            <div className="actions">
              <a className="button button-primary" href="#booking">
                Book Pooja
              </a>
              <a className="button button-secondary" href="#services">
                View Services
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Service highlights">
            <h2>Today&apos;s focus</h2>
            <div className="stat-list">
              <div className="stat">
                <span>Most booked</span>
                <strong>Satyanarayan Katha</strong>
              </div>
              <div className="stat">
                <span>Available modes</span>
                <strong>Home / Online</strong>
              </div>
              <div className="stat">
                <span>Support</span>
                <strong>Hindi, Sanskrit</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <div className="section-title">
            <h2>Pooja services</h2>
            <p>
              Common services ko seedha data layer se render kiya gaya hai, so
              backend/database connect karna easy rahega.
            </p>
          </div>
          <div className="cards">
            {poojaServices.map((pooja) => (
              <PoojaCard key={pooja.id} pooja={pooja} />
            ))}
          </div>
        </div>
      </section>

      <section className="section booking" id="booking">
        <div className="container booking-grid">
          <div>
            <div className="eyebrow">Booking request</div>
            <h2>Apni Shubh Pooja Ke Liye Request Bhejein</h2>
            <p>
              Apni suvidha ke anusar shubh date, pooja aur details fill karein. 
              Humare verified Pandit Ji aapse connect karke samagri list aur pooja vidhi ki poori jankari pradan karenge.
            </p>
          </div>
          <BookingForm services={poojaServices} />
        </div>
      </section>

      <footer className="footer">
        <div className="container">Pandit Ji Platform - Next.js structure ready.</div>
      </footer>
    </main>
  );
}
