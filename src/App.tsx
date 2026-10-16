import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { contact, projects, services, type ProjectCategory, type ProjectImage } from "./data";

const pageLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "JGPS Property Services | Renovation Specialists in Dublin",
    description: "Renovation specialists for kitchens, bathrooms and homes across Dublin and Leinster. Explore selected JGPS projects and the full photo archive.",
  },
  "/services": {
    title: "Renovations, Kitchens & Bathrooms | JGPS Property Services",
    description: "Discover JGPS Property Services' renovation, kitchen and bathroom work across Dublin and Leinster.",
  },
  "/projects": {
    title: "Project Portfolio | JGPS Property Services",
    description: "Explore selected kitchen, bathroom and home renovation projects, plus the full 116-photo archive from JGPS Property Services.",
  },
  "/about": {
    title: "About JGPS Property Services | Dublin Renovation Specialists",
    description: "Meet JGPS Property Services, renovation specialists serving homeowners across Dublin and Leinster.",
  },
  "/contact": {
    title: "Contact JGPS Property Services | Start a Project",
    description: "Talk to JGPS Property Services about a renovation, kitchen or bathroom project in Dublin and Leinster.",
  },
};

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    const metadata = pageMetadata[location.pathname] ?? {
      title: "Page not found | JGPS Property Services",
      description: "The page you are looking for could not be found.",
    };
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
  }, [location.hash, location.pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-header${location.pathname === "/" ? " site-header-home" : ""}`}>
      <Link className="brand" to="/" aria-label="JGPS Property Services home">
        <img src="/logo.png" alt="JGPS Property Services" />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav
        className={`primary-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        <div className="nav-links">
          {pageLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <Link className="nav-cta" to="/contact">
          Start a project <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/" aria-label="JGPS Property Services home">
            <img src="/logo.png" alt="JGPS Property Services" />
          </Link>
          <p>Renovation specialists.<br />Dublin &amp; Leinster.</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          {pageLinks.slice(1).map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </div>
        <div className="footer-links">
          <span className="eyebrow">Say hello</span>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.instagram} target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JGPS Property Services</span>
        <span>Renovations · Kitchens · Bathrooms</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element?.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function PageIntro({
  label,
  title,
  text,
  image,
}: {
  label: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="editorial-page-intro">
      <div className="editorial-page-intro-copy">
        <span className="eyebrow eyebrow-orange">{label}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <Link className="editorial-text-link" to="/contact">Talk to JGPS <ArrowUpRight size={16} /></Link>
      </div>
      <div className="editorial-page-intro-image">
        <img src={image} alt="" />
        <span>JGPS PROPERTY SERVICES&nbsp; / &nbsp;DUBLIN + LEINSTER</span>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectImage;
  index: number;
  onOpen: (project: ProjectImage, opener: HTMLButtonElement) => void;
}) {
  return (
    <Reveal className={`project-card project-${project.shape}`} delay={(index % 3) * 85}>
      <button
        className="project-card-button"
        type="button"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`View ${project.title}`}
      >
        <img src={project.src} alt={project.alt} loading="lazy" />
        <span className="project-card-shade" />
        <span className="project-card-category">{project.category}</span>
        <span className="project-card-title">{project.title}</span>
        <span className="project-card-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </button>
    </Reveal>
  );
}

function ProjectGrid({ items }: { items: ProjectImage[] }) {
  const [activeProject, setActiveProject] = useState<ProjectImage | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowRight") stepProject(1);
      if (event.key === "ArrowLeft") stepProject(-1);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, items]);

  function closeProject() {
    setActiveProject(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }

  function stepProject(step: number) {
    if (!activeProject) return;
    const currentIndex = items.findIndex((item) => item.src === activeProject.src);
    setActiveProject(items[(currentIndex + step + items.length) % items.length]);
  }

  return (
    <>
      <div className="project-grid">
        {items.map((project, index) => (
          <ProjectCard
            key={project.src}
            project={project}
            index={index}
            onOpen={(selected, opener) => {
              openerRef.current = opener;
              setActiveProject(selected);
            }}
          />
        ))}
      </div>
      {activeProject && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          tabIndex={-1}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeProject();
          }}
        >
          <button className="lightbox-close" type="button" onClick={closeProject} aria-label="Close image">
            <X size={22} />
          </button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => stepProject(-1)} aria-label="Previous project">
            <ArrowLeft size={21} />
          </button>
          <figure className="lightbox-figure">
            <img src={activeProject.src} alt={activeProject.alt} />
            <figcaption>
              <span className="eyebrow eyebrow-orange">{activeProject.category}</span>
              <strong>{activeProject.title}</strong>
            </figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => stepProject(1)} aria-label="Next project">
            <ArrowRight size={21} />
          </button>
        </div>
      )}
    </>
  );
}

