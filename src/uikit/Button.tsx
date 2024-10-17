import type {
  ButtonProps as BaseButtonProps,
  ChakraComponent,
  CSSWithMultiValues,
} from '@chakra-ui/react';
import { Button as BaseButton, useStyleConfig } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

const maxDegree = 90;

type ButtonComponent = ChakraComponent<'button', ButtonProps>;

interface ButtonProps extends BaseButtonProps {
  children: ReactNode;
  isAnimated?: boolean;
}

function Button({ children, isAnimated, ...rest }: ButtonProps) {
  const [degree, setDegree] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const styles = useStyleConfig('Button', { variant: rest.variant }) as {
    _hover: CSSWithMultiValues;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (buttonRef.current === null || !isAnimated) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const x = e.clientX - buttonCenterX;
    const y = e.clientY - buttonCenterY;

    // this math calc is to reduce the calculation
    // since we know that mouse can be outside the button (object)
    const isOutside = Math.sqrt(x * x + y * y) > rect.width / 2;

    if (isOutside) {
      return;
    }

    const newDeg = Math.atan2(y, x) * (180 / Math.PI) * -1 + 90;

    if (newDeg <= -maxDegree || newDeg >= maxDegree) {
      return;
    }

    setDegree((prev) => prev + (newDeg - prev) * 0.1);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isAnimated) {
    const deg = degree * -1;
    styles._hover.bgGradient = `linear(${deg}deg, rgba(253, 184, 51, 1), rgba(2, 173, 255, 1), rgba(1, 1, 1, 0.25))`;
  }

  return (
    <BaseButton
      ref={buttonRef}
      __css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...styles,
      }}
      {...rest}>
      {children}
    </BaseButton>
  );
}

export default Button as ButtonComponent;
