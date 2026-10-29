import { useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import { business } from "../data/business";
import { images } from "../data/images";
import { Link, useRouter } from "../router";

export const NAV_LINKS: [label: string, path: string][] = [
  ["Calisthenics", "/training/calisthenics"],
  ["Kids", "/training/kids"],
  ["Personal Training", "/training/personal-training"],
  ["Freestyle & Parkour", "/training/freestyle-parkour"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const Header = styled.header`
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  pointer-events: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 16px;
    left: 16px;
    right: 16px;
  }
`;
const Pill = styled.div`
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(10, 10, 10, 0.78);
  backdrop-filter: blur(16px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.45);
`;
const Brand = styled(Link)`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 7px 16px 7px 7px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(10, 10, 10, 0.78);
  backdrop-filter: blur(16px);
  color: white;
  img {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(255, 106, 0, 0.5);
  }
`;
const Name = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
  }
`;
const DesktopLinks = styled(Pill).attrs({ as: "nav" })`
  display: none;
  align-items: center;
  gap: 2px;
  padding: 5px;
  a {
    padding: 9px 12px;
    border-radius: ${({ theme }) => theme.radius.pill};
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.78);
    white-space: nowrap;
    &:hover,
    &[aria-current="page"] {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  @media (min-width: 1100px) {
    display: flex;
  }
`;
const MenuButton = styled.button`
  pointer-events: auto;
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 10, 0.78);
  backdrop-filter: blur(16px);
  @media (min-width: 1100px) {
    display: none;
  }
`;
const MobilePanel = styled.nav`
  position: fixed;
  top: 72px;
  left: 12px;
  right: 12px;
  z-index: 99;
  display: grid;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 10, 10, 0.96);
  backdrop-filter: blur(16px);
  a {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-weight: 600;
    &[aria-current="page"],
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      background: rgba(255, 255, 255, 0.04);
    }
  }
  @media (min-width: 1100px) {
    display: none;
  }
`;

export const Navbar = () => {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const current = (to: string) => (path === to ? ("page" as const) : undefined);

  return (
    <>
      <Header>
        <Brand to="/" aria-label={`${business.name}, home`}>
          <img
            src={images.logo.src}
            width={images.logo.width}
            height={images.logo.height}
            alt=""
          />
          <Name>{business.name}</Name>
        </Brand>
        <DesktopLinks aria-label="Main">
          {NAV_LINKS.map(([label, to]) => (
            <Link key={to} to={to} aria-current={current(to)}>
              {label}
            </Link>
          ))}
        </DesktopLinks>
        <MenuButton
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </MenuButton>
      </Header>
      {open && (
        <MobilePanel id="mobile-menu" aria-label="Main">
          <Link to="/" aria-current={current("/")} onClick={() => setOpen(false)}>
            Home
          </Link>
          {NAV_LINKS.map(([label, to]) => (
            <Link key={to} to={to} aria-current={current(to)} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </MobilePanel>
      )}
    </>
  );
};
