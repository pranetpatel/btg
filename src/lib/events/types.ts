export type VolunteerEvent = {
  id: string;
  createdAt: string;
  title: string;
  eventDate: string | null;
  description: string;
  attendeeCount: number;
};

export type CreateEventInput = {
  title: string;
  eventDate?: string | null;
  description?: string;
};
