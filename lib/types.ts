export type LinkItem = {
  label: string;
  url: string;
};

export type ItineraryEntry = {
  startTime: string;
  endTime?: string;
  title: string;
  location?: string;
  note?: string;
  links?: LinkItem[];
};

export type ItineraryDay = {
  date: string; // YYYY-MM-DD
  entries: ItineraryEntry[];
  dayNote?: string;
};

export type Booking = {
  type: 'hotel' | 'transport' | 'activity';
  name: string;
  datetime?: string;
  reference?: string;
  proofUrl?: string;
  address?: string;
  note?: string;
};

export type EmergencyContact = {
  name: string;
  phone?: string;
  emergencyPhone?: string;
  insurance?: string;
  embassy?: string;
  passportCopyUrl?: string;
  memo?: string;
};
