// Homepage sections in the Calisthenics Lab India style. All prices and timings
// come from trainingData.ts / programs.ts so the homepage, program pages and
// demo form always agree.
import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, ExternalLink, MoonStar, Star, Sun, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "../../router";
import { DemoLink } from "../DemoBooking";
import { trainingPrograms } from "../../data/trainingData";
import { programsData } from "../../data/programs";
import { programList } from "../../data/programPages";
import { faqData } from "../../data/faq";
import { business, phoneDisplay } from "../../data/business";
import googleReviews from "../../data/googleReviews.json";
import { FaqList } from "../ui";
import {
  Accordion,
  BodyText,
  CheckList,
  Ember,
  Features,
  Glass,
  Section,
  SectionHeading,
  Stack,
  Wrap,
  condensed,
  ember,
  emberButton,
  glass,
  edgeEmber,
} from "./kit";

const adult = trainingPrograms.calisthenics;
const kids = trainingPrograms.kids;
const slots = (t: { label: string }[]) => t.map((s) => s.label);

// ── Skills ticker ───────────────────────────────────────────────────────────
const SKILLS = ["Pull-Up", "Push-Up", "Handstand", "L-Sit", "Core Strength", "Mobility", "Muscle-Up", "Front Lever"];
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const Ticker = styled.div`
  overflow: hidden;
  border-block: 1px solid rgba(255, 255, 255, 0.1);
  background: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
  > div {
    display: flex;
    width: max-content;
    animation: ${marquee} 40s linear infinite;
  }
  span {
    ${condensed};
    display: flex;
    align-items: center;
    font-size: clamp(1.5rem, 5vw, 1.9rem);
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.8);
    padding-left: 40px;
  }
  b {
    font-weight: 400;
    padding-left: 40px;
    color: ${({ theme }) => theme.colors.accent};
  }
  @media (prefers-reduced-motion: reduce) {
    > div {
      animation: none;
    }
  }
`;
export const SkillsTicker = () => (
  <Ticker aria-hidden="true">
    <div>
      {[0, 1].map((copy) =>
        SKILLS.map((s) => (
          <span key={`${copy}-${s}`}>
            {s}
            <b>✦</b>
          </span>
        )),
      )}
    </div>
  </Ticker>
);

// ── Plans & timings ─────────────────────────────────────────────────────────
const Ribbon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  i {
    display: none;
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent});
  }
  i:last-child {
    background: linear-gradient(270deg, transparent, ${({ theme }) => theme.colors.accent});
  }
  p {
    ${glass};
    ${condensed};
    margin: 0 auto;
    padding: 8px 28px 4px;
    border-radius: 999px;
    font-size: clamp(1.4rem, 5.5vw, 2.2rem);
    letter-spacing: 0.12em;
    white-space: nowrap;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    i {
      display: block;
    }
    p {
      margin: 0 24px;
    }
  }
`;
const PlanTitle = styled.h2`
  ${condensed};
  text-align: center;
  color: white;
  line-height: 0.9;
  margin-bottom: 40px;
  > span:first-child {
    display: block;
    font-size: clamp(3.4rem, 15vw, 5.5rem);
  }
  > span:last-child {
    display: block;
    font-size: clamp(1.8rem, 8vw, 3rem);
    color: white;
  }
`;
const Table = styled(Glass)`
  max-width: 560px;
  margin: 0 auto 28px;
  border-radius: 24px;
  overflow: hidden;
`;
const TableHead = styled.div`
  ${ember};
  ${condensed};
  text-align: center;
  color: #0a0a0a;
  font-size: clamp(1.5rem, 6vw, 1.9rem);
  padding: 8px 0 4px;
`;
const Rows = styled.div`
  padding: 12px 20px 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 32px 20px;
  }
`;
const Row = styled.div<{ $head?: boolean }>`
  ${condensed};
  display: grid;
  grid-template-columns: 1fr 8.5rem;
  font-size: ${({ $head }) => ($head ? "clamp(1.2rem, 5vw, 1.5rem)" : "clamp(1.3rem, 5.5vw, 1.8rem)")};
  color: ${({ $head, theme }) => ($head ? theme.colors.accent : "white")};
  letter-spacing: ${({ $head }) => ($head ? "0.08em" : "0.03em")};
  border-bottom: ${({ $head }) => ($head ? "none" : "1px solid rgba(255,255,255,.1)")};
  &:last-child {
    border-bottom: none;
  }
  span {
    padding: ${({ $head }) => ($head ? "4px 0" : "10px 0 7px")};
  }
  span:last-child {
    padding-left: 18px;
    border-left: ${({ $head }) => ($head ? "none" : "1px solid rgba(255,255,255,.1)")};
  }
