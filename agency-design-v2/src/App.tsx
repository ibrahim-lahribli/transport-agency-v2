import { FormEvent, ReactNode, useEffect, useState } from "react";

type Page =
  | "home"
  | "excursions"
  | "activities"
  | "transfers"
  | "service"
  | "booking"
  | "success"
  | "places"
  | "guides"
  | "about"
  | "faq"
  | "contact"
  | "system";

type Trip = {
  title: string;
  tag: string;
  description: string;
  price: string;
  image: string;
  rating?: string;
};

const images = {
  hero: "https://images.unsplash.com/photo-1710092538995-4af0c11a3f3c?auto=format&fit=crop&w=1800&q=85",
  coast: "https://images.unsplash.com/photo-1533813031913-6a764882db2c?auto=format&fit=crop&w=1200&q=80",
  beach: "https://images.unsplash.com/photo-1533812436742-e4f8853a4ba0?auto=format&fit=crop&w=1200&q=80",
  boats: "https://images.unsplash.com/photo-1669882689201-c56a0aa948e0?auto=format&fit=crop&w=1200&q=80",
  city: "https://images.unsplash.com/photo-1665303655457-cd9655b4ff9d?auto=format&fit=crop&w=1200&q=80",
  cliffs: "https://images.unsplash.com/photo-1580908266045-531b68c8e96a?auto=format&fit=crop&w=1200&q=80",
  road: "https://images.unsplash.com/photo-1761385937220-285841f0aff1?auto=format&fit=crop&w=1200&q=80",
};

const trips: Trip[] = [
  { title: "Paradise Valley & Atlas foothills", tag: "Half day", description: "Swim, walk and slow down among palms and natural pools.", price: "35 €", image: images.cliffs, rating: "Rating placeholder" },
  { title: "Essaouira, at your own pace", tag: "Full day", description: "A breezy medina, fishing harbour and time by the Atlantic.", price: "45 €", image: images.boats, rating: "Rating placeholder" },
  { title: "Small desert & wild coast", tag: "Full day", description: "A day of dunes, fishing villages and wide-open landscapes.", price: "55 €", image: images.road, rating: "Rating placeholder" },
  { title: "Surf lesson at Taghazout", tag: "Half day", description: "A relaxed first session with a local surf instructor.", price: "30 €", image: images.coast, rating: "Rating placeholder" },
  { title: "Agadir city stories", tag: "Half day", description: "Kasbah views, neighbourhood life and the colourful souk.", price: "25 €", image: images.city, rating: "Rating placeholder" },
  { title: "Sunset camel ride", tag: "2 hours", description: "A quiet ride through eucalyptus trails towards the dunes.", price: "28 €", image: images.beach, rating: "Rating placeholder" },
];

const pagePaths: Record<Page, string> = {
  home: "/",
  excursions: "/excursions",
  activities: "/activities",
  transfers: "/transfers",
  service: "/excursions/paradise-valley",
  booking: "/plan",
  success: "/plan/success",
  places: "/places",
  guides: "/guides",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  system: "/design-system",
};

function getPage(): Page {
  const path = window.location.pathname;
  return (Object.entries(pagePaths).find(([, value]) => value === path)?.[0] as Page) || "home";
}

function Link({ to, children, className = "" }: { to: Page; children: ReactNode; className?: string }) {
  return <a href={pagePaths[to]} className={className} data-page={to}>{children}</a>;
}

function ArrowLink({ to, children }: { to: Page; children: ReactNode }) {
  return <Link to={to} className="text-link">{children} <span aria-hidden="true">→</span></Link>;
}

function Button({ to, children, variant = "primary", type }: { to?: Page; children: ReactNode; variant?: "primary" | "secondary" | "light"; type?: "submit" }) {
  const className = `button button--${variant}`;
  return to ? <Link to={to} className={className}>{children}</Link> : <button className={className} type={type || "button"}>{children}</button>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return <div className="section-heading">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  return (
    <header className="header">
      <div className="shell header__inner">
        <Link to="home" className="logo" aria-label="Agadir Tourisme home"><span className="logo__mark">AT</span><span>Agadir<br />Tourisme</span></Link>
        <nav className="nav" aria-label="Main navigation">
          <Link to="excursions" className={page === "excursions" ? "active" : ""}>Excursions</Link>
          <Link to="activities" className={page === "activities" ? "active" : ""}>Activities</Link>
          <Link to="transfers" className={page === "transfers" ? "active" : ""}>Transfers</Link>
        </nav>
        <div className="header__actions">
          <div className="language-wrap">
            <button className="language" aria-label="Change language" aria-expanded={languageOpen} onClick={() => setLanguageOpen(!languageOpen)}>EN <span className="chevron" aria-hidden="true" /></button>
            {languageOpen && <div className="language-menu" role="menu"><button className="selected" role="menuitem">English <span>✓</span></button><button role="menuitem">Français</button><button role="menuitem">Deutsch</button></div>}
          </div>
          <Button to="booking">Plan my trip</Button>
          <button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}><span className="menu-lines" aria-hidden="true" />Menu</button>
        </div>
      </div>
      {open && <nav className="mobile-menu" aria-label="Mobile navigation">
        {(["excursions", "activities", "transfers", "places", "guides", "about", "faq", "contact"] as Page[]).map((item) => <Link key={item} to={item} className="mobile-menu__item">{item[0].toUpperCase() + item.slice(1)} <span>→</span></Link>)}
      </nav>}
    </header>
  );
}

