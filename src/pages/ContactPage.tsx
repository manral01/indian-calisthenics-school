import styled from "styled-components";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, fullAddress, phoneDisplay } from "../data/business";
import { Container, ContactActions, H2, Lead, PageHeader, PageSection } from "../components/ui";

// Keyless Google Maps embed: exact pin once coordinates are set, otherwise a place search
const mapQuery = business.geo
  ? `${business.geo.lat},${business.geo.lng}`
  : `${business.name}, ${fullAddress}`;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`;

const Grid = styled.div`
  display: grid;
  gap: 24px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;
const Card = styled.div`
  padding: 26px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  address {
    font-style: normal;
  }
`;
const Row = styled.div`
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 1.65;
  &:last-child {
    border-bottom: 0;
  }
  svg {
    flex: none;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.accent};
  }
  strong {
    display: block;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 2px;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
const Map = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 380px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.lg};
  filter: grayscale(0.3);
`;
const Hours = styled.table`
  border-collapse: collapse;
  td {
    padding: 2px 16px 2px 0;
    vertical-align: top;
  }
  td:first-child {
    white-space: nowrap;
    font-weight: 600;
  }
`;

export const ContactPage = () => (
  <>
    <PageHeader
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]}
      eyebrow="Visit or message us"
      title="Contact Indian Calisthenics School, Madhapur"
      intro={[
        `${business.name} is in Madhapur, near Mindspace and HITEC City, Hyderabad. Message us to book a demo session or ask about batches, timings and fees.`,
      ]}
    >
      <ContactActions whatsappText="Hi, I'd like to book a demo session at Indian Calisthenics School, Madhapur." />
    </PageHeader>

    <PageSection $alt>
      <Container>
        <Grid>
          <Card>
            <H2 style={{ fontSize: "1.5rem" }}>{business.name}</H2>
            <address>
              <Row>
                <MapPin size={18} aria-hidden="true" />
                <div>
                  <strong>Address</strong>
                  {fullAddress}
                </div>
              </Row>
              {business.phone && (
                <Row>
                  <Phone size={18} aria-hidden="true" />
                  <div>
                    <strong>Phone / WhatsApp</strong>
                    <a href={`tel:${business.phone}`}>{phoneDisplay}</a>
                  </div>
                </Row>
              )}
              <Row>
                <Mail size={18} aria-hidden="true" />
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>
              </Row>
            </address>
            <Row>
              <Clock size={18} aria-hidden="true" />
              <div>
                <strong>Timings</strong>
                <Hours>
                  <tbody>
                    {business.hours.map((h) => (
                      <tr key={h.label + h.opens}>
                        <td>{h.label}</td>
                        <td>{h.display}</td>
                      </tr>
                    ))}
                  </tbody>
                </Hours>
              </div>
            </Row>
            <Row>
              <Navigation size={18} aria-hidden="true" />
              <div>
                <strong>Directions</strong>
                <a href={business.maps} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </div>
            </Row>
          </Card>
          <Map
            src={mapSrc}
            title={`Map showing ${business.name} in Madhapur, Hyderabad`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Grid>
      </Container>
    </PageSection>

    <PageSection>
      <Container style={{ maxWidth: 820 }}>
        <H2>Getting here</H2>
        <Lead>
          We're in Madhapur, a short distance from Mindspace and HITEC City.
          That makes early-morning and evening batches easy to fit around work if
          you're based in the HITEC City area.
        </Lead>
      </Container>
    </PageSection>
  </>
);
