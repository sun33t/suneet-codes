import { PropsWithChildren } from "react";

export const PageSection = ({ children }: PropsWithChildren) => {
  return <div className="mt-16 sm:mt-20">{children}</div>;
};
