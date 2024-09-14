// components/AvatarDemo.tsx

import React from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/AvatarAdvanced';

export default function AvatarDemo() {
  return (
    <div className="flex space-x-4">
      {/* Avatar with image */}
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          width={40}
          height={40}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Avatar with missing image (fallback displayed) */}
      <Avatar>
        <AvatarImage
          src="/non-existent-image.png"
          alt="Fallback Avatar"
          width={40}
          height={40}
        />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    </div>
  );
}
