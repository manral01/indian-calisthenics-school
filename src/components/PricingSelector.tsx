import styled from "styled-components";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import type { PricingTier } from "../data/trainingData";

interface Props {
  tiers: PricingTier[];
  selectedTierId: string | null;
  onSelectTier: (tier: PricingTier) => void;
}

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin-bottom: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;

const Card = styled(motion.div)<{ $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $active }) =>
    $active ? "rgba(255, 106, 0, 0.08)" : "#141414"};
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.orange : "rgba(255, 255, 255, 0.08)"};
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.shadows.glow : theme.shadows.card};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.orange};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -12px;
  right: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 99px;
  background: ${({ theme }) => theme.gradients.fire};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 12px rgba(255, 106, 0, 0.4);
`;

const DurationTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
`;

const PriceTag = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 16px;
`;

const FeaturesList = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.4;
  }

  svg {
    flex: none;
    color: ${({ theme }) => theme.colors.orange};
    margin-top: 2px;
  }
`;

export const PricingSelector = ({
  tiers,
  selectedTierId,
  onSelectTier,
}: Props) => {
  return (
    <Grid>
      {tiers.map((tier) => {
        const active = selectedTierId === tier.id;
        return (
          <Card
            key={tier.id}
            $active={active}
            onClick={() => onSelectTier(tier)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tier.popular && (
              <Badge>
                <Zap size={11} /> POPULAR
              </Badge>
            )}
            <DurationTitle>{tier.duration}</DurationTitle>
            <PriceTag>{tier.displayPrice}</PriceTag>
            {tier.features && tier.features.length > 0 && (
              <FeaturesList>
                {tier.features.map((feat, idx) => (
                  <li key={idx}>
                    <Check size={14} />
                    {feat}
                  </li>
                ))}
              </FeaturesList>
            )}
          </Card>
        );
      })}
    </Grid>
  );
};