`;
const SideCard = styled(Glass)`
  width: fit-content;
  max-width: 100%;
  margin: 0 auto 20px;
  border-radius: 24px;
  padding: 16px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  > div:first-child {
    display: flex;
    align-items: center;
    gap: 14px;
    svg {
      flex: none;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  p {
    ${condensed};
    line-height: 1;
  }
  .label span {
    display: block;
  }
  .label span:first-child {
    font-size: 1.6rem;
  }
  .label span:last-child {
    font-size: 2rem;
  }
  .price {
    font-size: 1.7rem;
    text-align: center;
    line-height: 1.15;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    gap: 24px;
    padding: 16px 32px;
    .price {
      text-align: left;
      padding-left: 24px;
      border-left: 1px solid rgba(255, 255, 255, 0.15);
    }
  }
`;
const TimingsTitle = styled.h2`
  ${condensed};
  text-align: center;
  color: white;
  font-size: clamp(4rem, 18vw, 5.5rem);
  letter-spacing: 0.15em;
  margin: 56px 0 36px;
`;
const TimingGrid = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;
const TimingCard = styled(Glass)`
  border-radius: 24px;
  padding: 22px 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 28px;
  }
`;
const BadgeWrap = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    position: relative;
    z-index: 1;
    flex: none;
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: white;
    color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
  > span:last-child {
    ${ember};
    ${condensed};
    margin-left: -16px;
    padding: 6px 40px 2px 28px;
    color: #0a0a0a;
    font-size: clamp(1.5rem, 6vw, 1.9rem);
    white-space: nowrap;
    clip-path: polygon(0 0, 100% 0, calc(100% - 1rem) 50%, 100% 100%, 0 100%);
  }
`;
const Badge = ({ Icon, label }: { Icon: LucideIcon; label: string }) => (
  <BadgeWrap>
    <span>
      <Icon size={30} strokeWidth={1.75} />
    </span>
    <span>{label}</span>
  </BadgeWrap>
);
const Slots = styled.div`
  margin-top: 22px;
  p {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 4px;
  }
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    font-size: 1.15rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  li:last-child {
    border-bottom: none;
  }
  li::before {
    content: "";
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    ${ember};
  }
`;
const SlotGroup = ({ title, times }: { title: string; times: string[] }) => (
  <Slots>
    <p>{title}</p>
    <ul>
      {times.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </Slots>
);
const FeesLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 24px;
  margin-top: 28px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const memberships = programsData.filter((p) => p.level === "MEMBERSHIP");
const priceOf = (t: { displayPrice: string }[]) => t.map((p) => p.displayPrice);

export const PlansTimings = () => (
  <Section $glow id="timings">
    <Wrap $w={760}>
      <Ribbon>
        <i />
        <p>
          Indian Calisthenics <Ember>School</Ember>
        </p>
        <i />
      </Ribbon>
      <PlanTitle>
        <span>Choose Your Plan</span>
        <span>
          &amp; Begin Your <Ember>Transformation</Ember>
        </span>
      </PlanTitle>

      <Table $edge>
        <TableHead>Calisthenics Memberships</TableHead>
        <Rows>
          <Row $head>
            <span>Plans</span>
            <span>Price</span>
          </Row>
          {memberships.map((m) => (
            <Row key={m.name}>
              <span>{m.name.replace("-", " ")}</span>
              <span>{m.price}/-</span>
            </Row>
          ))}
        </Rows>
      </Table>

      <SideCard $edge>
        <div>
          <CalendarDays size={52} strokeWidth={1.5} />
          <p className="label">
            <Ember>Monthly Weekend</Ember>
            <span>Membership</span>
          </p>
        </div>
        <p className="price">Adults – {priceOf(adult.weekendSession.pricing)[0]}/-</p>
      </SideCard>

      <SideCard $edge>
        <div>
          <Users size={52} strokeWidth={1.5} />
          <p className="label">
            <Ember>The Mighty Tribe</Ember>
            <span>Kids 3–15</span>
          </p>
        </div>
        <p className="price">
          Weekdays – {priceOf(kids.weekdaySession.pricing)[0]}/-
          <br />
          Weekends – {priceOf(kids.weekendSession.pricing)[0]}/-
        </p>
      </SideCard>

      <TimingsTitle>Timings</TimingsTitle>
      <TimingGrid>
        <TimingCard $edge>
          <Badge Icon={Sun} label="Morning Batches" />
          <SlotGroup title="Adult Batches" times={slots(adult.weekdaySession.morningTimings)} />
        </TimingCard>
        <TimingCard $edge>
          <Badge Icon={MoonStar} label="Evening Batches" />
          <SlotGroup title="Kids Batch" times={slots(kids.weekdaySession.eveningTimings)} />
          <SlotGroup title="Adult Batches" times={slots(adult.weekdaySession.eveningTimings)} />
        </TimingCard>
      </TimingGrid>
      <TimingCard $edge>
        <Badge Icon={Sun} label="Weekend Batches" />
        <TimingGrid style={{ marginBottom: 0 }}>
          <SlotGroup title="Adult · Sat & Sun" times={slots(adult.weekendSession.morningTimings)} />
          <SlotGroup title="Kids · Sat & Sun" times={slots(kids.weekendSession.morningTimings)} />
        </TimingGrid>
      </TimingCard>

      <FeesLinks>
        <Link to="/training/calisthenics#timings">
          Adult plans &amp; details <ArrowRight size={15} />
        </Link>
        <Link to="/training/kids#timings">
          Kids plans &amp; details <ArrowRight size={15} />
        </Link>
      </FeesLinks>
    </Wrap>
  </Section>
);

// ── Why calisthenics ────────────────────────────────────────────────────────
export const Method = () => (
  <Section id="why-calisthenics">
    <Wrap>
      <SectionHeading eyebrow="The Method">
        Why <Ember>Calisthenics</Ember>
      </SectionHeading>
      <Stack>
        <Accordion index="01" title="The Calisthenics Advantage">
          <BodyText>
            True strength isn't about moving dead weight; it's about control over your own body. We don't chase
            numbers on a machine. We build strong, mobile, athletic bodies.
          </BodyText>
          <Features
            items={[
              { title: "Mind-Muscle Connection", desc: "Train your nervous system and muscles to fire together as one efficient unit." },
              { title: "Coordination & Balance", desc: "Build body awareness and stability that carries straight into everyday life." },
              { title: "Mobility & Flexibility", desc: "Get strong through a full range of motion, so your joints feel better, not worse." },
              { title: "The Byproduct", desc: "Fat loss, lean muscle and better posture come naturally as you learn the skills." },
            ]}
          />
        </Accordion>
        <Accordion index="02" title="Calisthenics vs Gym">
          <BodyText>
            In a gym, you train to look a certain way. At <Ember as="strong">{business.name}</Ember>, you learn about
            your body instead of machines: how to push, pull, hold and balance it. The look follows, and so does the
            confidence of knowing exactly what your body can do.
          </BodyText>
        </Accordion>
        <Accordion index="03" title="Built for Beginners">
          <BodyText>
            Most of our members start with zero calisthenics experience. Every exercise has an easier version, so you
            begin where you are, whether that's your first push-up or your first pull-up, and progress step by step
            with a coach watching your form.
          </BodyText>
        </Accordion>
      </Stack>
    </Wrap>
  </Section>
);

// ── Programs ────────────────────────────────────────────────────────────────
const CARD_COPY: Record<string, { level: string; text: string; price?: string }> = {
  calisthenics: { level: "All levels", text: "Group batches on weekday mornings, evenings and weekends.", price: "From ₹4,444/mo" },
  kids: { level: "Kids 3–15", text: "The Mighty Tribe: calisthenics, gymnastics & parkour.", price: "From ₹3,333/mo" },
  "personal-training": { level: "1-on-1", text: "A coach and a plan built around your goals. In person or online.", price: "Online ₹15,000" },
  "freestyle-parkour": { level: "Dynamic skills", text: "Bar flow, vaults and safe landings, step by step." },
};
const ProgramGrid = styled.div`
  display: grid;
  gap: 14px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;
const ProgramCard = styled(Link)`
  ${glass};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px;
  border-radius: 20px;
  transition:
    transform 0.25s,
    border-color 0.25s;
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 106, 0, 0.4);
  }
  small {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
  h3 {
    ${condensed};
    font-size: 1.9rem;
    line-height: 1;
  }
  p {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.55;
  }
  em {
    font-style: normal;
    font-weight: 700;
  }
  span {
    margin-top: auto;
    padding-top: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
const DemoCard = styled(DemoLink)`
  ${glass};
  ${edgeEmber};
  display: block;
  margin-top: 40px;
  padding: 36px 24px;
  border-radius: 40px;
  text-align: center;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: -96px;
    left: 15%;
    width: 70%;
    height: 192px;
    border-radius: 50%;
    background: rgba(255, 106, 0, 0.25);
    filter: blur(48px);
    pointer-events: none;
  }
  h2 {
    ${condensed};
    margin-top: 16px;
    font-size: clamp(2.4rem, 10vw, 3.75rem);
    line-height: 1;
    color: white;
  }
  p {
    max-width: 44rem;
    margin: 18px auto 0;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.78);
  }
  p b {
    color: ${({ theme }) => theme.colors.accent};
  }
  > span:last-child {
    ${emberButton};
    min-height: 48px;
    padding: 0 30px;
    margin-top: 28px;
    font-size: 0.85rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 48px;
  }
`;
const Eyebrow = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Programs = () => (
  <Section id="skills">
    <Wrap>
      <SectionHeading eyebrow="Programs">
        Train <Ember>Your Way</Ember>
      </SectionHeading>
      <ProgramGrid>
        {programList.map((p) => {
          const c = CARD_COPY[p.slug];
          return (
            <ProgramCard key={p.slug} to={p.path}>
              <small>{c.level}</small>
              <h3>{p.name}</h3>
              <p>{c.text}</p>
              {c.price && <em>{c.price}</em>}
              <span>
                Timings &amp; details <ArrowRight size={15} />
              </span>
            </ProgramCard>
          );
        })}
      </ProgramGrid>

      <DemoCard>
        <Eyebrow>Free Weekday Demo</Eyebrow>
        <h2>
          Experience the School – <Ember>On Us.</Ember>
        </h2>
        <p>
          Your first session is <b>free on any weekday</b>, Monday to Friday, in any batch slot. Prefer the weekend?
          A weekend demo is ₹800, and we adjust it in your package when you join.
        </p>
        <span>
          Book a demo <ArrowRight size={16} />
        </span>
      </DemoCard>
    </Wrap>
  </Section>
);

// ── What you get ────────────────────────────────────────────────────────────
export const Offer = () => (
  <Section>
    <Wrap>
      <SectionHeading eyebrow="The Offer">
        What You're <Ember>Going To Get</Ember>
      </SectionHeading>
      <Stack>
        <Accordion index="01" title="Training Includes">
          <CheckList
            items={[
              "Strength & conditioning",
              "Calisthenics fundamentals",
              "Fat loss through skill training",
              "Handstands & balance",
              "Core & mobility",
              "Skill progressions at your pace",
            ]}
          />
        </Accordion>
        <Accordion index="02" title="Why Choose ICS?">
          <CheckList
            items={[
              "Experienced coaches",
              "Warm-up, workout & cool-down every session",
              "Beginner-friendly progressions",
              "Rigs, bars, rings & turf in Madhapur",
              "A supportive community",
            ]}
          />
        </Accordion>
      </Stack>
    </Wrap>
  </Section>
);

// ── Reviews ─────────────────────────────────────────────────────────────────
interface Review {
  author: string;
  rating: number;
  text: string;
}
const reviews = (googleReviews.reviews as Review[]).filter((r) => r.text);
const reviewsUrl = business.googleBusinessProfile || googleReviews.googleMapsUri;

const ReviewRow = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 20px;
  padding: 12px 20px 20px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ReviewCard = styled.figure`
  ${glass};
  position: relative;
  flex: none;
  width: min(85vw, 420px);
  margin: 0;
  padding: 26px 24px;
  border-radius: 28px;
  scroll-snap-align: start;
  overflow: hidden;
  &::before {
    content: "“";
    ${condensed};
    position: absolute;
    top: -16px;
    right: 22px;
    font-size: 8rem;
    line-height: 1;
    ${ember};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    opacity: 0.2;
  }
  blockquote {
    margin: 16px 0 18px;
    font-size: 0.93rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.82);
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  figcaption {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  figcaption span {
    ${ember};
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    color: #0a0a0a;
    font-size: 1rem;
    letter-spacing: 0;
  }
`;
const Stars = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors.accent};
`;
const ArrowBtn = styled.button`
  ${glass};
  display: none;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  color: white;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;
  }
