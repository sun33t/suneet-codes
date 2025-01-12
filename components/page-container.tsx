import { PropsWithChildren } from "react";

import { Container } from "@/components/container";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container className="mt-16 duration-1000 animate-in fade-in sm:mt-32">
      {children}
    </Container>
  );
};
