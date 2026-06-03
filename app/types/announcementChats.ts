export type ChatStatus = 'pending' | 'accepted' | 'rejected' | 'archived';
export type ChatTab = 'requests' | 'responses' | 'archive';

export interface ChatUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface ChatAnnouncement {
  id: string;
  title: string;
  city: string | null;
  references_urls: string | null;
}

export interface AnnouncementChat {
  id: string;
  announcement_id: string;
  applicant_id: string;
  owner_id: string;
  status: ChatStatus;
  initial_message: string;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
  last_message_sender_id: string | null;
  owner_last_read_at: string | null;
  applicant_last_read_at: string | null;
  announcement: ChatAnnouncement | null;
  applicant: ChatUser | null;
  owner: ChatUser | null;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  sender: ChatUser | null;
}
