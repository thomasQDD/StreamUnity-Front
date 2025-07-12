import { getPlatformConfig } from '@/lib/utils';

interface PlatformIconProps {
  platform: string;
  className?: string;
}

export function PlatformIcon({ platform, className = '' }: PlatformIconProps) {
  const platformConfig = getPlatformConfig(platform);
  
  if (!platformConfig) {
    return <div className={`w-4 h-4 bg-gray-600 rounded-sm ${className}`}></div>;
  }
  
  return (
    <div className={`w-4 h-4 ${platformConfig.color} rounded-sm flex items-center justify-center text-white text-xs ${className}`}>
      {platformConfig.icon}
    </div>
  );
}