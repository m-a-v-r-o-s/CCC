// Cycles Custom Cult badge — the actual logo file at /public/ccc.webp.

import Image from "next/image";

export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <Image
      src="/ccc.webp"
      width={size}
      height={size}
      alt="Cycles Custom Cult"
      priority
      style={{ width: size, height: "auto" }}
    />
  );
}
