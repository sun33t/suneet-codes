import { ModeToggle } from "./mode-toggle";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div id="layout-container" className="flex w-full">
      <div
        id="layout-bg-container"
        className="fixed inset-0 flex justify-center sm:px-8"
      >
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <header
          id="header"
          className="mx-auto flex max-w-7xl flex-none items-center justify-between lg:w-5/6 lg:px-8"
        >
          <p>Logo</p>
          <ModeToggle />
        </header>
        <main className="flex-auto place-items-center pb-8 pt-28">
          {children}
        </main>
        <footer id="footer" className="grid flex-none place-items-center py-8">
          Footer
        </footer>
      </div>
    </div>
  );
};
