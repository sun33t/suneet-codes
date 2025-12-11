import { useMemo } from "react";
import { MobileAvatar, SuspendedAvatar } from "@/components/shared/avatar";
import { Toaster } from "@/components/ui/toaster";
import { ROUTES } from "@/lib/config/routes";
import { Footer } from "./footer";
import { Header } from "./header";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;

export const Layout = ({ children }: LayoutProps) => {
	const memoizedRouteNames = useMemo(() => Array.from(ROUTES.keys()), []);

	return (
		<div className="flex w-full" id="layout-container">
			<PageBackground />
			<div className="relative flex w-full flex-col">
				<Header
					headerAvatar={<SuspendedAvatar />}
					homepageAvatar={<SuspendedAvatar isHomePage={true} />}
					mobileAvatar={<MobileAvatar />}
					routeNames={memoizedRouteNames}
				/>
				<main className="flex-auto">{children}</main>
				<Footer routeNames={memoizedRouteNames} />
				<Toaster />
			</div>
		</div>
	);
};

const PageBackground = () => (
	<div
		className="fixed inset-0 flex justify-center sm:px-8"
		id="layout-bg-container"
	>
		<div className="flex w-full max-w-7xl lg:px-8">
			<div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
		</div>
	</div>
);
