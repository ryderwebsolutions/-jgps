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
    title: "Stone island kitchen",
    shape: "landscape",
  },
  {
    src: "/images/projects/bathroom-double-vanity.webp",
    alt: "Warm stone bathroom with a double vanity and walk-in shower",
    category: "Bathroom",
    title: "Warm stone double vanity",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-attic.webp",
    alt: "Freestanding bath beneath a skylight in a bright attic bathroom",
    category: "Bathroom",
    title: "Attic bathroom",
    shape: "portrait",
  },
  {
    src: "/images/projects/renovation-herringbone.webp",
    alt: "Refinished room with light herringbone flooring and a glass partition",
    category: "Renovation",
    title: "Herringbone flooring and glass",
    shape: "landscape",
  },
  {
    src: "/images/projects/kitchen-detail.webp",
    alt: "Marble-effect island and cabinetry in a modern fitted kitchen",
    category: "Kitchen",
    title: "Marble-effect kitchen island",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-shower.webp",
    alt: "Walk-in shower and illuminated double vanity in a contemporary bathroom",
    category: "Bathroom",
    title: "Illuminated walk-in shower",
    shape: "landscape",
  },
  {
    src: "/images/projects/renovation-living.webp",
    alt: "Bright renovated living space with wide windows and timber flooring",
    category: "Renovation",
    title: "Renovated living space",
    shape: "landscape",
  },
  {
    src: "/images/projects/kitchen-island.webp",
    alt: "Bright kitchen with a central stone island and integrated appliances",
    category: "Kitchen",
    title: "Kitchen with central island",
    shape: "portrait",
  },
  {
    src: "/images/projects/bathroom-walk-in.webp",
    alt: "Modern walk-in shower with large-format stone-look tiles",
    category: "Bathroom",
    title: "Walk-in shower in stone-look tile",
    shape: "portrait",
  },
  {
    src: "/images/projects/renovation-hallway.webp",
    alt: "Freshly renovated hallway with herringbone floor and black-framed doors",
    category: "Renovation",
    title: "Herringbone hallway",
    shape: "landscape",
  },
];

export const homeFeatures = [
  {
    id: "kitchen",
    section: "01 / KITCHEN",
    title: "Stone across the island.",
    summary:
      "The veined finish carries from the worktop down the island and onto the splashback. Pale, handleless cabinetry keeps it in view; herringbone flooring runs through the open room.",
    cover: {
      src: "/images/projects/hero-kitchen.webp",
      alt: "Kitchen with a veined stone island, pale cabinets and herringbone floor",
      caption: "The island, with the same veined stone on its sides and top.",
    },
    details: [
      {
        src: "/images/projects/kitchen-detail.webp",
        alt: "Close view of the veined stone kitchen island and matching splashback",
        caption: "Matching stone across the island and splashback.",
      },
      {
        src: "/images/projects/kitchen-island.webp",
        alt: "Pale kitchen with a stone-fronted island and timber herringbone flooring",
        caption: "The island sits between the kitchen and the glazed doors.",
      },
    ],
  },
  {
    id: "bathroom",
    section: "02 / BATHROOMS",
    title: "Different rooms. Different details.",
    summary:
      "In the photographs: a double vanity beneath an illuminated mirror, a walk-in shower with a recessed lit shelf, and a freestanding bath beneath a skylight.",
    cover: {
      src: "/images/projects/bathroom-double-vanity.webp",
      alt: "Double basins on a warm stone vanity beneath an illuminated mirror",
      caption: "Double basins and a wide illuminated mirror.",
    },
    details: [
      {
        src: "/images/projects/bathroom-walk-in.webp",
        alt: "Walk-in shower with large grey tiles, clear glass, towel rail and lit niche",
        caption: "Walk-in shower, clear glass and a recessed shelf.",
      },
      {
        src: "/images/projects/bathroom-attic.webp",
        alt: "Freestanding bath beneath a skylight in a tiled attic bathroom",
        caption: "Freestanding bath tucked beneath a skylight.",
      },
    ],
  },
  {
    id: "renovation",
    section: "03 / HOME RENOVATIONS",
    title: "The floor runs right through.",
    summary:
      "Herringbone flooring appears beyond the kitchen—in the hallway and adjoining room, alongside black-framed glazed doors.",
    cover: {
      src: "/images/projects/renovation-hallway.webp",
      alt: "Herringbone hallway with black-framed glazed doors",
      caption: "Herringbone flooring and black-framed doors in the hall.",
    },
    details: [
      {
        src: "/images/projects/renovation-living.webp",
        alt: "Bright renovated room with herringbone flooring and black-framed glazing",
        caption: "The same floor pattern continues into the room.",
      },
      {
        src: "/images/projects/renovation-herringbone.webp",
        alt: "Herringbone flooring through a renovated room with black-framed internal glazing",
        caption: "A view through the glazed partition.",
      },
    ],
  },
];

export const services = [
  {
    number: "01",
    title: "Renovations",
    text: "Home renovations shaped around your space and the changes you want to make.",
    image: "/images/projects/renovation-living.webp",
  },
  {
    number: "02",
    title: "Kitchens",
    text: "Kitchen renovations shaped around your home, your layout and the way you use it.",
    image: "/images/projects/kitchen-signature.webp",
  },
  {
    number: "03",
    title: "Bathrooms",
    text: "Bathroom renovations planned around your space, needs and choice of finishes.",
    image: "/images/projects/bathroom-double-vanity.webp",
  },
];
