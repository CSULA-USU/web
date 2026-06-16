import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors, media } from 'theme';

const NAV_ITEMS = [
  { id: 'alumni-land', label: 'Outcomes' },
  { id: 'team', label: 'Team' },
  { id: 'built-with', label: 'Stack' },
  { id: 'what-we-look-for', label: 'Compass' },
  { id: 'alumni', label: 'Alumni' },
  { id: 'games', label: 'Games' },
];

const Rail = styled.nav<{ visible: boolean }>`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  background: ${Colors.white};
  border-radius: 0 8px 8px 0;
  padding: 16px 16px 16px 12px;
  ${media('desktop')(`display: none;`)}
`;

const RailItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
`;

const RailLine = styled.span<{ active: boolean }>`
  width: ${({ active }) => (active ? '24px' : '12px')};
  height: 2px;
  flex-shrink: 0;
  background: ${({ active }) => (active ? Colors.primary : Colors.black)};
  weight: ${({ active }) => (active ? 400 : 700)};
  transition: width 0.2s, background 0.2s;
`;

const RailLabel = styled.span<{ active: boolean }>`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ active }) => (active ? Colors.primary : Colors.black)};
  transform: translateX(0);
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;

  ${RailItem}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

export function SectionRail() {
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-sentinel');
      if (!hero) return;
      const { bottom } = hero.getBoundingClientRect();
      setVisible(bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Rail visible={visible} aria-label="Page sections">
      {NAV_ITEMS.map(({ id, label }) => (
        <RailItem
          key={id}
          active={activeId === id}
          onClick={() => scrollTo(id)}
          aria-label={`Jump to ${label}`}
        >
          <RailLine active={activeId === id} />
          <RailLabel active={activeId === id}>{label}</RailLabel>
        </RailItem>
      ))}
    </Rail>
  );
}