type ArchiveCategory = "Bathroom" | "Interior";
type ArchiveFilter = "All" | ArchiveCategory;
type PhotoCategory = ArchiveCategory | "Kitchen" | "Renovation";

type ArchivePhoto = {
  src: string;
  category: PhotoCategory;
  number: number;
  alt: string;
};

const archivePhotosByCategory: Record<ArchiveCategory, ArchivePhoto[]> = {
  Bathroom: Array.from({ length: 67 }, (_, index) => {
    const number = index + 1;
    return {
      src: `/images/archive/bathroom-${String(number).padStart(3, "0")}.webp`,
      category: "Bathroom",
      number,
      alt: `Bathroom photograph ${number} from the JGPS photo archive`,
    };
  }),
  Interior: Array.from({ length: 49 }, (_, index) => {
    const number = index + 1;
    return {
      src: `/images/archive/interior-${String(number).padStart(3, "0")}.webp`,
      category: "Interior",
      number,
      alt: `Interior photograph ${number} from the JGPS photo archive`,
    };
  }),
};

const allArchivePhotos = [
  ...archivePhotosByCategory.Bathroom,
  ...archivePhotosByCategory.Interior,
];

const homeArchivePhotos = [
  ...[1, 7, 25, 41, 52, 67].map((number) => archivePhotosByCategory.Bathroom[number - 1]),
  ...[1, 9, 17, 25, 37, 49].map((number) => archivePhotosByCategory.Interior[number - 1]),
];

const featuredPhotos: ArchivePhoto[] = [
  {
    src: "/images/projects/kitchen-signature.webp",
    category: "Kitchen",
    number: 1,
    alt: "Contemporary kitchen with a sculptural stone island and herringbone floor",
  },
  {
    src: "/images/archive/bathroom-007.webp",
    category: "Bathroom",
    number: 7,
    alt: "Bathroom with a lit round mirror, oak vanity and wall-mounted toilet",
  },
  {
    src: "/images/archive/bathroom-025.webp",
    category: "Bathroom",
    number: 25,
    alt: "Bathroom with dark herringbone tile, a clear-glass shower and wall-mounted toilet",
  },
  {
    src: "/images/projects/renovation-living.webp",
    category: "Renovation",
    number: 1,
    alt: "Bright renovated living space with wide windows and timber flooring",
  },
  {
    src: "/images/archive/bathroom-041.webp",
    category: "Bathroom",
    number: 41,
    alt: "Bathroom with an illuminated round mirror, walk-in shower and white tiled walls",
  },
];

