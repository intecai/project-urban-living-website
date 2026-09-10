export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarData {
  logo: {
    src: string;
    alt: string;
  };
  navLinks: NavLink[];
  phoneNumber: string;
  phoneRaw: string;
  ctaButton: {
    label: string;
    href: string;
  };
}

export interface EnquiryBannerData {
  heading: string;
  description: string;
  phoneCallText: string;
  phoneNumber: string;
  phoneRaw: string;
  formLabels: {
    fullName: string;
    phoneNumber: string;
    preferredLocation: string;
    roomType: string;
    submitButton: string;
  };
  locationOptions: string[];
  roomTypeOptions: string[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  locationsTitle: string;
  locations: FooterLink[];
  contactTitle: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  copyrightText: string;
}

export interface CommonData {
  navbar: NavbarData;
  enquiryBanner: EnquiryBannerData;
  footer: FooterData;
}
