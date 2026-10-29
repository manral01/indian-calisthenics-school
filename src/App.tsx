import { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { RouterProvider, useRouter } from "./router";
import { findRoute } from "./seo/routes";
import { applyHead } from "./seo/head";
import { blogPosts } from "./data/blogPosts";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { TrainingPage } from "./components/TrainingPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPage, BlogPostPage } from "./pages/BlogPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const Page = () => {
  const { path } = useRouter();
  const route = findRoute(path);

  // Keep <head> in sync on client-side navigation (skip first render: the
  // prerendered HTML already has the right tags)
  const first = useRef(true);
  useEffect(() => {
    if (first.current && document.querySelector("[data-head]")) {
      first.current = false;
      return;
    }
    first.current = false;
    applyHead(route);
  }, [route]);

  const page = route.page;
  switch (page.kind) {
    case "home":
      return <Home />;
    case "program":
      return <TrainingPage key={page.slug} slug={page.slug} />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "blog":
      return <BlogPage />;
    case "post":
      return <BlogPostPage post={blogPosts.find((p) => p.slug === page.slug)!} />;
    default:
      return <NotFoundPage />;
  }
};

function App({ initialPath }: { initialPath: string }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider initialPath={initialPath}>
        <Navbar />
        <main>
          <Page />
        </main>
        <Footer />
      </RouterProvider>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
