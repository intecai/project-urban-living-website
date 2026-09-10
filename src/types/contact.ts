export interface ContactHeroData {
  heading: string;
  subtitle: string;
  bgImage: string;
}

export interface ContactCardInfo {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  iconName: string;
  actionHref?: string;
}

export interface TalkToOurTeamData {
  title: string;
  description: string;
  formFields: {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    preferredLocationLabel: string;
    roomTypeLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButtonText: string;
  };
  contactCards: ContactCardInfo[];
}

export interface ContactPageData {
  hero: ContactHeroData;
  talkToOurTeam: TalkToOurTeamData;
}
