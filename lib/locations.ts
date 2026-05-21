// Single source of truth for the four Orient Gates locations.
// Imported by Footer, Contact page, layout meta, etc.

export interface Location {
  city: string;
  country: string;
  address: string;
  /** E.164 number, no spaces — used to build wa.me + tel: links. */
  whatsapp: string;
  /** Pretty form for display. */
  whatsappDisplay: string;
}

export const locations: Location[] = [
  {
    city: "New York",
    country: "United States",
    address: "Brooklyn, NY",
    whatsapp: "19298329645",
    whatsappDisplay: "+1 929 832 9645",
  },
  {
    city: "Beirut",
    country: "Lebanon",
    address: "Bechara El Khoury Square, Beirut",
    whatsapp: "96171773231",
    whatsappDisplay: "+961 71 773 231",
  },
  {
    city: "Rome",
    country: "Italy",
    address: "Piazza Santa Maria, Trastevere, Rome",
    whatsapp: "393277772780",
    whatsappDisplay: "+39 327 777 2780",
  },
  {
    city: "Damascus",
    country: "Syria",
    address: "Bab Sharqi, Old Damascus",
    whatsapp: "963933465733",
    whatsappDisplay: "+963 93 346 5733",
  },
];

export const contact = {
  email: "info@theorientgates.com",
  // TODO: confirm the real Instagram handle with the family
  instagramHandle: "theorientgates",
  instagramUrl: "https://instagram.com/theorientgates",
};

export const waLink = (number: string) => `https://wa.me/${number}`;
export const telLink = (number: string) => `tel:+${number}`;
