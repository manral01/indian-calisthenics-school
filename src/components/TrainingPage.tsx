import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { trainingPrograms, type PricingTier } from "../data/trainingData";
import { TimingSelector } from "./TimingSelector";
import { PricingSelector } from "./PricingSelector";
import { BookingModal, type BookingContext } from "./BookingModal";
import { Footer } from "./Footer";

interface Props {
  programId: "calisthenics" | "kids";
  onNavigateHome: () => void;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const PageContainer = styled.div`
  min-height: 100vh;
  background: #050505;
  color: white;
`;

const HeaderNav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 18px 24px;
  background: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 106, 0, 0.2);
    border-color: rgba(255, 106, 0, 0.4);
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const BrandLogo = styled.span`
  font-size: 0.88rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: white;
  span {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const SectionDivider = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 106, 0, 0.3),
    transparent
  );
`;

const ContentSection = styled.section`
  padding: 36px 24px 50px;
  max-width: 1180px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 36px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  color: white;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const SectionSub = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
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
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: white;
  font-size: 0.85rem;
  font-weight: 900;
  border: none;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
export const TrainingPage = ({ programId, onNavigateHome }: Props) => {
  const config = trainingPrograms[programId] || trainingPrograms.calisthenics;

  // Weekday State
  const [weekdayTiming, setWeekdayTiming] = useState<string>(
    config.weekdaySession.morningTimings[0]?.time ||
      config.weekdaySession.eveningTimings[0]?.time ||
      ""
  );
  const [weekdayTier, setWeekdayTier] = useState<PricingTier>(
    config.weekdaySession.pricing[1] || config.weekdaySession.pricing[0]
  );

  // Weekend State
  const [weekendTiming, setWeekendTiming] = useState<string>(
    config.weekendSession.morningTimings[0]?.time || ""
  );
  const [weekendTier, setWeekendTier] = useState<PricingTier>(
    config.weekendSession.pricing[0]
  );

  // Modal State
  const [bookingContext, setBookingContext] = useState<BookingContext | null>(
    null
  );

  const handleOpenWeekdayBooking = () => {
    setBookingContext({
      trainingType: config.id,
      batch: config.weekdaySession.batchName,
      timing: weekdayTiming,
      duration: weekdayTier.duration,
      price: weekdayTier.price,
      priceDisplay: weekdayTier.displayPrice,
    });
  };

  const handleOpenWeekendBooking = () => {
    setBookingContext({
      trainingType: config.id,
      batch: config.weekendSession.batchName,
      timing: weekendTiming,
      duration: weekendTier.duration,
      price: weekendTier.price,
      priceDisplay: weekendTier.displayPrice,
    });
  };

  return (
    <PageContainer>
      {/* Top Header */}
      <HeaderNav>
        <BackButton onClick={onNavigateHome}>
          <ArrowLeft size={16} /> BACK TO LAB
        </BackButton>
        <BrandLogo>
          INDIAN CALISTHENICS <span>SCHOOL</span>
        </BrandLogo>
      </HeaderNav>

      {/* Weekdays Group Session */}
      <ContentSection id="weekday-sessions">
        <SectionHeader>
          <SectionTitle>
            <Calendar size={28} /> WEEKDAYS GROUP SESSION
          </SectionTitle>
          <SectionSub>
            Choose your preferred time slot and duration for weekday coaching.
          </SectionSub>
        </SectionHeader>

        {/* Timings */}
        <TimingSelector
          morningTimings={config.weekdaySession.morningTimings}
          eveningTimings={config.weekdaySession.eveningTimings}
          selectedTiming={weekdayTiming}
          onSelectTiming={setWeekdayTiming}
        />

        {/* Pricing Tiers */}
        <PricingSelector
          tiers={config.weekdaySession.pricing}
          selectedTierId={weekdayTier.id}
          onSelectTier={setWeekdayTier}
        />

        <BookingActionArea>
          <ActionButton onClick={handleOpenWeekdayBooking}>
            BOOK WEEKDAY DEMO <Sparkles size={16} />
          </ActionButton>
        </BookingActionArea>
      </ContentSection>

      <SectionDivider />

      {/* Weekend Group Session */}
      <ContentSection id="weekend-sessions">
        <SectionHeader>
          <SectionTitle>
            <Calendar size={28} /> WEEKEND GROUP SESSION
          </SectionTitle>
          <SectionSub>
            Focused weekend batches for intense skill progression and strength.
          </SectionSub>
        </SectionHeader>

        {/* Timings */}
        <TimingSelector
          morningTimings={config.weekendSession.morningTimings}
          eveningTimings={config.weekendSession.eveningTimings}
          selectedTiming={weekendTiming}
          onSelectTiming={setWeekendTiming}
        />

        {/* Pricing Tiers */}
        <PricingSelector
          tiers={config.weekendSession.pricing}
          selectedTierId={weekendTier.id}
          onSelectTier={setWeekendTier}
        />

        <BookingActionArea>
          <ActionButton onClick={handleOpenWeekendBooking}>
            BOOK WEEKEND DEMO <Sparkles size={16} />
          </ActionButton>
        </BookingActionArea>
      </ContentSection>

      {/* Shared Footer */}
      <Footer />

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingContext && (
          <BookingModal
            context={bookingContext}
            onClose={() => setBookingContext(null)}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
