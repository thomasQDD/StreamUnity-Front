import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PLATFORMS = [
  { id: 'twitch', name: 'Twitch', color: 'bg-purple-600', icon: 'T' },
  { id: 'youtube', name: 'YouTube', color: 'bg-red-600', icon: 'Y' },
  { id: 'tiktok', name: 'TikTok', color: 'bg-black', icon: 'TT' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600', icon: 'F' },
  { id: 'kick', name: 'Kick', color: 'bg-green-600', icon: 'K' }
] as const;

export const getPlatformConfig = (platform: string) => {
  return PLATFORMS.find(p => p.id === platform);
};
