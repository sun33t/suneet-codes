import clsx from "clsx";
import Link from "next/link";
import { type ComponentPropsWithoutRef, Suspense } from "react";
import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton";
import { getCloudinaryBlurDataUrl } from "@/lib/utils/getCloudinaryBlurDataUrl";
import { withCloudinaryCloudName } from "@/lib/utils/withCloudinaryCloudName";
import { CloudinaryImage } from "./cloudinary-image";

export const AvatarContainer = ({
	className,
	...rest
}: React.ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className={clsx(
				className,
				"h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10",
			)}
			{...rest}
		/>
	);
};

type AvatarProps = Omit<
	ComponentPropsWithoutRef<typeof Link>,
	"href" | "style" | "className"
> & {
	isHomePage?: boolean;
	imageSrc: string;
	imageAlt: string;
};

export const Avatar = async ({
	isHomePage = false,
	imageSrc,
	imageAlt,
	...rest
}: AvatarProps) => {
	const { blurDataUrl } = await getCloudinaryBlurDataUrl({
		src: imageSrc,
		width: "64px",
	});

	return (
		<Link
			aria-label="Home"
			className={clsx(
				isHomePage && "block h-16 w-16 origin-left",
				"pointer-events-auto",
			)}
			href="/"
			style={
				isHomePage ? { transform: "var(--avatar-image-transform)" } : undefined
			}
			{...rest}
		>
			{blurDataUrl ? (
				<CloudinaryImage
					alt={imageAlt}
					blurDataURL={blurDataUrl}
					className={clsx(
						"fade-in animate-in rounded-full bg-zinc-100 object-cover duration-1000 dark:bg-zinc-800",
						isHomePage ? "h-16 w-16" : "h-9 w-9",
					)}
					height={64}
					placeholder="blur"
					sizes={isHomePage ? "4rem" : "2.25rem"}
					src={withCloudinaryCloudName(imageSrc)}
					width={64}
				/>
			) : (
				<AvatarSkeleton hasPulse={false} isHomePage={isHomePage} />
			)}
		</Link>
	);
};
type MobileAvatarProps = {
	imageSrc: string;
	imageAlt: string;
};

export const MobileAvatar = async ({
	imageSrc,
	imageAlt,
}: MobileAvatarProps) => {
	const { blurDataUrl } = await getCloudinaryBlurDataUrl({
		src: imageSrc,
		width: "64px",
	});

	return blurDataUrl ? (
		<CloudinaryImage
			alt={imageAlt}
			blurDataURL={blurDataUrl}
			className={
				"fade-in h-9 w-9 animate-in rounded-full bg-zinc-100 object-cover duration-1000 dark:bg-zinc-800"
			}
			height={64}
			placeholder="blur"
			sizes="2.25rem"
			src={withCloudinaryCloudName(imageSrc)}
			width={64}
		/>
	) : (
		<AvatarSkeleton hasPulse={false} isHomePage={false} />
	);
};

const AvatarSkeleton = ({
	isHomePage,
	...rest
}: SkeletonProps & { isHomePage?: boolean }) => {
	const classes = clsx("rounded-full", isHomePage ? "h-16 w-16" : "h-9 w-9");

	return <Skeleton className={classes} {...rest} />;
};

type SuspendedAvatarProps = {
	isHomePage?: boolean;
	imageSrc: string;
	imageAlt: string;
};

export const SuspendedAvatar = ({
	isHomePage,
	imageSrc,
	imageAlt,
}: SuspendedAvatarProps) => {
	return (
		<Suspense fallback={<AvatarSkeleton isHomePage={isHomePage} />}>
			<Avatar imageAlt={imageAlt} imageSrc={imageSrc} isHomePage={isHomePage} />
		</Suspense>
	);
};
