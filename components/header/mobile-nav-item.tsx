import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const MobileNavItem = ({
  title,
  setIsMenuOpen,
}: {
  title: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const href = `/${title}`;
  const isActive = usePathname() === href;
  return (
    <DropdownMenuItem
      className={clsx(
        "text-sm font-medium",
        isActive && "text-accent-foreground"
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href={href} legacyBehavior passHref>
        {title}
      </Link>
    </DropdownMenuItem>
  );
};
