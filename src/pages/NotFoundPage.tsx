import { NAV_LINKS } from "../components/Navbar";
import { Bullets, Container, PageSection } from "../components/ui";
import { Link } from "../router";

export const NotFoundPage = () => (
  <PageSection style={{ paddingTop: 160 }}>
    <Container style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 16 }}>Page not found</h1>
      <p style={{ color: "#A3A3A3", lineHeight: 1.7, marginBottom: 24 }}>
        The page you're looking for doesn't exist. Try one of these instead:
      </p>
      <Bullets>
        <li>
          <Link to="/">Home</Link>
        </li>
        {NAV_LINKS.map(([label, to]) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </Bullets>
    </Container>
  </PageSection>
);
