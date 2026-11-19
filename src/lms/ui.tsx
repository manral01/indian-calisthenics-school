// Building blocks for the online course pages (phone-first).
import styled, { css } from "styled-components";
import { CheckCircle2, Clock, Lock, PlayCircle } from "lucide-react";
import { Link } from "../router";
import { stages, type Lesson, type Stage } from "../data/course";

export type LessonAccess = "open" | "locked" | "soon";

export const lessonAccess = (lesson: Lesson, stage: Stage["id"], owned: string[]): LessonAccess =>
  !lesson.video ? "soon" : lesson.free || owned.includes(stage) ? "open" : "locked";

// ─── Buttons ─────────────────────────────────────────────────────────────────
const buttonStyle = css<{ $primary?: boolean; $block?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 50px;
  padding: 0 22px;
  width: ${({ $block }) => ($block ? "100%" : "auto")};
  border-radius: ${({ theme }) => theme.radius.pill};
  font: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s, opacity 0.2s;
  background: ${({ $primary, theme }) => ($primary ? theme.gradients.fire : "transparent")};
  color: ${({ $primary, theme }) => ($primary ? theme.colors.onAccent : theme.colors.ink)};
  border: 1px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const Button = styled.button<{ $primary?: boolean; $block?: boolean }>`
  ${buttonStyle}
`;

export const ButtonTo = styled(Link)<{ $primary?: boolean; $block?: boolean }>`
  ${buttonStyle}
`;

export const ButtonA = styled.a<{ $primary?: boolean; $block?: boolean }>`
  ${buttonStyle}
`;

// ─── Surfaces ────────────────────────────────────────────────────────────────
export const Card = styled.div<{ $highlight?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ $highlight, theme }) => ($highlight ? theme.colors.accent : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 28px;
  }
`;

export const Muted = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
`;

export const ErrorText = styled.p`
  color: #ff8a65;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: 12px;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #0f0f0f;
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  font-size: 1rem; /* 16px+ stops iPhone zooming in */
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Track = styled.div`
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  span {
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.gradients.fire};
    transition: width 0.4s;
  }
`;

export const ProgressBar = ({ value }: { value: number }) => (
  <Track
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(value)}
  >
    <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </Track>
);

// ─── Curriculum list ─────────────────────────────────────────────────────────
const StageBlock = styled.section`
  & + & {
    margin-top: 28px;
  }
  h3 {
    font-size: 1.05rem;
    margin-bottom: 12px;
  }
  h3 span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ModuleBox = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  & + & {
    margin-top: 8px;
  }
  summary {
    list-style: none;
    cursor: pointer;
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-weight: 600;
    font-size: 0.95rem;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary small {
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 500;
    white-space: nowrap;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0 8px 8px;
  }
`;

const LessonRow = styled.li<{ $current?: boolean }>`
  a,
  > div {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 48px;
    padding: 8px 10px;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 0.9rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ $current }) => ($current ? "rgba(255,106,0,0.12)" : "transparent")};
  }
  a:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  > div {
    color: ${({ theme }) => theme.colors.muted};
  }
  svg {
    flex: none;
  }
  .grow {
    flex: 1;
  }
  .tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Curriculum = ({
  owned,
  done = new Set(),
  current,
  onlyStage,
}: {
  owned: string[];
  done?: Set<string>;
  current?: string;
  onlyStage?: Stage["id"];
}) => (
  <div>
    {stages
      .filter((s) => !onlyStage || s.id === onlyStage)
      .map((s) => (
        <StageBlock key={s.id} aria-label={`Stage ${s.number}: ${s.name}`}>
          <h3>
            <span>Stage {s.number}</span> · {s.name}
          </h3>
          {s.modules.length === 0 ? (
            <Muted>Lessons coming soon.</Muted>
          ) : (
            s.modules.map((m) => (
              <ModuleBox key={m.id} open={m.lessons.some((l) => l.id === current)}>
                <summary>
                  {m.title}
                  <small>
                    {m.lessons.length ? `${m.lessons.length} lesson${m.lessons.length > 1 ? "s" : ""}` : "Soon"}
                  </small>
                </summary>
                {m.lessons.length > 0 && (
                  <ol>
                    {m.lessons.map((l) => {
                      const access = lessonAccess(l, s.id, owned);
                      const icon = done.has(l.id) ? (
                        <CheckCircle2 size={20} color="#FF6A00" aria-label="Completed" />
                      ) : access === "open" ? (
                        <PlayCircle size={20} aria-hidden="true" />
                      ) : access === "locked" ? (
                        <Lock size={18} aria-label="Locked" />
                      ) : (
                        <Clock size={18} aria-label="Coming soon" />
                      );
                      const body = (
                        <>
                          {icon}
                          <span className="grow">{l.title}</span>
                          {l.free && !owned.includes(s.id) && <span className="tag">Free</span>}
                          {access === "soon" && <span className="tag">Video soon</span>}
                          {l.minutes && access !== "soon" && <small>{l.minutes} min</small>}
                        </>
                      );
                      return (
                        <LessonRow key={l.id} $current={l.id === current}>
                          <Link to={`/learn?l=${l.id}`}>{body}</Link>
                        </LessonRow>
                      );
                    })}
                  </ol>
                )}
              </ModuleBox>
            ))
          )}
        </StageBlock>
      ))}
  </div>
);
