import { createGlobalStyle } from "styled-components";

// Fonts (Inter + Inter Tight) are loaded via <link> in index.html.
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background:
      radial-gradient(1200px 600px at 85% -10%, rgba(255,106,0,.06), transparent 60%),
      ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }
  h1,h2,h3,p { margin: 0; } a { color: inherit; text-decoration: none; } button { font: inherit; cursor: pointer; border: 0; } img { display:block; max-width:100%; } ul { list-style:none; padding:0; margin:0; }

  /* Bold sans display face for page and section headings */
  h1, h2 {
    font-family: ${({ theme }) => theme.typography.displayFamily};
    line-height: 1.04;
    letter-spacing: -.035em;
    text-wrap: balance;
  }
  h3 { line-height: 1.2; letter-spacing: -.01em; }
  h1 span, h2 span { color: ${({ theme }) => theme.colors.accent}; }
  p { text-wrap: pretty; }

  :focus-visible { outline: 2px solid ${({ theme }) => theme.colors.accent}; outline-offset: 3px; border-radius: 4px; }
  ::selection { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.onAccent}; }
`;
