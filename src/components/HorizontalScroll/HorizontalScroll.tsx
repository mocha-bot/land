/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
import { HStack, VStack } from '@chakra-ui/react';
import type { MouseEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';

type HorizontalScrollProps = {
  items: ReactNode[];
};

function HorizontalScroll({ items }: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll fast
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <VStack align='flex-start' w='full'>
      <HStack
        spacing={4}
        overflowX='auto'
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        css={{
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}
        className='hide-scrollbar'
        w='full'
        style={{ whiteSpace: 'normal' }}>
        {items.map((item, index) => (
          <div
            key={`item-${index}`}
            style={{
              minWidth: '90%',
              display: 'inline-block',
            }}>
            {item}
          </div>
        ))}
      </HStack>
    </VStack>
  );
}

export { HorizontalScroll };
