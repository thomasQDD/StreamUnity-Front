import { Badge } from '@/components/ui/badge';
import { getPlatformConfig } from '@/lib/utils';
import { PlatformIcon } from './PlatformIcon';

interface PlatformBadgeProps {
  platformId: string;
  className?: string;
}

export function PlatformBadge({ platformId, className = '' }: PlatformBadgeProps) {
  const platform = getPlatformConfig(platformId);
  
  if (!platform) {
    return null;
  }

  return (
    <Badge className={`${platform.color} text-white px-4 py-2 flex items-center gap-2 ${className}`}>
      <PlatformIcon platform={platformId} />
      {platform.name}
    </Badge>
  );
}