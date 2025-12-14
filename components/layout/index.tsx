import { useMemo } from "react";
import { MobileAvatar, SuspendedAvatar } from "@/components/shared/avatar";
import { Toaster } from "@/components/ui/toaster";
import { ROUTES } from "@/lib/config/routes";
import { Footer } from "./footer";
import { Header } from "./header";

type ProfileImages = {
	headerProfileImage: string;
	headerProfileImageAlt: string;
	mobileProfileImage: string;
	mobileProfileImageAlt: string;
};

type LayoutProps = React.ComponentPropsWithoutRef<"div"> & {
	siteOwner: string;
	profileImages: ProfileImages;
};

export const Layout = ({ children, siteOwner, profileImages }: LayoutProps) => {
	const memoizedRouteNames = useMemo(() => Array.from(ROUTES.keys()), []);

	return (
		<div className="flex w-full" id="layout-container">
			<PageBackground />
			<div className="relative flex w-full flex-col">
				<Header
					headerAvatar={
						<SuspendedAvatar
							imageAlt={profileImages.headerProfileImageAlt}
							imageSrc={profileImages.headerProfileImage}
						/>
					}
					homepageAvatar={
						<SuspendedAvatar
							imageAlt={profileImages.headerProfileImageAlt}
							imageSrc={profileImages.headerProfileImage}
							isHomePage={true}
						/>
					}
					mobileAvatar={
						<MobileAvatar
							imageAlt={profileImages.mobileProfileImageAlt}
							imageSrc={profileImages.mobileProfileImage}
						/>
					}
					routeNames={memoizedRouteNames}
				/>
				<main className="flex-auto">{children}</main>
				<Footer routeNames={memoizedRouteNames} siteOwner={siteOwner} />
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
