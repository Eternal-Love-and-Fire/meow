"use client"
import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

interface AvatarImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | StaticImport;
  alt: string;
}

export const AvatarImage = ({
  className,
  src,
  alt,
  ...props
}: AvatarImageProps) => {
  const [isError, setIsError] = React.useState(false);

  if (isError) {
    return null; // Fallback to AvatarFallback
  }

  return (
    <Image
      className={cn("object-cover", className)}
      src={src}
      alt={alt}
      onError={() => setIsError(true)}
      {...props}
    />
  );
};

AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

AvatarFallback.displayName = "AvatarFallback";
