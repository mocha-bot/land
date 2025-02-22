import { useState } from 'react';

import type { Tag } from '@/modules/tag/tagEntity';

import { RoomJoinedCountFilter } from './filters/RoomJoinedCountFilter';
// import { RoomLanguageFilter } from './filters/RoomLanguageFilter';
import { RoomRatingFilter } from './filters/RoomRatingFilter';
import { RoomTagFilter } from './filters/RoomTagFilter';

export type Filter = {
  language: string;
  rating?: number;
  roomJoinedCount: string;
  channelJoinMin?: number;
  channelJoinMax?: number;
  tags: Tag[];
};

export const DEFAULT_FILTER: Filter = {
  language: 'all',
  rating: undefined,
  roomJoinedCount: 'all',
  channelJoinMin: undefined,
  channelJoinMax: undefined,
  tags: [],
};

type Props = {
  onFilterChange: (filter: Filter) => void;
  value?: Filter;
};

export function RoomSearchFilterContainer(props: Props) {
  const [filter, setFilter] = useState<Filter>(props.value || DEFAULT_FILTER);

  const handleChangeFilter = (newFilter: Partial<Filter>) => {
    const updatedFilter = {
      ...filter,
      ...newFilter,
    };
    setFilter(updatedFilter);
    props.onFilterChange(updatedFilter);
  };

  return (
    <>
      {/* TODO: enable this when the language is ready in BE */}
      {/* <RoomLanguageFilter
        value={filter.language}
        onChange={(value) => handleChangeFilter({ language: value })}
        onReset={() =>
          handleChangeFilter({ language: DEFAULT_FILTER.language })
        }
      /> */}
      <RoomRatingFilter
        value={filter.rating}
        onChange={(value) => handleChangeFilter({ rating: value })}
        onReset={() => handleChangeFilter({ rating: DEFAULT_FILTER.rating })}
      />
      <RoomJoinedCountFilter
        value={filter.roomJoinedCount}
        onChange={(value) =>
          handleChangeFilter({
            roomJoinedCount: value?.value,
            channelJoinMax: value?.data?.max,
            channelJoinMin: value?.data?.min,
          })
        }
      />
      <RoomTagFilter
        value={filter.tags}
        onChange={(value) => handleChangeFilter({ tags: value })}
        onReset={() => handleChangeFilter({ tags: DEFAULT_FILTER.tags })}
      />
    </>
  );
}
