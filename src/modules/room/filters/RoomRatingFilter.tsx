import { Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  FaStar as FilledStarIcon,
  FaRegStar as OutlineStarIcon,
} from 'react-icons/fa';

type Props = {
  value?: number;
  onChange: (value: number) => void;
  onReset: () => void;
};

export function RoomRatingFilter({ onChange, onReset, value }: Props) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (rating: number) => {
    onChange(rating);
  };

  return (
    <Flex flexDir='column' gap={1} w='full'>
      <Flex flexDir='row' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight={700}>
          Room Rating
        </Text>
        <Text fontSize='12px' color='white' cursor='pointer' onClick={onReset}>
          Reset Filter
        </Text>
      </Flex>
      <Flex flexDir='row' gap={3}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            as={
              star <= (hoveredRating || value || 0)
                ? FilledStarIcon
                : OutlineStarIcon
            }
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            cursor='pointer'
          />
        ))}
      </Flex>
    </Flex>
  );
}
