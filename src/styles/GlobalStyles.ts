import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: ${({ theme }) => theme.colors.background}; color: ${({ theme }) => theme.colors.ink}; font-family: ${({ theme }) => theme.typography.fontFamily}; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  h1,h2,h3,p { margin: 0; } h1,h2,h3 { line-height: 1.03; letter-spacing: -.045em; } a { color: inherit; text-decoration: none; } button { font: inherit; cursor: pointer; border: 0; } img { display:block; max-width:100%; } ul { list-style:none; padding:0; margin:0; }
  ::selection { background: #FF6A00; color: #ffffff; }
`;
