import type { PropsWithChildren } from "react";

import { Container } from "./container";

export const PageContainer = ({ children }: PropsWithChildren) => {
	return (
		<Container className="fade-in mt-16 animate-in duration-1000 sm:mt-32">
			{children}
		</Container>
	);
};
