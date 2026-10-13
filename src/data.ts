export const contact = {
  phoneDisplay: "+353 87 062 2085",
  phoneHref: "tel:+353870622085",
  whatsappHref: "https://wa.me/353870622085",
  email: "jgpspropertyservices@gmail.com",
  instagram: "https://www.instagram.com/jgps_propertyservices/",
};

export type ProjectCategory = "Kitchen" | "Bathroom" | "Renovation";

export type ProjectImage = {
  src: string;
  alt: string;
  category: ProjectCategory;
  title: string;
  shape: "portrait" | "landscape";
};

export const projects: ProjectImage[] = [
  {
    src: "/images/projects/kitchen-signature.webp",
    alt: "Contemporary kitchen with a sculptural stone island and herringbone floor",
    category: "Kitchen",
    title: "A kitchen made for gathering",
    shape: "landscape",
  },
  {
    src: "/images/projects/bathroom-double-vanity.webp",
    alt: "Warm stone bathroom with a double vanity and walk-in shower",
    category: "Bathroom",
    title: "A calmer start to the day",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-attic.webp",
    alt: "Freestanding bath beneath a skylight in a bright attic bathroom",
    category: "Bathroom",
    title: "An attic bathroom retreat",
    shape: "portrait",
  },
  {
    src: "/images/projects/renovation-herringbone.webp",
    alt: "Refinished room with light herringbone flooring and a glass partition",
    category: "Renovation",
    title: "Light, space and new perspective",
    shape: "landscape",
  },
  {
    src: "/images/projects/kitchen-detail.webp",
    alt: "Marble-effect island and cabinetry in a modern fitted kitchen",
    category: "Kitchen",
    title: "Details that bring it together",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-shower.webp",
    alt: "Walk-in shower and illuminated double vanity in a contemporary bathroom",
    category: "Bathroom",
    title: "A considered bathroom refresh",
    shape: "landscape",
  },
  {
    src: "/images/projects/renovation-living.webp",
    alt: "Bright renovated living space with wide windows and timber flooring",
    category: "Renovation",
    title: "Room to make your own",
    shape: "landscape",
  },
  {
    src: "/images/projects/kitchen-island.webp",
    alt: "Bright kitchen with a central stone island and integrated appliances",
    category: "Kitchen",
    title: "A new heart of the home",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-walk-in.webp",
    alt: "Modern walk-in shower with large-format stone-look tiles",
    category: "Bathroom",
    title: "A clean, contemporary finish",
    shape: "portrait",
  },
  {
    src: "/images/projects/renovation-hallway.webp",
    alt: "Freshly renovated hallway with herringbone floor and black-framed doors",
    category: "Renovation",
    title: "A welcome home",
    shape: "landscape",
  },
];

export const services = [
  {
    number: "01",
    title: "Renovations",
    text: "Thoughtful home transformations, shaped around the way you want to live.",
    image: "/images/projects/renovation-living.webp",
  },
  {
    number: "02",
    title: "Kitchens",
    text: "Purposeful layouts and considered details for the room everyone comes back to.",
    image: "/images/projects/kitchen-signature.webp",
  },
  {
    number: "03",
    title: "Bathrooms",
    text: "Comfortable, beautifully finished spaces made for everyday rituals.",
    image: "/images/projects/bathroom-double-vanity.webp",
  },
];