function Footer() {
  return <footer className="footer">
    <div className="shell footer__grid">
      <div><Link to="home" className="logo logo--footer"><span className="logo__mark">AT</span><span>Agadir<br />Tourisme</span></Link><p>Thoughtful days around Agadir,<br />planned by people who live here.</p></div>
      <div><h3>Explore</h3><Link to="excursions">Excursions</Link><Link to="activities">Activities</Link><Link to="transfers">Transfers</Link><Link to="places">Places</Link></div>
      <div><h3>Know us</h3><Link to="guides">Local guides</Link><Link to="about">About</Link><Link to="faq">FAQ</Link><Link to="contact">Contact</Link></div>
      <div><h3>Contact</h3><a className="whatsapp-link" href="https://wa.me/000000000" target="_blank" rel="noreferrer">WhatsApp us</a><a className="footer-contact-link" href="mailto:hello@example.com">hello@example.com</a><a className="footer-contact-link" href="tel:+212000000000">+212 [number placeholder]</a><p>[Address placeholder]<br />Agadir, Morocco</p></div>
    </div>
    <div className="shell footer__bottom"><span>© 2025 Agadir Tourisme</span><div><a href="#credits">Photo credits</a><a href="#terms">Terms</a><a href="#privacy">Privacy</a></div></div>
  </footer>;
}

function MobileBar({ booking = false, onSubmit, visible = true, total = 70 }: { booking?: boolean; onSubmit?: () => void; visible?: boolean; total?: number }) {
  return <div className={`mobile-bar ${booking ? "mobile-bar--booking" : ""} ${visible ? "mobile-bar--visible" : ""}`}>
    {booking ? <><div><small>Estimated total</small><strong>{total} €</strong><em>No payment now · Free cancellation</em></div><button onClick={onSubmit}>Send request</button></> : <><Button to="booking">Plan my trip</Button><a href="https://wa.me/000000000">WhatsApp</a></>}
  </div>;
}

function TripCard({ trip }: { trip: Trip }) {
  return <article className="trip-card">
    <Link to="service" className="trip-card__link" aria-label={`View ${trip.title}`}>
      <div className="trip-card__image"><img src={trip.image} alt="" /><span className="image-note">Photo placeholder</span></div>
      <div className="trip-card__body">
        <div className="card-meta"><span className="tag">{trip.tag}</span><span>{trip.rating}</span></div>
        <h3>{trip.title}</h3><p>{trip.description}</p>
        <div className="facts">Hotel pickup <span>·</span> Free cancellation</div>
        <div className="card-footer"><strong>From {trip.price} <small>/ person</small></strong><span>View trip →</span></div>
      </div>
    </Link>
  </article>;
}

function TripGrid({ items = trips }: { items?: Trip[] }) {
  return <div className="trip-grid">{items.map((trip) => <TripCard key={trip.title} trip={trip} />)}</div>;
}

function CTA() {
  return <section className="closing-cta"><div className="shell closing-cta__inner"><div><Eyebrow>Made around you</Eyebrow><h2>Let’s make your day in Agadir feel easy.</h2></div><div className="button-row"><Button to="booking" variant="light">Plan my trip</Button><a className="button button--ghost-light" href="https://wa.me/000000000">Ask us on WhatsApp</a></div></div></section>;
}

