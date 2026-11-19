// /course: sales page for the online Calisthenics Trainer Certification.
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BookOpen, Check, MessageCircle, PlayCircle } from "lucide-react";
import { Bullets, Container, Eyebrow, FaqList, H2, Lead, PageHeader, PageSection } from "../components/ui";
import { Link, useRouter } from "../router";
import {
  COURSE,
  formatInr,
  isProductId,
  lessonCount,
  stages,
  type ProductId,
} from "../data/course";
import { courseFaqs } from "../data/courseFaq";
import { business, whatsappLink } from "../data/business";
import { fetchMyStages, useSession } from "../lms/session";
import { buy, CheckoutCancelled } from "../lms/checkout";
import { Button, ButtonA, ButtonTo, Card, Curriculum, ErrorText, Muted } from "../lms/ui";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Online Course", path: COURSE.path },
];

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

const StageGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 28px;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StageCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  h3 {
    font-size: 1.35rem;
  }
  ul {
    flex: 1;
  }
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.typography.displayFamily};
  small {
    font-size: 0.85rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Meta = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const Owned = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  font-size: 0.9rem;
`;

const waitlistText = (stage?: number) =>
  `Hi, please notify me when the online Calisthenics Trainer Certification${
    stage ? ` (Stage ${stage})` : ""
  } opens.`;

export const CoursePage = () => {
  const { search, navigate } = useRouter();
  const session = useSession();
  const [owned, setOwned] = useState<string[]>([]);
  const [busy, setBusy] = useState<ProductId | null>(null);
  const [error, setError] = useState("");

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    fetchMyStages().then(setOwned, () => {});
  }, [userId]);

  const purchase = useCallback(
    async (product: ProductId) => {
      setError("");
      if (!session) {
        navigate(`/login?next=${encodeURIComponent(`${COURSE.path}?buy=${product}`)}`);
        return;
      }
      setBusy(product);
      try {
        await buy(product);
        navigate("/learn?welcome=1");
      } catch (e) {
        if (!(e instanceof CheckoutCancelled)) setError((e as Error).message);
      } finally {
        setBusy(null);
      }
    },
    [session, navigate],
  );

  // Coming back from login with ?buy=stage-1: continue straight to payment
  const resumed = useRef(false);
  useEffect(() => {
    const product = new URLSearchParams(search).get("buy");
    if (!session || resumed.current || !isProductId(product)) return;
    resumed.current = true;
    window.history.replaceState(null, "", COURSE.path + "#stages");
    void purchase(product);
  }, [search, session, purchase]);

  const allPriced = stages.every((s) => s.priceInr !== null);
  const stagesTotal = stages.reduce((n, s) => n + (s.priceInr ?? 0), 0);
  const bundle = COURSE.bundlePriceInr;

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Online course"
        title={COURSE.name}
        intro={[COURSE.intro, `Taught by ${business.founder.name}, founder of ${business.name}.`]}
      >
        <Actions>
          <Button $primary onClick={() => navigate("#stages")}>
            <BookOpen size={18} /> See the 3 stages
          </Button>
          <ButtonTo to="/learn?l=1-1-1">
            <PlayCircle size={18} /> Watch a free lesson
          </ButtonTo>
        </Actions>
      </PageHeader>

      <PageSection $alt id="stages">
        <Container>
          <Eyebrow>Choose your stage</Eyebrow>
          <H2>
            One path, <span>3 stages</span>
          </H2>
          <Lead>
            Start with Stage 1. Stop after Stage 1 or 2 if you're training for yourself, or complete all 3
            to become a certified trainer.
          </Lead>
          {error && <ErrorText role="alert">{error}</ErrorText>}

          <StageGrid>
            {stages.map((s) => {
              const have = owned.includes(s.id);
              const count = lessonCount(s);
              return (
                <StageCard key={s.id} $highlight={s.number === 1}>
                  <Eyebrow style={{ marginBottom: 0 }}>Stage {s.number}</Eyebrow>
                  <h3>{s.name}</h3>
                  <Muted>{s.tagline}</Muted>
                  <Bullets>
                    {s.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </Bullets>
                  {count > 0 && (
                    <Meta>
                      <PlayCircle size={16} /> {count} lesson{count > 1 ? "s" : ""} so far
                    </Meta>
                  )}
                  {have ? (
                    <>
                      <Owned>
                        <Check size={18} /> You own this stage
                      </Owned>
                      <ButtonTo $primary $block to="/learn">
                        Continue learning
                      </ButtonTo>
                    </>
                  ) : s.priceInr === null ? (
                    <>
                      <Price>Coming soon</Price>
                      {whatsappLink() && (
                        <ButtonA
                          $block
                          href={whatsappLink(waitlistText(s.number))}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle size={18} /> Notify me on WhatsApp
                        </ButtonA>
                      )}
                    </>
                  ) : (
                    <>
                      <Price>
                        {formatInr(s.priceInr)} <small>one-time</small>
                      </Price>
                      <Button
                        $primary
                        $block
                        disabled={busy !== null}
                        onClick={() => void purchase(s.id)}
                      >
                        {busy === s.id ? "Opening payment…" : `Unlock Stage ${s.number}`}
                      </Button>
                    </>
                  )}
                </StageCard>
              );
            })}
          </StageGrid>

          {bundle !== null && owned.length === 0 && (
            <Card $highlight style={{ marginTop: 16 }}>
              <Eyebrow>Best value</Eyebrow>
              <h3 style={{ fontSize: "1.35rem", marginBottom: 8 }}>Full path: all 3 stages</h3>
              <Muted>Everything from Foundation to Mastery, including trainer certification.</Muted>
              <Price style={{ margin: "14px 0" }}>
                {formatInr(bundle)}{" "}
                {allPriced && stagesTotal > bundle && (
                  <small>
                    save {formatInr(stagesTotal - bundle)} vs {formatInr(stagesTotal)}
                  </small>
                )}
              </Price>
              <Button $primary $block disabled={busy !== null} onClick={() => void purchase("bundle")}>
                {busy === "bundle" ? "Opening payment…" : "Unlock all 3 stages"}
              </Button>
            </Card>
          )}

          <Muted style={{ marginTop: 18, fontSize: "0.85rem" }}>
            Secure payment by Razorpay: UPI, cards or netbanking. Lifetime access to the stages you unlock.
          </Muted>
        </Container>
      </PageSection>

      <PageSection>
        <Container style={{ maxWidth: 760 }}>
          <Eyebrow>Curriculum</Eyebrow>
          <H2>
            What's <span>inside</span>
          </H2>
          <Lead style={{ marginBottom: 24 }}>
            Short video lessons you can watch on your phone. New lessons are added as they're released.
          </Lead>
          <Curriculum owned={owned} />
        </Container>
      </PageSection>

      <PageSection $alt>
        <Container style={{ maxWidth: 760 }}>
          <Eyebrow>Your coach</Eyebrow>
          <H2>{business.founder.name}</H2>
          <Lead>
            Several-time national calisthenics champion who has represented India 3 times, judges
            competitions across India, and has coached calisthenics for 10 years.{" "}
            <Link to="/aman-bisht">More about Aman</Link>
          </Lead>
        </Container>
      </PageSection>

      <PageSection>
        <Container style={{ maxWidth: 760 }}>
          <Eyebrow>FAQ</Eyebrow>
          <H2>
            Common <span>questions</span>
          </H2>
          <FaqList faqs={courseFaqs} />
        </Container>
      </PageSection>
    </>
  );
};
