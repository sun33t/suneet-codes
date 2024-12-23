import { Container } from "@/components/container";

type MDXLayoutProps = React.PropsWithChildren;
export default function MDXLayout({ children }: MDXLayoutProps) {
  return <Container id="mdx-layout-container">{children}</Container>;
}
