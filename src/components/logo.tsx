import logoSrc from "../assets/edeen/logo-edeen.png";

type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="eDeen"
      className={className}
    />
  );
}
