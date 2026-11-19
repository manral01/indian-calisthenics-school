// /login: one-time email code or Google. No passwords.
import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { Mail } from "lucide-react";
import { Container, Eyebrow, PageSection } from "../components/ui";
import { useRouter } from "../router";
import {
  googleLoginUrl,
  lmsConfigured,
  sendCode,
  signOut,
  useSession,
  verifyCode,
} from "../lms/session";
import { Button, ButtonTo, Card, ErrorText, Input, Muted } from "../lms/ui";

const H1 = styled.h1`
  font-size: clamp(1.8rem, 6vw, 2.4rem);
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 22px;
`;

const Divider = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8rem;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const LinkButton = styled.button`
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.accent};
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px 0;
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

/** Only allow returning to a page on this site. */
const safeNext = (search: string) => {
  const next = new URLSearchParams(search).get("next") ?? "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/learn";
};

export const LoginPage = () => {
  const { search, navigate } = useRouter();
  const session = useSession();
  const next = safeNext(search);

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const onEmail = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await sendCode(email.trim());
      setStep("code");
      setInfo(`We sent a code to ${email.trim()}. It can take a minute; check spam too.`);
    });
  };

  const onCode = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await verifyCode(email.trim(), code.trim());
      navigate(next);
    });
  };

  return (
    <PageSection style={{ paddingTop: 120, minHeight: "80vh" }}>
      <Container style={{ maxWidth: 460 }}>
        <Card>
          <Eyebrow>Online course</Eyebrow>
          {session ? (
            <>
              <H1>You're logged in</H1>
              <Muted>{session.user.email}</Muted>
              <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
                <ButtonTo $primary $block to={next}>
                  Continue
                </ButtonTo>
                <Button $block onClick={() => void signOut()}>
                  Log out
                </Button>
              </div>
            </>
          ) : session === undefined ? (
            <H1 aria-busy="true">Log in</H1>
          ) : !lmsConfigured ? (
            <>
              <H1>Opening soon</H1>
              <Muted>Online course login will open at launch.</Muted>
            </>
          ) : step === "email" ? (
            <>
              <H1>Log in or sign up</H1>
              <Muted>No password needed. We'll email you a one-time code.</Muted>
              <Form onSubmit={onEmail}>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button $primary $block type="submit" disabled={busy}>
                  <Mail size={18} /> {busy ? "Sending…" : "Email me a code"}
                </Button>
              </Form>
              <Divider>or</Divider>
              <Button $block onClick={() => window.location.assign(googleLoginUrl(next))}>
                <GoogleIcon /> Continue with Google
              </Button>
            </>
          ) : (
            <>
              <H1>Enter your code</H1>
              <Muted>{info}</Muted>
              <Form onSubmit={onCode}>
                <Input
                  required
                  autoFocus
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  pattern="[0-9]{6,10}"
                  maxLength={10}
                  placeholder="6-digit code"
                  aria-label="Login code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  style={{ letterSpacing: "0.3em", textAlign: "center", fontSize: "1.3rem" }}
                />
                <Button $primary $block type="submit" disabled={busy}>
                  {busy ? "Checking…" : "Log in"}
                </Button>
              </Form>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <LinkButton
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setError("");
                  }}
                >
                  Change email
                </LinkButton>
                <LinkButton
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    void run(async () => {
                      await sendCode(email.trim());
                      setInfo(`New code sent to ${email.trim()}.`);
                    })
                  }
                >
                  Resend code
                </LinkButton>
              </div>
            </>
          )}
          {error && <ErrorText role="alert">{error}</ErrorText>}
        </Card>
      </Container>
    </PageSection>
  );
};