`;
const ReviewNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Reviews = () => {
  const row = useRef<HTMLDivElement>(null);
  const move = (dir: number) => row.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  if (!reviews.length) return null;
  return (
    <Section $glow id="reviews" style={{ paddingInline: 0 }}>
      <Wrap $w={1180}>
        <SectionHeading eyebrow="Google Reviews">
          Voices of <Ember>The School</Ember>
        </SectionHeading>
        <ReviewRow ref={row}>
          {reviews.map((r) => (
            <ReviewCard key={r.author}>
              <Stars aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </Stars>
              <blockquote>"{r.text}"</blockquote>
              <figcaption>
                <span aria-hidden="true">{r.author.trim().charAt(0).toUpperCase()}</span>
                {r.author}
              </figcaption>
            </ReviewCard>
          ))}
        </ReviewRow>
        <ReviewNav>
          <ArrowBtn onClick={() => move(-1)} aria-label="Previous review">
            <ChevronLeft size={26} />
          </ArrowBtn>
          {reviewsUrl && (
            <a href={reviewsUrl} target="_blank" rel="noreferrer">
              All reviews on Google <ExternalLink size={14} />
            </a>
          )}
          <ArrowBtn onClick={() => move(1)} aria-label="Next review">
            <ChevronRight size={26} />
          </ArrowBtn>
        </ReviewNav>
      </Wrap>
    </Section>
  );
};

// ── Community ───────────────────────────────────────────────────────────────
const COMMUNITY = [
  { src: "/hero/ics-certificates-hd.webp", w: 1600, h: 901, alt: "Members with their certificates at Indian Calisthenics School" },
  { src: "/hero/halloween-hd.webp", w: 1200, h: 1600, alt: "Halloween party at Indian Calisthenics School" },
  { src: "/hero/street-run-crew-hd.webp", w: 1280, h: 1600, alt: "Run and calisthenics crew in Hyderabad" },
  { src: "/hero/courtyard-meetup-hd.webp", w: 1320, h: 922, alt: "Hyderabad calisthenics community meetup" },
  { src: "/hero/night-session-hd.webp", w: 1007, h: 1600, alt: "Night training session with the community" },
  { src: "/hero/street-community-hd.webp", w: 1440, h: 1106, alt: "Members together after a group session" },
];
const Collage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 150px;
  gap: 10px;
  > div {
    border-radius: 18px;
    overflow: hidden;
    ${edgeEmber};
  }
  > div:nth-child(1),
  > div:nth-child(4) {
    grid-column: span 2;
    grid-row: span 2;
  }
  > div:nth-child(2),
  > div:nth-child(3) {
    grid-row: span 2;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
  > div:hover img {
    transform: scale(1.05);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 170px;
    gap: 14px;
    > div:nth-child(4) {
      grid-column: span 2;
      grid-row: span 1;
    }
  }
`;
export const Community = () => (
  <Section id="community">
    <Wrap $w={1180}>
      <SectionHeading eyebrow="Community First">
        More Than <Ember>A Training Space</Ember>
      </SectionHeading>
      <Collage>
        {COMMUNITY.map((c) => (
          <div key={c.src}>
            <img src={c.src} width={c.w} height={c.h} alt={c.alt} loading="lazy" decoding="async" />
          </div>
        ))}
      </Collage>
    </Wrap>
  </Section>
);

