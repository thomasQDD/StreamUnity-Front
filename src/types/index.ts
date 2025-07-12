export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Platform {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface PlatformConnections {
  twitch: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  kick: string;
}

export interface UserProfile {
  name: string;
  email: string;
  streamingName: string;
  platforms: PlatformConnections;
}

export interface ChatMessage {
  id: number;
  platform: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'normal' | 'flagged';
}

export interface ChatSettings {
  theme: 'dark' | 'light' | 'transparent';
  fontSize: string;
  showTimestamps: boolean;
  showPlatformIcons: boolean;
  moderationLevel: 'low' | 'medium' | 'high';
  customCSS: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width: string;
  height: string;
  opacity: string;
}

export type Page = 'home' | 'auth' | 'dashboard';

export interface NavigationProps {
  onNavigate: (page: Page) => void;
}