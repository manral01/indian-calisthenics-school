import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, Menu, X } from "lucide-react";
import { business } from "../data/business";
import { images } from "../data/images";
import { Link, useRouter } from "../router";
import { DemoLink } from "./DemoBooking";

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
  > a,
  > div > button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 9px 14px;
    border-radius: ${({ theme }) => theme.radius.pill};
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    background: none;
    white-space: nowrap;
    &:hover,
    &[aria-current="page"] {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;
const Dropdown = styled.div`
  position: relative;
  svg {
    transition: transform 0.2s;
  }
  &[data-open="true"] button svg {
    transform: rotate(180deg);
  }
`;
const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 230px;
  display: grid;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(14, 14, 14, 0.97);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
  /* hover bridge so the menu doesn't close crossing the gap */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    height: 12px;
  }
  a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    &:hover,
    &[aria-current="page"] {
      color: ${({ theme }) => theme.colors.accent};
      background: rgba(255, 255, 255, 0.04);
    }
  }
`;
const HeaderCta = styled(DemoLink)`
  display: none;
  pointer-events: auto;
  align-items: center;
  min-height: 46px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.fire};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.88rem;
  font-weight: 700;
  white-space: nowrap;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;
const GroupLabel = styled.p`
  padding: 12px 16px 4px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Navbar = () => {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const current = (to: string) => (path === to ? ("page" as const) : undefined);
  const programs = NAV_LINKS.filter(([, to]) => to.startsWith("/training/"));
  const others = NAV_LINKS.filter(([, to]) => !to.startsWith("/training/"));

  // Close menus on navigation (state reset during render, no effect needed)
  const [lastPath, setLastPath] = useState(path);
  if (path !== lastPath) {
    setLastPath(path);
    setOpen(false);
    setProgramsOpen(false);
  }

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
        <Right>
          <DesktopLinks aria-label="Main">
            <Dropdown
              data-open={programsOpen}
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setProgramsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={programsOpen}
                aria-controls="programs-menu"
                aria-current={path.startsWith("/training/") ? "page" : undefined}
                onClick={() => setProgramsOpen((o) => !o)}
              >
                Programs <ChevronDown size={15} aria-hidden="true" />
              </button>
              {programsOpen && (
                <DropdownPanel id="programs-menu">
                  {programs.map(([label, to]) => (
                    <Link key={to} to={to} aria-current={current(to)}>
                      {label}
                    </Link>
                  ))}
                </DropdownPanel>
              )}
            </Dropdown>
            {others.map(([label, to]) => (
              <Link key={to} to={to} aria-current={current(to)}>
                {label}
              </Link>
            ))}
          </DesktopLinks>
          <HeaderCta>Book a demo</HeaderCta>
          <MenuButton
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </MenuButton>
        </Right>
      </Header>
      {open && (
        <MobilePanel id="mobile-menu" aria-label="Main">
          <Link to="/" aria-current={current("/")}>
            Home
          </Link>
          <GroupLabel>PROGRAMS</GroupLabel>
          {programs.map(([label, to]) => (
            <Link key={to} to={to} aria-current={current(to)}>
              {label}
            </Link>
          ))}
          <GroupLabel>MORE</GroupLabel>
          {others.map(([label, to]) => (
            <Link key={to} to={to} aria-current={current(to)}>
              {label}
            </Link>
          ))}
        </MobilePanel>
      )}
    </>
  );
};
