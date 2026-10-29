// Minimal router: real <a href> links (crawlable, work without JS) that
// navigate client-side via the History API when JS is running.
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { normalizePath } from "./seo/routes";

interface Location {
  path: string;
  hash: string;
}

interface RouterState extends Location {
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterState>({
  path: "/",
  hash: "",
  navigate: () => {},
});

const parse = (to: string): Location => {
  const [p, h = ""] = to.split("#");
  return { path: normalizePath(p || "/"), hash: h };
};

const scrollToHash = (hash: string) => {
  const el = hash ? document.getElementById(hash) : null;
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0 });
};

export const RouterProvider = ({
  initialPath,
  children,
}: {
  initialPath: string;
  children: ReactNode;
}) => {
  const [loc, setLoc] = useState<Location>(() => parse(initialPath));

  useEffect(() => {
    const onPop = () =>
      setLoc(parse(window.location.pathname + window.location.hash));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = parse(to.startsWith("#") ? window.location.pathname + to : to);
    window.history.pushState({}, "", next.path + (next.hash ? `#${next.hash}` : ""));
    setLoc((prev) => {
      // Same page: just scroll; otherwise scroll after the new page renders
      if (prev.path === next.path) scrollToHash(next.hash);
      return next;
    });
  }, []);

  useEffect(() => {
    // Wait a frame so the new page's DOM exists before scrolling
    const id = requestAnimationFrame(() => scrollToHash(loc.hash));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.path]);

  return (
    <RouterContext.Provider value={{ ...loc, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Internal link. External / new-tab / modified clicks fall through to the browser. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, onClick, ...rest }, ref) => {
    const { navigate } = useRouter();
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        rest.target === "_blank"
      )
        return;
      e.preventDefault();
      navigate(to);
    };
    return <a ref={ref} href={to} onClick={handle} {...rest} />;
  },
);
Link.displayName = "Link";