function HomeArchiveGallery({ mode }: { mode: "home" | "archive" }) {
  const [filter, setFilter] = useState<ArchiveFilter>("All");
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [activePhoto, setActivePhoto] = useState<ArchivePhoto | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const activeFeaturedPhoto = featuredPhotos[activeFeaturedIndex] ?? featuredPhotos[0];
  const filteredPhotos = useMemo(
    () => filter === "All" ? allArchivePhotos : archivePhotosByCategory[filter],
    [filter],
  );
  const displayedPhotos = mode === "archive"
    ? filteredPhotos
    : filter === "All"
      ? homeArchivePhotos
      : filteredPhotos.slice(0, 12);
  const photoSequence = useMemo(() => Array.from(
    new Map([...featuredPhotos, ...filteredPhotos].map((photo) => [photo.src, photo])).values(),
  ), [filteredPhotos]);

  useEffect(() => {
    if (!activePhoto) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const closePhoto = () => {
      setActivePhoto(null);
      window.requestAnimationFrame(() => openerRef.current?.focus());
    };
    const stepPhoto = (step: number) => {
      const currentIndex = photoSequence.findIndex((photo) => photo.src === activePhoto.src);
      const nextPhoto = photoSequence[(currentIndex + step + photoSequence.length) % photoSequence.length];
      setActivePhoto(nextPhoto);
      const featuredIndex = featuredPhotos.findIndex((photo) => photo.src === nextPhoto.src);
      if (featuredIndex !== -1) setActiveFeaturedIndex(featuredIndex);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowRight") stepPhoto(1);
      if (event.key === "ArrowLeft") stepPhoto(-1);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto, photoSequence]);

  function closePhoto() {
    setActivePhoto(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }

  function stepPhoto(step: number) {
    if (!activePhoto) return;
    const currentIndex = photoSequence.findIndex((photo) => photo.src === activePhoto.src);
    const nextPhoto = photoSequence[(currentIndex + step + photoSequence.length) % photoSequence.length];
    setActivePhoto(nextPhoto);
    const featuredIndex = featuredPhotos.findIndex((photo) => photo.src === nextPhoto.src);
    if (featuredIndex !== -1) setActiveFeaturedIndex(featuredIndex);
  }

  function setArchiveFilter(nextFilter: ArchiveFilter) {
    setFilter(nextFilter);
  }

  function openPhoto(photo: ArchivePhoto, opener: HTMLButtonElement) {
    openerRef.current = opener;
    setActivePhoto(photo);
  }

  return (
    <>
      {mode === "home" && (
      <section className="home-mosaic" aria-label="Selected JGPS project photographs">
        <div className="home-hero-stage">
          <button
            className="home-hero-image"
            type="button"
            aria-label={`Enlarge ${activeFeaturedPhoto.category.toLowerCase()} photograph ${String(activeFeaturedPhoto.number).padStart(2, "0")}`}
            onClick={(event) => openPhoto(activeFeaturedPhoto, event.currentTarget)}
          >
            <img
              key={activeFeaturedPhoto.src}
              src={activeFeaturedPhoto.src}
              alt={activeFeaturedPhoto.alt}
              fetchPriority="high"
              decoding="async"
            />
          </button>
          <div className="home-hero-shade" aria-hidden="true" />
          <div className="home-hero-location">
            <span>JGPS PROPERTY SERVICES</span>
            <span>DUBLIN&nbsp; / &nbsp;LEINSTER</span>
          </div>
          <div className="home-mosaic-copy">
            <span>RENOVATIONS&nbsp; / &nbsp;KITCHENS&nbsp; / &nbsp;BATHROOMS</span>
            <h1>Homes,<br /><em>reworked.</em></h1>
            <p>Renovation specialists working across Dublin and Leinster.</p>
            <div className="home-mosaic-actions">
              <Link className="home-primary-cta" to="/contact">
                Discuss a project <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a className="home-secondary-cta" href={contact.phoneHref}>
                <Phone size={15} aria-hidden="true" /> {contact.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="home-hero-explorer">
            <div className="home-hero-thumbnails" role="group" aria-label="Choose a featured photograph">
              {featuredPhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  className={`home-hero-thumbnail${activeFeaturedIndex === index ? " is-active" : ""}`}
                  type="button"
                  aria-label={`Show ${photo.category.toLowerCase()} photograph ${String(photo.number).padStart(2, "0")}`}
                  aria-pressed={activeFeaturedIndex === index}
                  onClick={() => setActiveFeaturedIndex(index)}
                >
                  <img src={photo.src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
              <div className="home-hero-navigation">
                <span aria-live="polite">
                  <strong>{String(activeFeaturedIndex + 1).padStart(2, "0")}</strong>
                  <i aria-hidden="true" />
                  {String(featuredPhotos.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  aria-label="Previous featured photograph"
                  onClick={() => setActiveFeaturedIndex((index) => (index - 1 + featuredPhotos.length) % featuredPhotos.length)}
                >
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next featured photograph"
                  onClick={() => setActiveFeaturedIndex((index) => (index + 1) % featuredPhotos.length)}
                >
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
            <a className="home-hero-archive-link" href="#photo-archive">
              <Camera size={15} aria-hidden="true" />
              <span>Explore selected photographs</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      )}

      {mode === "home" && (
        <>
          <section className="home-index-intro" aria-label="About JGPS">
            <span className="home-index-intro-label">BASED IN DUBLIN<br />WORKING ACROSS LEINSTER</span>
            <p>Renovations, kitchens<br />&amp; bathrooms.</p>
            <Link to="/services">What JGPS does <ArrowUpRight size={16} /></Link>
          </section>

          <section className="home-services" aria-labelledby="home-services-title">
            <div className="home-services-heading">
              <span className="home-index-eyebrow">WHAT JGPS DOES</span>
              <h2 id="home-services-title">Thoughtful work for the spaces you live in.</h2>
              <p>Renovations, kitchens and bathrooms across Dublin and Leinster.</p>
            </div>
            <div className="home-services-grid">
              {services.map((service) => (
                <Link className="home-service-card" key={service.number} to="/services">
                  <div className="home-service-card-image">
                    <img src={service.image} alt="" loading="lazy" />
                    <span>{service.number} / 03</span>
                  </div>
                  <div className="home-service-card-copy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className="home-service-card-link">Explore service <ArrowUpRight size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <section
        className={`home-archive${mode === "archive" ? " projects-photo-archive" : ""}`}
        id={mode === "home" ? "photo-archive" : "projects-photo-archive"}
        aria-labelledby="home-archive-title"
      >
      <div className="home-archive-heading">
        <div>
          <span className="home-index-eyebrow">
            {mode === "archive" ? "THE FULL PHOTO ARCHIVE" : "SELECTED PHOTOGRAPHS / 12 OF 116"}
          </span>
          <h2 id="home-archive-title">No two rooms<br /><em>the same.</em></h2>
        </div>
        <p>{mode === "archive"
          ? "Browse the full JGPS archive of bathrooms and interiors. Select any photograph to view it larger."
          : "A selection of JGPS bathrooms and interiors. Explore the full photo archive on the projects page."}</p>
      </div>

      <div className="home-archive-toolbar">
        <div className="home-archive-filters" role="group" aria-label="Filter photo archive">
          {(["All", "Bathroom", "Interior"] as const).map((option) => (
            <button
              key={option}
              className={`home-archive-filter${filter === option ? " is-active" : ""}`}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setArchiveFilter(option)}
            >
              {option === "All" ? "All photographs" : `${option}s`}
              {option === "All" && <span>116</span>}
              {option === "Bathroom" && <span>67</span>}
              {option === "Interior" && <span>49</span>}
            </button>
          ))}
        </div>
        <span className="home-archive-count" aria-live="polite">
          {mode === "archive"
            ? `Showing ${filteredPhotos.length} of 116 photographs`
            : `Showing ${displayedPhotos.length} selected of ${filteredPhotos.length} photographs`}
        </span>
      </div>

      <div className="home-archive-grid">
        {displayedPhotos.map((photo) => (
          <button
            className="home-archive-photo"
            key={photo.src}
            type="button"
            aria-label={`Enlarge ${photo.category.toLowerCase()} archive photograph ${String(photo.number).padStart(2, "0")}`}
            onClick={(event) => openPhoto(photo, event.currentTarget)}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
            <span className="home-archive-photo-label">
              <span>{photo.category} / {String(photo.number).padStart(2, "0")}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      {mode === "home" && (
        <Link className="home-archive-more" to="/projects#projects-photo-archive">
          Browse all 116 photographs <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      )}

      {activePhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePhoto.category} photograph ${activePhoto.number} from JGPS project photography`}
          tabIndex={-1}
          ref={dialogRef}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePhoto();
          }}
        >
          <button className="lightbox-close" type="button" onClick={closePhoto} aria-label="Close image">
            <X size={22} />
          </button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => stepPhoto(-1)} aria-label="Previous photograph">
            <ArrowLeft size={21} />
          </button>
          <figure className="lightbox-figure">
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <figcaption>
              <span className="eyebrow eyebrow-orange">{activePhoto.category} / {String(activePhoto.number).padStart(2, "0")}</span>
              <strong>JGPS project photography</strong>
            </figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={() => stepPhoto(1)} aria-label="Next photograph">
            <ArrowRight size={21} />
          </button>
        </div>
      )}
      </section>
    </>
  );
}

function HomePage() {
  return (
    <div className="home-index">
      <HomeArchiveGallery mode="home" />
      <JournalContact />
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <PageIntro
        label="What JGPS does"
        title="Renovations. Kitchens. Bathrooms."
        text="JGPS Property Services works across Dublin and Leinster."
        image="/images/projects/bathroom-double-vanity.webp"
      />
      <section className="service-detail-list section-pad">
        <SectionHeading eyebrow="JGPS / Services" title="The work, in three parts." />
        {services.map((service, index) => (
          <Reveal key={service.number} className={`service-detail${index % 2 ? " service-detail-reverse" : ""}`}>
            <div className="service-detail-photo">
              <img src={service.image} alt="" loading="lazy" />
              <span className="service-detail-count">{service.number} / 03</span>
            </div>
            <div className="service-detail-copy">
              <span className="eyebrow eyebrow-orange">JGPS / {service.number}</span>
              <h2>{service.title}<span>.</span></h2>
              <p>{service.text}</p>
              <p className="service-detail-secondary">
                {service.title === "Kitchens"
                  ? "Show us your kitchen and tell us what you would like to change."
                  : service.title === "Bathrooms"
                    ? "Tell us what is working, what is not, and what you would like instead."
                    : "Tell us which rooms you have in mind and what you would like to change."}
              </p>
              <Link className="text-link" to="/contact">Talk about your {service.title.toLowerCase()} <ArrowUpRight size={16} /></Link>
            </div>
          </Reveal>
        ))}
      </section>
      <ContactBand />
    </>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const filters: Array<"All" | ProjectCategory> = ["All", "Kitchen", "Bathroom", "Renovation"];
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <PageIntro
        label="JGPS / Project photographs"
        title="Renovations. Kitchens. Bathrooms."
        text="A selection of photographs from JGPS Property Services projects."
        image="/images/projects/kitchen-signature.webp"
      />
      <section className="portfolio-section section-pad">
        <div className="portfolio-heading">
          <div>
            <span className="eyebrow">JGPS / Portfolio</span>
            <h2>The work.</h2>
          </div>
          <p>Filter by project type. Select a photograph to view it larger.</p>
        </div>
        <div className="portfolio-filters" role="group" aria-label="Filter projects">
          {filters.map((category) => (
            <button
              className={`filter-button${filter === category ? " is-active" : ""}`}
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === "All" ? "All work" : `${category}s`}
              <span>{category === "All" ? projects.length : projects.filter((project) => project.category === category).length}</span>
            </button>
          ))}
        </div>
        <ProjectGrid items={filteredProjects} />
        <p className="portfolio-note">JGPS Property Services / Dublin + Leinster</p>
      </section>
      <HomeArchiveGallery mode="archive" />
      <ContactBand />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageIntro
        label="JGPS / About"
        title="JGPS Property Services."
        text="Renovation specialists. Based in Dublin and working across Leinster."
        image="/images/projects/renovation-herringbone.webp"
      />
      <section className="about-story section-pad">
        <div className="about-story-label"><span className="eyebrow">Renovation specialists</span><span className="about-asterisk">J</span></div>
        <div className="about-story-copy">
          <h2>Kitchens.<br />Bathrooms.<br /><em>Home renovations.</em></h2>
          <p>JGPS Property Services specialises in renovation work, with a focus on kitchens and bathrooms.</p>
          <p>Based in Dublin. Working across Leinster.</p>
          <Link className="text-link" to="/contact">Contact JGPS <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <section className="about-image-break">
        <img src="/images/projects/kitchen-island.webp" alt="Bright, contemporary kitchen with a central island" loading="lazy" />
        <div className="about-image-caption"><span>JGPS PROPERTY SERVICES</span><span>DUBLIN · LEINSTER</span></div>
      </section>
      <JournalContact />
    </>
  );
}

function ContactPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Project enquiry from ${form.get("name")}`;
    const body = [
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Phone: ${form.get("phone") || "Not provided"}`,
      `Project type: ${form.get("project")}`,
      "",
      String(form.get("message")),
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <section className="contact-page section-pad">
        <div className="contact-intro">
          <span className="eyebrow eyebrow-orange">Start a conversation</span>
          <h1>Tell us<br />about the <em>work.</em></h1>
          <p>Kitchens, bathrooms or a home renovation. Send JGPS a note or get in touch directly.</p>
          <div className="contact-direct">
            <a className="contact-direct-item" href={contact.phoneHref}>
              <span className="contact-icon"><Phone size={17} /></span>
              <span><small>Call JGPS</small><strong>{contact.phoneDisplay}</strong></span>
              <ArrowUpRight size={16} />
            </a>
            <a className="contact-direct-item" href={contact.whatsappHref} target="_blank" rel="noreferrer">
              <span className="contact-icon contact-icon-whatsapp">W</span>
              <span><small>WhatsApp</small><strong>Message us directly</strong></span>
              <ArrowUpRight size={16} />
            </a>
            <a className="contact-direct-item" href={`mailto:${contact.email}`}>
              <span className="contact-icon"><span className="at-symbol">@</span></span>
              <span><small>Email</small><strong>{contact.email}</strong></span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="contact-form-wrap">
          <div className="contact-form-heading">
            <span className="eyebrow">Project enquiry</span>
            <h2>Project enquiry</h2>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span>Your name <b>*</b></span>
                <input name="name" type="text" autoComplete="name" placeholder="Name" required />
              </label>
              <label className="form-field">
                <span>Email address <b>*</b></span>
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
            </div>
            <div className="form-row">
              <label className="form-field">
                <span>Phone number</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
              </label>
              <label className="form-field">
                <span>What are you thinking about? <b>*</b></span>
                <span className="select-wrap">
                  <select name="project" defaultValue="" required>
                    <option value="" disabled>Choose a project type</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Home renovation</option>
                    <option>Something else</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </span>
              </label>
            </div>
            <label className="form-field">
              <span>A little about your project <b>*</b></span>
              <textarea name="message" rows={4} placeholder="What would you like to change?" required />
            </label>
            <button className="button button-orange form-submit" type="submit">Prepare your enquiry <ArrowUpRight size={17} /></button>
            <p className="form-note">This opens your email app with your enquiry ready to review and send. No details are submitted or stored on this website.</p>
          </form>
        </div>
      </section>
      <section className="contact-bottom">
        <span className="eyebrow">Find us on Instagram</span>
        <p>Follow along for more JGPS projects and ideas.</p>
        <a className="button button-dark" href={contact.instagram} target="_blank" rel="noreferrer">
          <Camera size={17} /> @jgps_propertyservices <ArrowUpRight size={15} />
        </a>
      </section>
    </>
  );
}

function ContactBand() {
  return (
    <JournalContact />
  );
}

function JournalContact() {
  return (
    <section className="journal-contact">
      <span>JGPS PROPERTY SERVICES&nbsp; / &nbsp;DUBLIN + LEINSTER</span>
      <h2>Planning a renovation?</h2>
      <Link className="journal-contact-cta" to="/contact">Start a project <ArrowUpRight size={18} /></Link>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found section-pad">
      <span className="eyebrow eyebrow-orange">404 / Page not found</span>
      <h1>This room<br /><em>doesn’t exist.</em></h1>
      <Link className="button button-orange" to="/">Back to home <ArrowRight size={16} /></Link>
    </section>
  );
}

export default App;
