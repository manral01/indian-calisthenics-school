import styled from "styled-components";
import { Clock, Sun, Moon } from "lucide-react";
import type { TimingSlot } from "../data/trainingData";

interface Props {
  morningTimings: TimingSlot[];
  eveningTimings: TimingSlot[];
  selectedTiming: string | null;
  onSelectTiming: (timing: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
`;

const Group = styled.div``;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
`;

const SlotButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.fire : "rgba(255, 255, 255, 0.05)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255, 255, 255, 0.7)")};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.orange : "rgba(255, 255, 255, 0.10)"};
  box-shadow: ${({ $active, theme }) =>
    $active ? theme.shadows.glow : "none"};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.gradients.fire : "rgba(255, 255, 255, 0.1)"};
    border-color: ${({ theme }) => theme.colors.orange};
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

export const TimingSelector = ({
  morningTimings,
  eveningTimings,
  selectedTiming,
  onSelectTiming,
}: Props) => {
  return (
    <Container>
      {morningTimings.length > 0 && (
        <Group>
          <GroupHeader>
            <Sun size={15} /> MORNING BATCHES
          </GroupHeader>
          <SlotsGrid>
            {morningTimings.map((slot) => {
              const active = selectedTiming === slot.time;
              return (
                <SlotButton
                  key={slot.time}
                  $active={active}
                  onClick={() => onSelectTiming(slot.time)}
                  type="button"
                >
                  <Clock size={14} />
                  {slot.label}
                </SlotButton>
              );
            })}
          </SlotsGrid>
        </Group>
      )}

      {eveningTimings.length > 0 && (
        <Group>
          <GroupHeader>
            <Moon size={15} /> EVENING BATCHES
          </GroupHeader>
          <SlotsGrid>
            {eveningTimings.map((slot) => {
              const active = selectedTiming === slot.time;
              return (
                <SlotButton
                  key={slot.time}
                  $active={active}
                  onClick={() => onSelectTiming(slot.time)}
                  type="button"
                >
                  <Clock size={14} />
                  {slot.label}
                </SlotButton>
              );
            })}
          </SlotsGrid>
        </Group>
      )}
    </Container>
  );
};
