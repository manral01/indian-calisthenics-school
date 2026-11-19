// /learn: student dashboard, and /learn?l=<lessonId>: lesson player.
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight, Check, Lock, LogOut } from "lucide-react";
import { Container, Eyebrow, PageSection } from "../components/ui";
import { Link, useRouter } from "../router";
import { COURSE, allLessons, lessonById, stages, type Stage } from "../data/course";
import { whatsappLink } from "../data/business";
import {
  fetchMyProgress,
  fetchMyStages,
  lmsApi,
  setLessonDone,
  signOut,
  useSession,
} from "../lms/session";
import {
  Button,
  ButtonA,
  ButtonTo,
  Card,
  Curriculum,
  ErrorText,
  Muted,
  ProgressBar,
  lessonAccess,
} from "../lms/ui";

const Top = styled.div`
  padding-top: 96px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 128px;
  }
`;

const H1 = styled.h1`
  font-size: clamp(1.6rem, 6vw, 2.4rem);
  margin-bottom: 8px;
`;

const Layout = styled.div`
  display: grid;
  gap: 28px;
  padding-bottom: 48px;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr) 360px;
    align-items: start;
  }
`;

const StageGrid = styled.div`
  display: grid;
  gap: 14px;
  margin: 24px 0 36px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Player = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: #000;
  border: 1px solid ${({ theme }) => theme.colors.border};
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.muted};
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 14px;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Banner = styled(Card)`
  border-color: ${({ theme }) => theme.colors.accent};
  margin: 18px 0 0;
`;

// Lessons in course order, for Previous / Next
const ordered = allLessons;

const stageOf = (id: Stage["id"]) => stages.find((s) => s.id === id)!;

export const LearnPage = () => {
  const { search, navigate } = useRouter();
  const session = useSession();
  const params = new URLSearchParams(search);
  const lessonId = params.get("l");
  const lesson = lessonId ? lessonById(lessonId) : undefined;

  const [owned, setOwned] = useState<string[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    let live = true;
    Promise.all([fetchMyStages(), fetchMyProgress()]).then(
      ([s, p]) => {
        if (!live) return;
        setOwned(s);
        setDone(p);
        setLoaded(true);
      },
      (e: Error) => live && setLoadError(e.message),
    );
    return () => {
      live = false;
    };
  }, [userId]);

  // Prerendered HTML + first render: neutral shell (session not known yet)
  if (session === undefined) {
    return (
      <Container>
        <Top aria-busy="true">
          <H1>My Course</H1>
          <Muted>Loading…</Muted>
        </Top>
      </Container>
    );
  }

  const loginHref = `/login?next=${encodeURIComponent(`/learn${search}`)}`;

  // Logged out: free previews still play; everything else asks to log in
  if (!session && !(lesson?.free && lesson.video)) {
    return (
      <PageSection style={{ paddingTop: 120, minHeight: "70vh" }}>
        <Container style={{ maxWidth: 520 }}>
          <Card>
            <Eyebrow>Online course</Eyebrow>
            <H1>Log in to your course</H1>
            <Muted>Use the email you bought the course with.</Muted>
            <Row>
              <ButtonTo $primary to={loginHref}>
                Log in
              </ButtonTo>
              <ButtonTo to={COURSE.path}>About the course</ButtonTo>
            </Row>
          </Card>
        </Container>
      </PageSection>
    );
  }

  return (
    <Container>
      <Top>
        {lessonId ? (
          lesson ? (
            <LessonView
              key={lesson.id}
              lessonId={lesson.id}
              owned={owned}
              done={done}
              loggedIn={Boolean(session)}
              loginHref={loginHref}
              onToggleDone={async (value) => {
                const next = new Set(done);
                if (value) next.add(lesson.id);
                else next.delete(lesson.id);
                setDone(next);
                await setLessonDone(lesson.id, value).catch(() => setDone(done));
              }}
              onGo={(id) => navigate(`/learn?l=${id}`)}
            />
          ) : (
            <>
              <H1>Lesson not found</H1>
              <ButtonTo to="/learn">Back to My Course</ButtonTo>
            </>
          )
        ) : (
          <Dashboard
            email={session!.user.email}
            owned={owned}
            done={done}
            loaded={loaded}
            welcome={params.has("welcome")}
          />
        )}
        {loadError && <ErrorText role="alert">{loadError}</ErrorText>}
      </Top>
    </Container>
  );
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
const Dashboard = ({
  email,
  owned,
  done,
  loaded,
  welcome,
}: {
  email?: string;
  owned: string[];
  done: Set<string>;
  loaded: boolean;
  welcome: boolean;
}) => {
  const continueLesson = useMemo(
    () =>
      ordered.find((l) => owned.includes(l.stage) && l.video && !done.has(l.id)) ??
      ordered.find((l) => l.free && l.video),
    [owned, done],
  );

  return (
    <>
      <Eyebrow>{COURSE.name}</Eyebrow>
      <H1>My Course</H1>
      <Muted>{email}</Muted>

      {welcome && (
        <Banner>
          <strong>Payment successful. Welcome in! 💪</strong>
          <Muted style={{ marginTop: 6 }}>Your stage is unlocked. Start with the first lesson below.</Muted>
        </Banner>
      )}

      {loaded && owned.length === 0 && (
        <Banner>
          <strong>You haven't unlocked a stage yet.</strong>
          <Muted style={{ marginTop: 6 }}>Free preview lessons are open to everyone.</Muted>
          <Row>
            <ButtonTo $primary to={`${COURSE.path}#stages`}>
              See stages
            </ButtonTo>
          </Row>
        </Banner>
      )}

      <StageGrid>
        {stages.map((s) => {
          const available = ordered.filter((l) => l.stage === s.id && l.video);
          const completed = available.filter((l) => done.has(l.id)).length;
          const have = owned.includes(s.id);
          return (
            <Card key={s.id} $highlight={have}>
              <Eyebrow style={{ marginBottom: 6 }}>Stage {s.number}</Eyebrow>
              <h2 style={{ fontSize: "1.2rem", marginBottom: 12 }}>{s.name}</h2>
              {have ? (
                <>
                  <ProgressBar value={available.length ? (completed / available.length) * 100 : 0} />
                  <Muted style={{ fontSize: "0.85rem", marginTop: 8 }}>
                    {completed} of {available.length} lessons done
                  </Muted>
                </>
              ) : (
                <Muted style={{ fontSize: "0.88rem", display: "flex", gap: 6, alignItems: "center" }}>
                  <Lock size={15} /> Locked ·{" "}
                  <Link to={`${COURSE.path}#stages`} style={{ color: "#FF6A00" }}>
                    Unlock
                  </Link>
                </Muted>
              )}
            </Card>
          );
        })}
      </StageGrid>

      {continueLesson && (
        <ButtonTo $primary to={`/learn?l=${continueLesson.id}`} style={{ marginBottom: 32 }}>
          {done.size ? "Continue" : "Start"}: {continueLesson.title} <ArrowRight size={18} />
        </ButtonTo>
      )}

      <div style={{ maxWidth: 760, paddingBottom: 32 }}>
        <Curriculum owned={owned} done={done} />
      </div>

      <Row style={{ paddingBottom: 48 }}>
        {whatsappLink() && (
          <ButtonA href={whatsappLink("Hi, I need help with the online course.")} target="_blank" rel="noopener noreferrer">
            Need help? WhatsApp us
          </ButtonA>
        )}
        <Button onClick={() => void signOut()}>
          <LogOut size={16} /> Log out
        </Button>
      </Row>
    </>
  );
};

