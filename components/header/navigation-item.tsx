import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 capitalize transition",
          isActive ? "text-accent-foreground" : "hover:text-accent-foreground"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-accent-foreground/0 via-accent-foreground/40 to-accent-foreground/0" />
        )}
      </Link>
    </li>
  );
};
