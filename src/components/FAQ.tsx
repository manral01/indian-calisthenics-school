import styled from "styled-components";
import { faqData } from "../data/faq";
import { FaqList } from "./ui";

const Section = styled.section`
  padding: 56px 16px;
  background: transparent;
`;
const Wrap = styled.div`
  max-width: 800px;
  margin: auto;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;
const Tag = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.16em;
  margin-bottom: 12px;
`;
const H = styled.h2`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: white;
`;

// Text must stay identical to the FAQPage schema; both read faqData.
export const FAQ = () => (
  <Section id="faq">
    <Wrap>
      <Head>
        <Tag>HELPFUL DETAILS</Tag>
        <H>Frequently asked questions</H>
      </Head>
      <FaqList faqs={faqData} />
    </Wrap>
  </Section>
);
