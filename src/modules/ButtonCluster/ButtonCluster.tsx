import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
// expects an enum of values, a state that needs to be changed, a behavior for when the button is clicked, and a description for the aria-label
interface ButtonClusterProps<T extends string> {
  options: Record<string, T>;
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export function ButtonCluster<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: ButtonClusterProps<T>) {
  const optionValues = Object.values(options) as T[]; // Convert to array once
  const [focusedIndex, setFocusedIndex] = useState(optionValues.indexOf(value));
  const buttonRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>(
    [],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let newIndex = focusedIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (focusedIndex + 1) % optionValues.length;
      setFocusedIndex(newIndex);
      buttonRefs.current[newIndex]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (focusedIndex - 1 + optionValues.length) % optionValues.length;
      setFocusedIndex(newIndex);
      buttonRefs.current[newIndex]?.focus();
    } else if (e.key === ' ' || e.key === 'Enter') {
      onChange(optionValues[newIndex]);
    }
  };

  return (
    <ButtonsContainer
      role="radiogroup"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {optionValues.map((option, index) => (
        <Button
          key={option}
          aria-checked={value === option}
          color={value === option ? 'primary' : 'grey'}
          onClick={() => onChange(option)}
          onFocus={() => setFocusedIndex(index)}
          role="radio"
          variant={focusedIndex === index ? 'primary' : 'grey'}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          tabIndex={value === option ? 0 : -1}
        >
          {option}
        </Button>
      ))}
    </ButtonsContainer>
  );
}
