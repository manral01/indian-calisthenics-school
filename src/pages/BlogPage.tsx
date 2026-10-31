import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { blogPosts, type Block, type BlogPost } from "../data/blogPosts";
import { business } from "../data/business";
import { Link } from "../router";
import {
  Breadcrumbs,
  Bullets,
  Container,
  ContactActions,
  Img,
  PageHeader,
  PageSection,
  RichText,
} from "../components/ui";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

// ─── Index ───────────────────────────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  gap: 18px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Card = styled.article`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.2s, transform 0.2s;
  &:hover {
    border-color: rgba(255, 106, 0, 0.4);
    transform: translateY(-4px);
  }
  a {
    display: block;
    height: 100%;
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    height: auto;
    object-fit: cover;
  }
  div {
    padding: 20px;
  }
  h2 {
    font-size: 1.25rem;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.6;
    font-size: 0.92rem;
    margin-bottom: 14px;
  }
  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const BlogPage = () => (
  <>
    <PageHeader
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]}
      eyebrow="Guides"
      title="Calisthenics Blog by Indian Calisthenics School, Hyderabad"
      intro={[
        "Practical guides from our coaches in Madhapur, Hyderabad: how to start, how to train kids safely, and the more dynamic side of calisthenics.",
      ]}
    />
    <PageSection $alt>
      <Container>
        <Grid>
          {blogPosts.map((post) => (
            <Card key={post.slug}>
              <Link to={post.path}>
                <Img image={post.image} sizes="(min-width: 768px) 33vw, 100vw" />
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <span>
                    Read guide <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </Grid>
      </Container>
    </PageSection>
  </>
);

// ─── Post ────────────────────────────────────────────────────────────────────
const Article = styled.article`
  width: min(100% - 32px, 760px);
  margin: 0 auto;
  padding: 112px 0 56px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 140px;
  }
  h1 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    margin-bottom: 16px;
  }
  time {
    display: block;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 0.88rem;
    margin-bottom: 28px;
  }
  figure {
    margin: 0 0 32px;
    img {
      width: 100%;
      height: auto;
      max-height: 480px;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.radius.lg};
    }
  }
  h2 {
    font-size: 1.55rem;
    letter-spacing: -0.02em;
    margin: 36px 0 14px;
  }
  p {
    color: rgba(255, 255, 255, 0.82);
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 16px;
  }
  > p a,
  > ${Bullets} li a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  ${Bullets} {
    margin-bottom: 18px;
  }
`;
const CtaBox = styled.aside`
  margin-top: 40px;
  padding: 26px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid rgba(255, 106, 0, 0.35);
  background: rgba(255, 106, 0, 0.06);
  h2 {
    margin-top: 0 !important;
  }
`;

const renderBlock = (b: Block, i: number) => {
  if ("h2" in b) return <h2 key={i}>{b.h2}</h2>;
  if ("ul" in b)
    return (
      <Bullets key={i}>
        {b.ul.map((li) => (
          <li key={li}>
            <RichText text={li} />
          </li>
        ))}
      </Bullets>
    );
  return (
    <p key={i}>
      <RichText text={b.p} />
    </p>
  );
};

export const BlogPostPage = ({ post }: { post: BlogPost }) => (
  <Article>
    <Breadcrumbs
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: post.path },
      ]}
    />
    <h1>{post.title}</h1>
    <time dateTime={post.dateModified}>
      {business.name} · Updated {formatDate(post.dateModified)}
    </time>
    <figure>
      <Img image={post.image} priority sizes="(min-width: 760px) 760px, 100vw" />
    </figure>
    {post.body.map(renderBlock)}
    <CtaBox>
      <h2>Train with us in Madhapur, Hyderabad</h2>
      <p>
        See <Link to={post.program.path}>{post.program.name}</Link> at {business.name}, near
        Mindspace and HITEC City.
      </p>
      <ContactActions />
    </CtaBox>
  </Article>
);
