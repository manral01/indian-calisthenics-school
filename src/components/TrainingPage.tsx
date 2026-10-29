import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { trainingPrograms, type PricingTier, type TrainingProgramConfig } from "../data/trainingData";
import { programPages, type ProgramSlug } from "../data/programPages";
import { TimingSelector } from "./TimingSelector";
import { PricingSelector } from "./PricingSelector";
import { BookingModal, type BookingContext } from "./BookingModal";
import { Link } from "../router";
import {
  Bullets,
  Container,
  ContactActions,
  FaqList,
  H2,
  Img,
  Lead,
  PageHeader,
  PageSection,
} from "./ui";

interface Props {
  slug: ProgramSlug;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const Highlights = styled.div`
  display: grid;
  gap: 14px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Highlight = styled.div`
  padding: 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  h3 {
    font-size: 1.1rem;
    margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.65;
  }
`;
const TwoCol = styled.div`
  display: grid;
  gap: 40px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
  }
`;
const Photos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.md};
  }
  img:first-child:nth-last-child(3) {
    grid-row: span 2;
  }
`;
const SessionTitle = styled.h3`
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const SessionSub = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 24px;
`;
const Divider = styled.hr`
  border: 0;
  height: 1px;
  margin: 48px 0;
  background: linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.3), transparent);
`;
const BookingActionArea = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
`;
const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 28px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.88rem;
  font-weight: 700;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;
const ReadMore = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`;
const Note = styled.p`
  padding: 20px 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(255, 106, 0, 0.35);
  background: rgba(255, 106, 0, 0.06);
  line-height: 1.65;
`;

// ─── Weekday / weekend booking blocks (calisthenics + kids) ─────────────────
const Schedule = ({ config }: { config: TrainingProgramConfig }) => {
  const [weekdayTiming, setWeekdayTiming] = useState<string>(
    config.weekdaySession.morningTimings[0]?.time ||
      config.weekdaySession.eveningTimings[0]?.time ||
      "",
  );
  const [weekdayTier, setWeekdayTier] = useState<PricingTier>(
    config.weekdaySession.pricing[1] || config.weekdaySession.pricing[0],
  );
  const [weekendTiming, setWeekendTiming] = useState<string>(
    config.weekendSession.morningTimings[0]?.time || "",
  );
  const [weekendTier, setWeekendTier] = useState<PricingTier>(config.weekendSession.pricing[0]);
  const [bookingContext, setBookingContext] = useState<BookingContext | null>(null);

  const open = (batch: string, timing: string, tier: PricingTier) =>
    setBookingContext({
      trainingType: config.id,
      batch,
      timing,
      duration: tier.duration,
      price: tier.price,
      priceDisplay: tier.displayPrice,
    });

  return (
    <>
      <div id="weekday-sessions">
        <SessionTitle>
          <Calendar size={26} aria-hidden="true" /> {config.weekdaySession.batchName}
        </SessionTitle>
        <SessionSub>Choose your preferred time slot and plan.</SessionSub>
        <TimingSelector
          morningTimings={config.weekdaySession.morningTimings}
          eveningTimings={config.weekdaySession.eveningTimings}
          selectedTiming={weekdayTiming}
          onSelectTiming={setWeekdayTiming}
        />
        <PricingSelector
          tiers={config.weekdaySession.pricing}
          selectedTierId={weekdayTier.id}
          onSelectTier={setWeekdayTier}
        />
        <BookingActionArea>
          <ActionButton
            onClick={() => open(config.weekdaySession.batchName, weekdayTiming, weekdayTier)}
          >
            BOOK WEEKDAY DEMO <Sparkles size={16} />
          </ActionButton>
        </BookingActionArea>
      </div>

      <Divider />

      <div id="weekend-sessions">
        <SessionTitle>
          <Calendar size={26} aria-hidden="true" /> {config.weekendSession.batchName}
        </SessionTitle>
        <SessionSub>Weekend batches for focused skill progression and strength.</SessionSub>
        <TimingSelector
          morningTimings={config.weekendSession.morningTimings}
          eveningTimings={config.weekendSession.eveningTimings}
          selectedTiming={weekendTiming}
          onSelectTiming={setWeekendTiming}
        />
        <PricingSelector
          tiers={config.weekendSession.pricing}
          selectedTierId={weekendTier.id}
          onSelectTier={setWeekendTier}
        />
        <BookingActionArea>
          <ActionButton
            onClick={() => open(config.weekendSession.batchName, weekendTiming, weekendTier)}
          >
            BOOK WEEKEND DEMO <Sparkles size={16} />
          </ActionButton>
        </BookingActionArea>
      </div>

      <AnimatePresence>
        {bookingContext && (
          <BookingModal context={bookingContext} onClose={() => setBookingContext(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export const TrainingPage = ({ slug }: Props) => {
  const page = programPages[slug];
  const config = page.schedule ? trainingPrograms[page.schedule] : null;
  const [ptBooking, setPtBooking] = useState(false);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: page.name, path: page.path },
        ]}
        eyebrow="Madhapur · Near Mindspace & HITEC City"
        title={page.h1}
        intro={page.intro}
        image={page.image}
      >
        <ContactActions whatsappText={page.whatsappText} />
      </PageHeader>

      <PageSection $alt>
        <Container>
          <H2>{page.highlightsTitle}</H2>
          <Highlights>
            {page.highlights.map((h) => (
              <Highlight key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </Highlight>
            ))}
          </Highlights>
        </Container>
      </PageSection>

      <PageSection>
        <Container>
          <TwoCol>
            <div>
              <H2>Who it's for</H2>
              <Bullets>
                {page.forWhom.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </Bullets>
              <ReadMore to={page.relatedPost.path}>
                Read: {page.relatedPost.title} <ArrowRight size={16} />
              </ReadMore>
            </div>
            <Photos>
              {page.gallery.map((img) => (
                <Img key={img.src} image={img} sizes="(min-width: 768px) 25vw, 50vw" />
              ))}
            </Photos>
          </TwoCol>
        </Container>
      </PageSection>

      <PageSection $alt id="timings">
        <Container>
          <H2>{config ? "Timings & fees" : "Fees & booking"}</H2>
          {config ? (
            <Schedule config={config} />
          ) : (
            <>
              <Note>{page.pricingNote}</Note>
              {slug === "personal-training" && (
                <BookingActionArea style={{ justifyContent: "flex-start" }}>
                  <ActionButton onClick={() => setPtBooking(true)}>
                    BOOK A DEMO SESSION <Sparkles size={16} />
                  </ActionButton>
                </BookingActionArea>
              )}
              <ContactActions whatsappText={page.whatsappText} />
            </>
          )}
        </Container>
      </PageSection>

      <PageSection>
        <Container style={{ maxWidth: 820 }}>
          <H2>Frequently asked questions</H2>
          <FaqList faqs={page.faqs} />
          <Lead style={{ marginTop: 28 }}>
            Still have questions? <Link to="/contact">Contact us</Link> or see our{" "}
            <Link to="/#faq">general FAQs</Link>.
          </Lead>
        </Container>
      </PageSection>

      <AnimatePresence>
        {ptBooking && (
          <BookingModal
            context={{
              trainingType: "personal-training",
              batch: "Personal Training",
              timing: null,
              duration: null,
              price: null,
              priceDisplay: null,
            }}
            onClose={() => setPtBooking(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