function FAQList({ limit }: { limit?: number }) {
  const faqs = [
    ["Do I pay when I send a request?", "No. Sending a request does not take payment. We confirm the details by email or WhatsApp, and you pay on the day."],
    ["Can you collect me from my hotel?", "Hotel pickup is available for many experiences. The exact pickup area is confirmed with your request."],
    ["What if my plans change?", "Free cancellation is available up to 24 hours before most services. Any exceptions will be clear before confirmation."],
    ["Are trips private or shared?", "Both are possible. Group format is always shown on the service page and confirmed by our local team."],
    ["Which languages do guides speak?", "Language availability is a placeholder until the agency confirms its guide roster."],
  ];
  return <div className="accordion-list">{faqs.slice(0, limit).map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span className="accordion-icon" aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>;
}

function HomePage() {
  const moods = [
    ["Cool off in nature", images.cliffs, "excursions" as Page],
    ["Meet the Atlantic", images.coast, "activities" as Page],
    ["Taste local life", images.city, "places" as Page],
    ["Chase wide horizons", images.road, "excursions" as Page],
    ["Take it slowly", images.boats, "activities" as Page],
  ];
  return <main>
    <section className="hero">
      <img src={images.hero} alt="Sunny Agadir beach with the Atlas foothills beyond" />
      <span className="image-note image-note--hero">Photo placeholder · Agadir coast</span>
      <div className="hero__overlay" />
      <div className="shell hero__content"><Eyebrow>Local days, thoughtfully planned</Eyebrow><h1>See Agadir<br />with people who know it.</h1><p>Guided day trips, outdoor activities and private airport transfers—arranged locally, confirmed personally.</p><div className="button-row"><Button to="excursions" variant="light">Explore experiences</Button><a className="button button--ghost-light" href="https://wa.me/000000000">Ask us on WhatsApp</a></div></div>
    </section>
    <div className="trust-strip"><div className="shell"><span>Licensed local operator <i>·</i></span><span>No advance payment <i>·</i></span><span>Free cancellation 24h <i>·</i></span><span>WhatsApp 7/7</span></div></div>
    <section className="section shell"><SectionHeading eyebrow="Choose a mood" title="What do you feel like doing?" /><div className="mood-grid">{moods.map(([title, image, to]) => <Link to={to as Page} className="mood-card" key={title}><img src={image} alt="" /><div><h3>{title}</h3><span>Explore →</span></div></Link>)}</div><div className="carousel-dots" aria-label="Carousel position"><span className="active" /><span /><span /><span /><span /></div></section>
    <section className="section section--tint"><div className="shell"><SectionHeading eyebrow="Guest favourites" title="A good place to start" body="Six easy ways to get to know the coast, mountains and everyday life around Agadir." /><TripGrid /></div></section>
    <section className="section shell transfer-feature"><div><Eyebrow>Private transfers</Eyebrow><h2>From arrivals hall<br />to holiday mode.</h2><p>Private, door-to-door airport pickup with a driver waiting for you. Flight tracking included.</p><Button to="transfers">Request a transfer</Button></div><div className="route-list">{[["Agadir airport → Agadir", "From 25 €"], ["Agadir airport → Taghazout", "From 35 €"], ["Agadir airport → Essaouira", "From 95 €"]].map(([route, price]) => <div key={route}><span>{route}</span><strong>{price}<small> / vehicle</small></strong></div>)}</div></section>
    <section className="section section--dark"><div className="shell"><SectionHeading eyebrow="Simple by design" title="Plan now. Pay later." /><div className="steps">{[["01", "Choose your day", "Browse experiences or tell us what you have in mind."], ["02", "Send your request", "Share your date, group size and pickup point."], ["03", "We confirm personally", "Our team replies by email or WhatsApp. No payment now."]].map(([n, title, body]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{body}</p></div>)}</div></div></section>
    <section className="section shell team-feature"><div className="portrait"><img src={images.boats} alt="" /><span className="image-note">Local team portrait placeholder</span></div><div><Eyebrow>Here when you need us</Eyebrow><h2>A local team, not a call centre.</h2><p>We know the roads, the weather and the people who make this place special. Tell us how you like to travel and we’ll help shape a day that fits.</p><ArrowLink to="about">Meet the team</ArrowLink></div></section>
    <section className="section section--tint"><div className="shell faq-preview"><SectionHeading eyebrow="Good to know" title="Questions, answered simply." /><div><FAQList limit={3} /><ArrowLink to="faq">See all questions</ArrowLink></div></div></section>
    <CTA />
  </main>;
}

function ListingPage({ activities = false }: { activities?: boolean }) {
  const category = activities ? "Activities" : "Excursions";
  const shown = activities ? [trips[3], trips[5], trips[0], trips[4], trips[2], trips[1]] : trips;
  return <main>
    <PageIntro eyebrow="Around Agadir" title={activities ? "Move, breathe, get outside." : "Days worth leaving the pool for."} body={activities ? "Surf, walk, ride and explore with friendly local hosts. All details are confirmed personally." : "From mountain pools to Atlantic medinas, discover easy day trips planned by a local team."} />
    <section className="section shell section--first"><div className="listing-tools"><p><strong>{shown.length} {category.toLowerCase()}</strong> <span>· Prices and facts are placeholders</span></p><div className="chips" aria-label="Filters"><button className="chip active">All</button><button className="chip">Half day</button><button className="chip">Full day</button><button className="chip">Nature</button></div></div><TripGrid items={shown} /></section>
    <AskBand />
  </main>;
}

function PageIntro({ eyebrow, title, body, compact = false }: { eyebrow: string; title: string; body: string; compact?: boolean }) {
  return <section className={`page-intro ${compact ? "page-intro--compact" : ""}`}><div className="shell"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></div></section>;
}

function AskBand() {
  return <section className="ask-band"><div className="shell"><div><Eyebrow>Need a steer?</Eyebrow><h2>Not sure what fits your day?</h2></div><a className="button button--secondary" href="https://wa.me/000000000">Ask on WhatsApp</a></div></section>;
}

function TransfersPage() {
  const routes = [
    { from: "Agadir Airport", to: "Agadir centre", value: "agadir", price: "25 €" },
    { from: "Agadir Airport", to: "Taghazout", value: "taghazout", price: "35 €" },
    { from: "Agadir Airport", to: "Tamraght", value: "tamraght", price: "32 €" },
    { from: "Agadir Airport", to: "Essaouira", value: "essaouira", price: "95 €" },
  ];
  const [destination, setDestination] = useState("agadir");
  const [passengers, setPassengers] = useState(2);
  const recommended = passengers <= 3 ? "Standard car" : passengers <= 7 ? "Family van" : "Group minibus";
  const [vehicle, setVehicle] = useState(recommended);
  useEffect(() => setVehicle(recommended), [recommended]);
  const selectedRoute = routes.find((route) => route.value === destination) || routes[0];
  const selectRoute = (value: string) => {
    setDestination(value);
    document.querySelector("#transfer-tool")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return <main>
    <section className="utility-transfer page-intro page-intro--compact">
      <div className="shell utility-transfer__grid"><div><Eyebrow>Private airport transfers</Eyebrow><h1>A calm start to your stay.</h1><p>Door-to-door pickup, clear indicative prices and a local driver who tracks your flight.</p></div>
      <div id="transfer-tool" className="transfer-tool"><div className="widget-grid"><Field label="From"><select defaultValue="airport"><option value="airport">Agadir airport</option></select></Field><Field label="To"><select value={destination} onChange={(e) => setDestination(e.target.value)}>{routes.map((route) => <option value={route.value} key={route.value}>{route.to}</option>)}</select></Field><Field label="Passengers"><select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>{[1, 2, 4, 6, 8, 12].map((count) => <option value={count} key={count}>{count} passenger{count > 1 ? "s" : ""}</option>)}</select></Field></div><div className="transfer-tool__result"><div><small>Indicative total</small><strong>{selectedRoute.price}</strong><span>per vehicle</span></div><Button to="booking">Request transfer</Button></div></div></div>
    </section>
    <section className="section section--tint"><div className="shell two-col"><SectionHeading eyebrow="Popular routes" title="Simple, clear pricing." /><div className="price-table">{routes.map((route) => <button className={destination === route.value ? "selected" : ""} key={route.value} onClick={() => selectRoute(route.value)}><span>{route.from} → {route.to}</span><strong>From {route.price}</strong><i aria-hidden="true">→</i></button>)}<small>All prices are placeholders and will be confirmed with your request.</small></div></div></section>
    <section className="section shell"><SectionHeading eyebrow="Your ride" title="Room for everyone." /><div className="vehicle-grid">{[["Standard car", "1–3 guests", "2 large bags"], ["Family van", "1–7 guests", "6 large bags"], ["Group minibus", "1–14 guests", "Luggage on request"]].map(([name, guests, bags]) => <button className={`vehicle-card ${vehicle === name ? "selected" : ""}`} onClick={() => setVehicle(name)} key={name}><div className="vehicle-placeholder" aria-label="Vehicle photo placeholder">Vehicle photo</div><div>{recommended === name && <span className="recommended">Recommended</span>}<h3>{name}</h3><p>{guests} · {bags}</p></div><span className="selection-mark" aria-hidden="true">✓</span></button>)}</div></section>
    <section className="section section--dark"><div className="shell"><SectionHeading eyebrow="At the airport" title="Easy to find. Even if you’re late." /><div className="steps"><div><span>01</span><h3>Share your flight</h3><p>We track delays and adjust the pickup time.</p></div><div><span>02</span><h3>Meet your driver</h3><p>Your driver waits at [meeting point placeholder] with a name sign.</p></div><div><span>03</span><h3>Ride door to door</h3><p>Go directly to your hotel, riad or apartment.</p></div></div></div></section>
    <CTA />
  </main>;
}

function ServicePage() {
  const accordions = [["Your day", "Morning pickup, a scenic drive into the foothills and unhurried time around the valley. Exact itinerary is a placeholder."], ["Included / Not included", "Hotel pickup, local guide and transport included. Meals and personal expenses not included."], ["Good to know", "Bring comfortable shoes, sun protection and swimwear. Route may change with weather."], ["Questions", "Tell us about mobility, dietary or timing needs when sending your request."]];
  return <main>
    <div className="shell breadcrumbs"><Link to="excursions">Excursions</Link><span>→</span><span>Paradise Valley</span></div>
    <section className="shell service-layout">
      <div className="service-main">
        <div className="gallery"><div className="gallery__main"><img src={images.cliffs} alt="Rocky valley landscape near Agadir" /><span className="image-note">Photo placeholder</span></div><img src={images.coast} alt="" /><img src={images.road} alt="" /></div>
        <div className="service-title"><span className="tag">Half day</span><h1>Paradise Valley & Atlas foothills</h1><p>A refreshing morning of mountain roads, palm-lined paths and time to swim in natural pools.</p></div>
        <div className="fact-tiles">{[["Duration", "5 hours"], ["Pickup", "Hotel included"], ["Group size", "Up to 12"], ["Languages", "Placeholder"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        <div className="service-accordions">{accordions.map(([title, body], i) => <details key={title} open={i === 0}><summary>{title}<span className="accordion-icon" aria-hidden="true" /></summary><p>{body}</p></details>)}</div>
      </div>
      <aside className="booking-card"><Eyebrow>From</Eyebrow><div className="booking-card__price">35 € <span>/ person</span></div><Field label="Preferred date"><input type="date" /></Field><Field label="Guests"><select><option>2 adults</option><option>3 adults</option></select></Field><Button to="booking">Request availability</Button><a href="https://wa.me/000000000">Ask a quick question on WhatsApp</a><div className="trust-lines"><span>No payment now</span><span>Free cancellation up to 24h</span></div></aside>
    </section>
    <section className="section section--tint"><div className="shell"><SectionHeading eyebrow="You might also like" title="Keep exploring" /><TripGrid items={trips.slice(1, 4)} /></div></section>
  </main>;
}

function Field({ label, children, error }: { label: string; children: ReactNode; error?: string }) {
  return <label className={`field ${error ? "field--error" : ""}`}><span>{label}</span>{children}{error && <small className="error-message"><i aria-hidden="true">!</i>{error}</small>}</label>;
}

function Stepper({ label, value, onChange, minimum = 0 }: { label: string; value: number; onChange: (value: number) => void; minimum?: number }) {
  return <div className="field"><span>{label}</span><div className="stepper"><button type="button" aria-label={`Remove one ${label.toLowerCase()}`} onClick={() => onChange(Math.max(minimum, value - 1))}>−</button><strong aria-live="polite">{value}</strong><button type="button" aria-label={`Add one ${label.toLowerCase()}`} onClick={() => onChange(value + 1)}>+</button></div></div>;
}

function BookingPage({ onSuccess }: { onSuccess: () => void }) {
  const [errors, setErrors] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [option, setOption] = useState("shared");
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const form = document.querySelector("#booking-form");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const form = document.querySelector<HTMLFormElement>("#booking-form");
    if (form && !form.checkValidity()) {
      setErrors(true);
      requestAnimationFrame(() => {
        const firstError = form.querySelector<HTMLElement>(":invalid");
        firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError?.focus({ preventScroll: true });
      });
      return;
    }
    onSuccess();
  };
  return <main className="booking-page">
    <PageIntro compact eyebrow="Send a request" title="Let’s plan your trip." body="Nothing is charged now. We’ll check the details and confirm personally by email or WhatsApp." />
    <section className="section shell booking-layout">
      <form id="booking-form" onSubmit={submit} noValidate>
        <div className="selected-service"><img src={images.cliffs} alt="" /><div><span>Selected experience</span><h3>Paradise Valley & Atlas foothills</h3><p>5 hours · From 35 € / person</p></div><Link to="excursions">Change</Link></div>
        <FormSection number="01" title="Choose the details"><div className="form-grid"><Field label="Preferred date" error={errors && !date ? "Choose your preferred date." : undefined}><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-invalid={errors && !date} /></Field><Stepper label="Adults" value={adults} minimum={1} onChange={setAdults} /><Stepper label="Children" value={children} onChange={setChildren} /><div className="option-field"><span>Option</span><div className="radio-cards"><label className={option === "shared" ? "selected" : ""}><input type="radio" name="option" checked={option === "shared"} onChange={() => setOption("shared")} /><span><strong>Shared trip</strong><small>Join a small group</small></span><b>Included</b></label><label className={option === "private" ? "selected" : ""}><input type="radio" name="option" checked={option === "private"} onChange={() => setOption("private")} /><span><strong>Private trip</strong><small>Your own vehicle and guide</small></span><b>+ 45 €</b></label></div></div></div></FormSection>
        <FormSection number="02" title="Your contact details"><div className="form-grid"><Field label="Full name" error={errors && !name ? "Enter your name." : undefined}><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" aria-invalid={errors && !name} /></Field><Field label="Email" error={errors && !email.includes("@") ? "Enter a valid email." : undefined}><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" aria-invalid={errors && !email.includes("@")} /></Field><Field label="Phone / WhatsApp"><input type="tel" placeholder="+00 000 000 000" /></Field><Field label="Pickup address"><input placeholder="Hotel or address" /></Field><Field label="Notes"><textarea rows={4} placeholder="Anything we should know?" /></Field></div></FormSection>
        <div className="mobile-submit-trust"><TrustLines /></div>
      </form>
      <aside className="estimate-card"><Eyebrow>Estimated total</Eyebrow><div className="estimate-line"><span>{adults} adults × 35 €</span><strong>{adults * 35} €</strong></div>{option === "private" && <div className="estimate-line"><span>Private option</span><strong>45 €</strong></div>}<div className="estimate-total"><span>Total</span><strong>{adults * 35 + (option === "private" ? 45 : 0)} €</strong></div><p>Indicative MAD amount confirmed with your request.</p><TrustLines /><button form="booking-form" type="submit" className="button button--primary">Send request</button><small>Submitting does not create a confirmed booking.</small></aside>
    </section>
    <MobileBar booking total={adults * 35 + (option === "private" ? 45 : 0)} visible={formVisible} onSubmit={() => submit()} />
  </main>;
}

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <fieldset className="form-section"><legend><span>{number}</span>{title}</legend>{children}</fieldset>;
}

function TrustLines() {
  return <div className="trust-list"><span>No payment now</span><span>Pay on the day</span><span>Free cancellation</span><span>We confirm by email or WhatsApp</span></div>;
}

function SuccessPage() {
  return <main className="success-page"><section className="shell success-card"><div className="success-mark">✓</div><Eyebrow>Request received</Eyebrow><h1>Thanks, Sam.<br />We’ll take it from here.</h1><div className="request-summary"><span>Paradise Valley & Atlas foothills</span><strong>[Date placeholder] · 2 adults · 70 € estimate</strong><small>Reference AT-0000 [placeholder]</small></div><p>A copy has been sent to <strong>sam@example.com</strong>. No payment has been taken.</p><div className="next-steps"><h2>What happens next</h2><ol><li><span>1</span><div><strong>We check your date</strong><p>Our local team checks the trip and pickup details.</p></div></li><li><span>2</span><div><strong>We reply personally</strong><p>Expect an email or WhatsApp within [response time placeholder].</p></div></li><li><span>3</span><div><strong>You confirm</strong><p>No payment now. Pay on the day once everything is agreed.</p></div></li></ol></div><div className="button-row"><Button to="home">Back to home</Button><a className="button button--secondary" href="https://wa.me/000000000">Continue on WhatsApp</a></div></section></main>;
}

function PlacesPage() {
  const places = [["Taghazout", "Surf village · 25 min north", images.coast], ["Agadir", "Coastal city · Your base", images.city], ["Paradise Valley", "Atlas foothills · 50 min", images.cliffs], ["Essaouira", "Atlantic medina · 3 hours", images.boats]];
  return <main><PageIntro eyebrow="Places nearby" title="A coast with many rhythms." body="A compact guide to the towns, valleys and beaches around Agadir—and the trips that take you there." /><section className="section shell places-grid">{places.map(([name, context, image]) => <article key={name}><img src={image} alt="" /><span className="image-note">Photo placeholder</span><div><p>{context}</p><h2>{name}</h2><ArrowLink to="excursions">See related trips</ArrowLink></div></article>)}</section><AskBand /></main>;
}

function GuidesPage() {
  return <main><PageIntro eyebrow="Local notes" title="A little knowledge goes a long way." body="Practical, honest advice for making the most of your time around Agadir." /><section className="section shell"><article className="featured-guide"><img src={images.city} alt="" /><div><Eyebrow>Featured guide · 7 min read</Eyebrow><h2>Your first 48 hours in Agadir</h2><p>Where to wander, what to eat and when to leave the beach for the best view of the city.</p><ArrowLink to="service">Read the guide</ArrowLink></div></article><div className="guide-rows">{[["The best day trips from Agadir", "Planning", "6 min", images.road], ["A simple guide to Taghazout", "Places", "5 min", images.coast], ["What to pack for Paradise Valley", "Practical", "4 min", images.cliffs], ["How airport pickup works", "Transfers", "3 min", images.hero]].map(([title, category, time, image]) => <Link to="service" className="guide-row" key={title}><img src={image} alt="" /><div><span>{category} · {time} read</span><h3>{title}</h3></div><b>→</b></Link>)}</div></section><section className="section section--tint"><div className="shell"><SectionHeading eyebrow="Related trips" title="Put the reading into practice" /><TripGrid items={trips.slice(0, 3)} /></div></section></main>;
}

function AboutPage() {
  return <main><PageIntro eyebrow="About us" title="Made in Agadir, for curious travellers." body="We’re a small local agency helping visitors experience the region with more ease, context and connection." /><section className="section shell story"><div><Eyebrow>Our story</Eyebrow><h2>Travel should feel personal.</h2><p>Agadir Tourisme began with a simple idea: make it easier to find thoughtful local experiences without the pressure of instant payment or anonymous booking systems.</p><p>[Founding year and full company story placeholder.] Today, our team works with trusted drivers, guides and hosts across the Souss region.</p></div><img src={images.hero} alt="" /></section><section className="section section--tint"><div className="shell"><SectionHeading eyebrow="The people behind your day" title="Local, multilingual, reachable." /><div className="team-grid">{[["Name placeholder", "Trip planner", "Arabic · French · English"], ["Name placeholder", "Driver coordinator", "Arabic · French"], ["Name placeholder", "Local guide", "Arabic · English"]].map(([name, role, languages], i) => <article key={i}><div className="portrait-placeholder">Portrait</div><h3>{name}</h3><p>{role}</p><span>{languages}</span></article>)}</div></div></section><section className="section shell credentials"><SectionHeading eyebrow="Travel with confidence" title="The essentials, in order." /><div><article><span>01</span><h3>Tourism licence</h3><p>[Licence number and issuing body placeholder]</p></article><article><span>02</span><h3>Professional insurance</h3><p>[Insurer and coverage placeholder]</p></article><article><span>03</span><h3>Local support</h3><p>Reachable by WhatsApp seven days a week.</p></article></div></section><CTA /></main>;
}

function FAQPage() {
  return <main><PageIntro compact eyebrow="Frequently asked questions" title="Everything you need to know." body="Straightforward answers about requests, payment, pickup and changing your plans." /><section className="section shell faq-page-grid"><aside><p>Still have a question?</p><a className="button button--secondary" href="https://wa.me/000000000">Ask on WhatsApp</a></aside><FAQList /></section></main>;
}

function ContactPage() {
  return <main><PageIntro compact eyebrow="Contact" title="Talk to someone local." body="Tell us what you’re planning. We’ll reply personally by email or WhatsApp." /><section className="section shell contact-grid"><div className="contact-details"><div><span>WhatsApp</span><a href="https://wa.me/000000000">+212 [number placeholder]</a><p>Available 7 days · [hours placeholder]</p></div><div><span>Email</span><a href="mailto:hello@example.com">hello@example.com</a><p>Replies within [time placeholder]</p></div><div><span>Visit</span><strong>[Address placeholder], Agadir</strong><p>Visits by appointment</p></div></div><form className="contact-form" onSubmit={(e) => e.preventDefault()}><Field label="Name"><input placeholder="Your name" /></Field><Field label="Email"><input type="email" placeholder="you@example.com" /></Field><Field label="How can we help?"><select><option>Planning a trip</option><option>Airport transfer</option><option>Existing request</option></select></Field><Field label="Message"><textarea rows={6} placeholder="Tell us a little about your plans" /></Field><Button>Send message</Button></form></section></main>;
}

function SystemPage() {
  const [count, setCount] = useState(2);
  return <main><PageIntro eyebrow="Component sheet" title="Agadir Tourisme v2 system." body="Reusable foundations for a direct Next.js and Tailwind build." /><section className="section shell system-section"><SectionHeading eyebrow="Foundations" title="Colour, type & spacing tokens" /><div className="swatches">{[["cream", "Cream / Ink · 14.2:1"], ["sand", "Sand / Ink · 12.6:1"], ["terracotta", "Terracotta / White · 5.2:1"], ["ink", "Ink / Cream · 14.2:1"], ["olive", "Olive / White · 7.1:1"]].map(([color, ratio]) => <div key={color}><span className={`swatch swatch--${color}`} /><strong>{color}</strong><small>{ratio}</small></div>)}</div><div className="type-samples"><h1>Display · Playfair</h1><h2>Heading two · Playfair</h2><p>Body 16 · DM Sans. Clean, calm and comfortable to read.</p><Eyebrow>Label 12 · tracked</Eyebrow></div><div className="spacing-scale">{["4", "8", "12", "16", "24", "32", "48", "64", "96"].map((space) => <div key={space}><span className={`space-sample space-sample--${space}`} />{space}</div>)}</div></section><section className="section section--tint"><div className="shell system-section"><SectionHeading eyebrow="Actions & filters" title="Buttons and chips" /><div className="component-row"><Button>Primary action</Button><button className="button button--primary is-focus">Focused action</button><Button variant="secondary">Secondary action</Button><button className="button button--primary" disabled>Disabled</button><button className="chip active">Active chip</button><button className="chip">Filter chip</button></div><SectionHeading eyebrow="Inputs" title="Field states" /><div className="form-grid demo-fields"><Field label="Default field"><input placeholder="Placeholder" /></Field><Field label="Focus field"><input className="is-focus" defaultValue="Focused value" /></Field><Field label="Error field" error="Helpful error message"><input aria-invalid="true" defaultValue="Incorrect value" /></Field><Field label="Disabled field"><input disabled defaultValue="Unavailable" /></Field></div><div className="component-controls"><Stepper label="Guests" value={count} minimum={1} onChange={setCount} /><div className="option-field"><span>Radio card</span><div className="radio-cards"><label className="selected"><input type="radio" defaultChecked /><span><strong>Shared trip</strong><small>Join a small group</small></span><b>Included</b></label><label><input type="radio" /><span><strong>Private trip</strong><small>Your own guide</small></span><b>+ 45 €</b></label></div></div></div><div className="demo-card"><div className="trip-card is-focus-card"><TripCard trip={trips[0]} /></div><div><FAQList limit={2} /></div></div><SectionHeading eyebrow="Persistent actions" title="Sticky bars" /><div className="sticky-demos"><div className="mobile-bar mobile-bar--visible"><Button to="booking">Plan my trip</Button><a href="#whatsapp">WhatsApp</a></div><div className="mobile-bar mobile-bar--booking mobile-bar--visible"><div><small>Estimated total</small><strong>70 €</strong><em>No payment now · Free cancellation</em></div><button>Send request</button></div></div></div></section></main>;
}

function App() {
  const [page, setPage] = useState<Page>(getPage());
  const [showMobileBar, setShowMobileBar] = useState(false);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("[data-page]");
      if (!anchor) return;
      event.preventDefault();
      const next = anchor.dataset.page as Page;
      window.history.pushState({}, "", pagePaths[next]);
      setPage(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const pop = () => setPage(getPage());
    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", pop);
    return () => { document.removeEventListener("click", handleClick); window.removeEventListener("popstate", pop); };
  }, []);
  useEffect(() => {
    setShowMobileBar(false);
    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const lead = document.querySelector(".hero, .page-intro, .service-title");
      if (!lead) { setShowMobileBar(true); return; }
      observer = new IntersectionObserver(([entry]) => setShowMobileBar(!entry.isIntersecting), { threshold: 0.05 });
      observer.observe(lead);
    }, 0);
    return () => { window.clearTimeout(timer); observer?.disconnect(); };
  }, [page]);
  let content: ReactNode;
  if (page === "home") content = <HomePage />;
  else if (page === "excursions") content = <ListingPage />;
  else if (page === "activities") content = <ListingPage activities />;
  else if (page === "transfers") content = <TransfersPage />;
  else if (page === "service") content = <ServicePage />;
  else if (page === "booking") content = <BookingPage onSuccess={() => { window.history.pushState({}, "", pagePaths.success); setPage("success"); window.scrollTo(0, 0); }} />;
  else if (page === "success") content = <SuccessPage />;
  else if (page === "places") content = <PlacesPage />;
  else if (page === "guides") content = <GuidesPage />;
  else if (page === "about") content = <AboutPage />;
  else if (page === "faq") content = <FAQPage />;
  else if (page === "contact") content = <ContactPage />;
  else content = <SystemPage />;
  const standardMobileBar = page !== "booking";
  return <><Header page={page} />{content}<Footer />{standardMobileBar && <MobileBar visible={showMobileBar} />}</>;
}

export default App;