// ─── Lesson player ───────────────────────────────────────────────────────────
const LessonView = ({
  lessonId,
  owned,
  done,
  loggedIn,
  loginHref,
  onToggleDone,
  onGo,
}: {
  lessonId: string;
  owned: string[];
  done: Set<string>;
  loggedIn: boolean;
  loginHref: string;
  onToggleDone: (done: boolean) => void;
  onGo: (lessonId: string) => void;
}) => {
  const lesson = lessonById(lessonId)!;
  const stage = stageOf(lesson.stage);
  const access = lessonAccess(lesson, lesson.stage, owned);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (access !== "open") return;
    let live = true;
    lmsApi<{ url: string }>(`video?lesson=${encodeURIComponent(lesson.id)}`).then(
      (r) => live && setUrl(r.url),
      (e: Error) => live && setError(e.message),
    );
    return () => {
      live = false;
    };
  }, [access, lesson.id]);

  const idx = ordered.findIndex((l) => l.id === lesson.id);
  const prev = ordered.slice(0, idx).reverse().find((l) => l.video);
  const next = ordered.slice(idx + 1).find((l) => l.video);
  const isDone = done.has(lesson.id);

  return (
    <Layout>
      <div>
        <Back to="/learn">
          <ArrowLeft size={16} /> All lessons
        </Back>
        <Player>
          {access === "open" && url ? (
            <iframe
              src={url}
              title={lesson.title}
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Center>
              {access === "locked" ? (
                <div>
                  <Lock size={28} style={{ marginBottom: 10 }} />
                  <p style={{ marginBottom: 14 }}>
                    This lesson is part of Stage {stage.number}: {stage.name}.
                  </p>
                  <ButtonTo $primary to={loggedIn ? `${COURSE.path}#stages` : loginHref}>
                    {loggedIn ? `Unlock Stage ${stage.number}` : "Log in"}
                  </ButtonTo>
                </div>
              ) : access === "soon" ? (
                <p>This lesson is coming soon.</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p aria-busy="true">Loading video…</p>
              )}
            </Center>
          )}
        </Player>

        <Eyebrow style={{ marginTop: 20, marginBottom: 6 }}>
          Stage {stage.number} · {lesson.module.title}
        </Eyebrow>
        <H1 style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}>{lesson.title}</H1>

        <Row>
          {loggedIn && access === "open" && (
            <Button $primary={!isDone} onClick={() => onToggleDone(!isDone)}>
              <Check size={18} /> {isDone ? "Completed" : "Mark as complete"}
            </Button>
          )}
          {!loggedIn && (
            <ButtonTo $primary to={COURSE.path}>
              Get the full course
            </ButtonTo>
          )}
        </Row>
        <Row>
          {prev && (
            <Button onClick={() => onGo(prev.id)}>
              <ArrowLeft size={16} /> Previous
            </Button>
          )}
          {next && (
            <Button
              onClick={() => {
                if (loggedIn && access === "open" && !isDone) onToggleDone(true);
                onGo(next.id);
              }}
            >
              Next <ArrowRight size={16} />
            </Button>
          )}
        </Row>
      </div>

      <aside aria-label="Lessons in this stage">
        <Curriculum owned={owned} done={done} current={lesson.id} onlyStage={lesson.stage} />
      </aside>
    </Layout>
  );
};
