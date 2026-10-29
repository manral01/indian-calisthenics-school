// Shared building blocks for the inner pages.
import { Fragment, type ImgHTMLAttributes } from "react";
import styled from "styled-components";
import { ChevronRight, Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { Link } from "../router";
import {
  business,
  phoneDisplay,
  whatsappLink,
} from "../data/business";
import type { SiteImage } from "../data/images";
import type { FAQItem } from "../data/faq";
import type { Crumb } from "../seo/routes";

// ─── Layout ──────────────────────────────────────────────────────────────────
export const Container = styled.div`
  width: min(100% - 32px, 1120px);
  margin: 0 auto;
`;

export const PageSection = styled.section<{ $alt?: boolean }>`
  padding: 56px 0;
  background: ${({ $alt }) => ($alt ? "#0F0F0F" : "transparent")};
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 0;
  }
`;

export const Eyebrow = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 14px;
`;

export const H2 = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  margin-bottom: 18px;
`;

export const Lead = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
  line-height: 1.75;
  & + & {
    margin-top: 14px;
  }
`;

// ─── Image ───────────────────────────────────────────────────────────────────
type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  image: SiteImage;
  /** true for above-the-fold images */
  priority?: boolean;
};

export const Img = ({ image, priority, sizes = "100vw", ...rest }: ImgProps) => (
  <img
    src={image.src}
    srcSet={image.srcSet}
    sizes={image.srcSet ? sizes : undefined}
    width={image.width}
    height={image.height}
    alt={image.alt}
    loading={priority ? "eager" : "lazy"}
    decoding={priority ? "sync" : "async"}
    {...(priority && { fetchPriority: "high" as const })}
    {...rest}
  />
);

// ─── Rich text: supports [label](/path) internal links ──────────────────────
export const RichText = ({ text }: { text: string }) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} to={m[2]}>
            {m[1]}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
};

// ─── Breadcrumbs (visible, matches BreadcrumbList schema) ───────────────────
const CrumbNav = styled.nav`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 22px;
  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  [aria-current] {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

export const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => (
  <CrumbNav aria-label="Breadcrumb">
    <ol>
      {crumbs.map((c, i) => (
        <li key={c.path}>
          {i > 0 && <ChevronRight size={13} aria-hidden="true" />}
          {i === crumbs.length - 1 ? (
            <span aria-current="page">{c.name}</span>
          ) : (
            <Link to={c.path}>{c.name}</Link>
          )}
        </li>
      ))}
    </ol>
  </CrumbNav>
);

// ─── Page header: breadcrumbs + H1 + intro + photo ──────────────────────────
const HeaderGrid = styled.div`
  display: grid;
  gap: 32px;
  align-items: center;
  padding: 112px 0 48px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    padding: 140px 0 72px;
  }
`;

const H1 = styled.h1`
  font-size: clamp(2.1rem, 5.4vw, 3.6rem);
  font-weight: 700;
  margin-bottom: 20px;
`;

const HeaderImage = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  aspect-ratio: 4 / 5;
  max-height: 520px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PageHeader = ({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro: string[];
  image?: SiteImage;
  children?: React.ReactNode;
}) => (
  <Container>
    <HeaderGrid>
      <div>
        <Breadcrumbs crumbs={crumbs} />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <H1>{title}</H1>
        {intro.map((p) => (
          <Lead key={p}>{p}</Lead>
        ))}
        {children}
      </div>
      {image && (
        <HeaderImage>
          <Img image={image} priority sizes="(min-width: 768px) 45vw, 100vw" />
        </HeaderImage>
      )}
    </HeaderGrid>
  </Container>
);

// ─── Contact buttons ────────────────────────────────────────────────────────
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

export const ButtonLink = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.88rem;
  font-weight: 700;
  transition: transform 0.2s, border-color 0.2s;
  background: ${({ $primary, theme }) => ($primary ? theme.gradients.fire : "transparent")};
  color: ${({ $primary, theme }) => ($primary ? theme.colors.onAccent : theme.colors.ink)};
  border: 1px solid ${({ $primary, theme }) => ($primary ? "transparent" : theme.colors.border)};
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

/** WhatsApp / Call / Email, skipping phone-based buttons until a number is set. */
export const ContactActions = ({ whatsappText }: { whatsappText?: string }) => {
  const wa = whatsappLink(whatsappText);
  return (
    <Actions>
      {wa && (
        <ButtonLink $primary href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> WhatsApp us
        </ButtonLink>
      )}
      {business.phone && (
        <ButtonLink href={`tel:${business.phone}`}>
          <Phone size={18} /> Call {phoneDisplay}
        </ButtonLink>
      )}
      <ButtonLink $primary={!wa} href={`mailto:${business.email}`}>
        <Mail size={18} /> Email us
      </ButtonLink>
    </Actions>
  );
};

// ─── FAQ list (native <details>: answers are in the HTML for crawlers) ──────
const Faq = styled.details`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: 10px;
  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    font-weight: 700;
    min-height: 48px;
    &::-webkit-details-marker {
      display: none;
    }
    svg {
      flex: none;
      color: ${({ theme }) => theme.colors.accent};
      transition: transform 0.2s;
    }
  }
  &[open] summary svg {
    transform: rotate(45deg);
  }
  p {
    padding: 0 20px 20px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.7;
  }
`;

export const FaqList = ({ faqs }: { faqs: FAQItem[] }) => (
  <div>
    {faqs.map((f) => (
      <Faq key={f.question}>
        <summary>
          {f.question}
          <Plus size={18} aria-hidden="true" />
        </summary>
        <p>{f.answer}</p>
      </Faq>
    ))}
  </div>
);

// ─── Bullet list with accent markers ────────────────────────────────────────
export const Bullets = styled.ul`
  display: grid;
  gap: 12px;
  li {
    position: relative;
    padding-left: 22px;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.65;
  }
  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;
