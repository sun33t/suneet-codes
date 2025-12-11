"use client";

import { usePathname } from "next/navigation";
import {
	type ComponentPropsWithoutRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { AvatarContainer } from "@/components/shared/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { Route } from "@/types";
import { Container } from "../container";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation, MobileNavigationButton } from "./mobile-navigation";

function clamp(number: number, a: number, b: number) {
	const min = Math.min(a, b);
	const max = Math.max(a, b);
	return Math.min(Math.max(number, min), max);
}

type HeaderProps = ComponentPropsWithoutRef<"header"> & {
	routeNames: Route[];
	headerAvatar: React.ReactElement;
	homepageAvatar: React.ReactElement;
	mobileAvatar: React.ReactElement;
};
export const Header = ({
	headerAvatar,
	homepageAvatar,
	mobileAvatar,
	routeNames,
}: HeaderProps) => {
	const isHomePage = usePathname() === "/";
	const headerRef = useRef<React.ComponentRef<"div">>(null);
	const avatarRef = useRef<React.ComponentRef<"div">>(null);
	const isInitial = useRef(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const containerStyle = useMemo<React.CSSProperties>(
		() => ({
			position:
				"var(--header-inner-position)" as React.CSSProperties["position"],
		}),
		[],
	);

	const memoizedHeaderAvatar = useMemo(
		() => <AvatarContainer>{headerAvatar}</AvatarContainer>,
		[headerAvatar],
	);

	const handleMenuToggle = useCallback(
		() => setIsMobileMenuOpen((prevState) => !prevState),
		[],
	);

	useEffect(() => {
		const downDelay = avatarRef.current?.offsetTop ?? 0;
		const upDelay = 64;

		function setProperty(property: string, value: string) {
			document.documentElement.style.setProperty(property, value);
		}

		function removeProperty(property: string) {
			document.documentElement.style.removeProperty(property);
		}

		function updateHeaderStyles() {
			if (!headerRef.current) {
				return;
			}

			const { top, height } = headerRef.current.getBoundingClientRect();
			const scrollY = clamp(
				window.scrollY,
				0,
				document.body.scrollHeight - window.innerHeight,
			);

			if (isInitial.current) {
				setProperty("--header-position", "sticky");
			}

			setProperty("--content-offset", `${downDelay}px`);

			if (isInitial.current || scrollY < downDelay) {
				setProperty("--header-height", `${downDelay + height}px`);
				setProperty("--header-mb", `${-downDelay}px`);
			} else if (top + height < -upDelay) {
				const offset = Math.max(height, scrollY - upDelay);
				setProperty("--header-height", `${offset}px`);
				setProperty("--header-mb", `${height - offset}px`);
			} else if (top === 0) {
				setProperty("--header-height", `${scrollY + height}px`);
				setProperty("--header-mb", `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
				setProperty("--header-inner-position", "fixed");
				removeProperty("--header-top");
				removeProperty("--avatar-top");
			} else {
				removeProperty("--header-inner-position");
				setProperty("--header-top", "0px");
				setProperty("--avatar-top", "0px");
			}
		}

		function updateAvatarStyles() {
			if (!isHomePage) {
				return;
			}

			const fromScale = 1;
			const toScale = 36 / 64;
			const fromX = 0;
			const toX = 2 / 16;

			const scrollY = downDelay - window.scrollY;

			let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
			scale = clamp(scale, fromScale, toScale);

			let x = (scrollY * (fromX - toX)) / downDelay + toX;
			x = clamp(x, fromX, toX);

			setProperty(
				"--avatar-image-transform",
				`translate3d(${x}rem, 0, 0) scale(${scale})`,
			);

			const borderScale = 1 / (toScale / scale);
			const borderX = (-toX + x) * borderScale;
			const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

			setProperty("--avatar-border-transform", borderTransform);
			setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyles();
			isInitial.current = false;
		}

		updateStyles();
		window.addEventListener("scroll", updateStyles, { passive: true });
		window.addEventListener("resize", updateStyles);

		return () => {
			window.removeEventListener("scroll", updateStyles);
			window.removeEventListener("resize", updateStyles);
		};
	}, [isHomePage]);

	return (
		<>
			<header
				className="fade-in pointer-events-none relative z-50 flex flex-none animate-in flex-col duration-1000"
				id="header"
				style={{
					height: "var(--header-height)",
					marginBottom: "var(--header-mb)",
				}}
			>
				{isHomePage && (
					<>
						<div
							className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
							ref={avatarRef}
						/>
						<Container
							className="-mb-3 top-0 order-last pt-3"
							style={{
								position:
									"var(--header-position)" as React.CSSProperties["position"],
							}}
						>
							<div
								className="top-[var(--avatar-top,theme(spacing.3))] w-full"
								style={containerStyle}
							>
								<div className="relative">
									<AvatarContainer
										className="absolute top-3 left-0 origin-left transition-opacity"
										style={{
											opacity: "var(--avatar-border-opacity, 0)",
											transform: "var(--avatar-border-transform)",
										}}
									/>
									{homepageAvatar}
								</div>
							</div>
						</Container>
					</>
				)}
				<div
					className="top-0 z-10 h-16 pt-6"
					ref={headerRef}
					style={{
						position:
							"var(--header-position)" as React.CSSProperties["position"],
					}}
				>
					<Container
						className="top-[var(--header-top,theme(spacing.6))] w-full"
						style={containerStyle}
					>
						<div className="relative flex gap-4">
							<div className="flex flex-1">
								{!isHomePage && memoizedHeaderAvatar}
							</div>
							<div
								className="flex flex-1 justify-end md:justify-center"
								id="mobile-nav-container"
							>
								<DesktopNavigation
									className="pointer-events-auto hidden md:block"
									routeNames={routeNames}
								/>
							</div>
							<div className="pointer-events-auto flex justify-end gap-4 md:flex-1">
								<ThemeToggle />
								<MobileNavigationButton
									isMenuOpen={isMobileMenuOpen}
									onClick={handleMenuToggle}
								/>
							</div>
						</div>
					</Container>
				</div>
			</header>
			<MobileNavigation
				mobileAvatar={mobileAvatar}
				onOpenChange={setIsMobileMenuOpen}
				open={isMobileMenuOpen}
				routeNames={routeNames}
			/>
			{isHomePage && (
				<div
					className="flex-none"
					style={{ height: "var(--content-offset)" }}
				/>
			)}
		</>
	);
};
