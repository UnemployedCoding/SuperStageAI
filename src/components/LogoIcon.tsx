import Image from "next/image";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className = "", size = 28 }: LogoIconProps) {
  return (
    <Image
      src="/logo.svg"
      alt="StageLumen"
      width={size}
      height={size}
      className={className}
    />
  );
}