// ── At a glance & FAQ ───────────────────────────────────────────────────────
const FACTS: [string, string][] = [
  ["Where", `${business.streetAddress}, Madhapur, Hyderabad ${business.postalCode}, near Mindspace and HITEC City`],
  ["Adult fees", "Weekdays ₹7,777/month (₹22,222 quarterly) · Weekends ₹4,444/month"],
  ["Kids (The Mighty Tribe, ages 3–15)", "Weekdays ₹5,555/month · Weekends ₹3,333/month"],
  ["Timings", `Mon–Fri 6:30–9:30 AM & 6–9 PM (kids 5–7 PM) · Sat–Sun ${business.hours[2]?.display ?? ""}`],
  ["Levels", "Complete beginners to advanced: push-ups and pull-ups to handstands, levers and muscle-ups"],
  ["Demo", `Free on weekdays · Weekend demo ₹800, adjusted when you join · WhatsApp ${phoneDisplay}`],
];
const Facts = styled.dl`
  display: grid;
  gap: 12px;
  margin: 0;
  > div {
    ${glass};
    padding: 16px 20px;
    border-radius: 18px;
  }
  dt {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
  dd {
    margin: 6px 0 0;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;
export const AtAGlance = () => (
  <Section id="at-a-glance" aria-label="At a glance" style={{ paddingBottom: 0 }}>
    <Wrap>
      <SectionHeading eyebrow="At a glance">
        {business.name} <Ember>in short</Ember>
      </SectionHeading>
      <Facts>
        {FACTS.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </Facts>
    </Wrap>
  </Section>
);

// Text must stay identical to the FAQPage schema; both read faqData.
export const HomeFaq = () => (
  <Section $glow id="faq">
    <Wrap>
      <SectionHeading eyebrow="Got Questions?">
        Quick <Ember>Answers</Ember>
      </SectionHeading>
      <FaqList faqs={faqData} />
    </Wrap>
  </Section>
);
