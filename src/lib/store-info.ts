export const STORE = {
  name: "AL MALEK SWEETS",
  nameAr: "حلويات الملك",
  address: "Amsterdamsestraatweg 101, 3513 AC Utrecht",
  phone: "+31 685 158 883",
  phoneRaw: "31685158883",
  email: "almaleksweets7@gmail.com",
  facebook: "https://www.facebook.com/search/top?q=almalek%20sweets",
  instagram: "https://www.instagram.com/almaleksweets/",
  maps: "https://www.google.com/maps?q=Amsterdamsestraatweg+101,+3513+AC+Utrecht&output=embed",
  mapsLink: "https://maps.google.com/?q=Amsterdamsestraatweg+101,+3513+AC+Utrecht",
  deliveryFee: 5.95,
  freeDeliveryFrom: 60,
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${STORE.phoneRaw}?text=${encodeURIComponent(message)}`;
