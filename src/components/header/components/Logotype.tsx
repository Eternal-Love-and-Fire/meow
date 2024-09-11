import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Logotype = () => {
  const [logoError, setLogoError] = useState<boolean>(false);

  return (
    <Link
      href={`/`}
      className="overflow-hidden shadow-[0_0_6px_2px_rgba(0,0,0,0.75)] dark:shadow-[0_0_6px_2px_rgba(255,255,255,0.75)] rounded-full hover:opacity-75 hover:shadow-[0_0_6px_2px_rgba(255,255,255,0.75)] hover:dark:shadow-[0_0_6px_2px_rgba(255,255,255,0.25)] duration-500"
    >
      {logoError ? (
        <div className="w-12 h-12 flex items-center justify-center capitalize tracking-wider">
          FY
        </div>
      ) : (
        <Image
          src={`https://github.com/shadcn.png`}
          width={48}
          height={48}
          alt={`Logo`}
          className="object-cover"
          onError={() => setLogoError(true)}
          priority
        />
      )}
    </Link>
  );
};

export { Logotype };
