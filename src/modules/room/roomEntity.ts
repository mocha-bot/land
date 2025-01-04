import { z } from 'zod';

import { ApiMetadataSchema } from '../api/apiEntity';

export const ApiRoomSchema = z.object({
  data: z.array(
    z.object({
      serial: z.string(),
      name: z.string().default(''),
      slug: z.string().default(''),
      description: z.string().default(''),
      tags: z.array(z.string()).default([]),
      total_channel: z.number().default(0),
      rate: z.object({
        rating_count: z.number().default(0),
        average_rating: z.number().default(0),
      }),
      created_by: z.string().default(''),
      created_at: z.string().default(''),
    }),
  ),
  metadata: ApiMetadataSchema.optional(),
});

export type ApiRoom = z.infer<typeof ApiRoomSchema>;

export type Room = {
  serial: string;
  name: string;
  slug: string;
  description: string;
  totalChannel: number;
  tags: string[];
  createdBy: string;
  createdAt: string;
  rate: {
    ratingCount: number;
    averageRating: number;
  };
};

export const DUMMY_ROOM = {
  serial: '1',
  code: 'ROOM-OWVUMGGVR',
  name: 'Mocha',
  description:
    'Mocha is a chat application Lorem ipsum dolor sit amet consectetur. Justo quam imperdiet fermentum cursus vel pellentesque. Quis rhoncus eu nisi elit turpis. In odio felis nisl molestie. Habitant eget ac diam molestie gravida eu vel ipsum. Ut non fermentum tempor quam eu orci id tempor. Quis sed consectetur urna purus scelerisque ultricies ultricies. Eleifend in facilisis ac senectus. Sit id augue ullamcorper arcu quam convallis imperdiet gravida. Nunc mauris velit dictum tortor maecenas vitae. Dictum magnis bibendum habitasse nibh urna at sed. Viverra nunc tincidunt scelerisque nulla ut orci tortor diam quis. Enim etiam pellentesque lectus ipsum in eget ornare volutpat gravida. Semper nisl vivamus egestas sed. Sit adipiscing pellentesque tortor a lectus vulputate vitae.',
  serverJoined: 1000,
  rate: 4.5,
  totalReview: 1000,
  serverBanner: '/assets/images/detail-room-server-banner.png',
  tags: ['chat', 'application'],
  createdAt: '2023-03-01T00:00:00Z',
  language: {
    code: 'en',
    name: 'English',
  },
  serverOwner: {
    name: 'Chroma Hub',
    image: '/assets/images/logo-mocha.png',
    owner: 'Aldiwild#0001',
  },
  servers: [
    {
      image: '/assets/images/logo-mocha.png',
      name: 'Chroma Devs 1',
      owner: 'Aldiwild#0001',
    },
    {
      image: '/assets/images/logo-mocha.png',
      name: 'Chroma Devs 2',
      owner: 'Aldiwild#0001',
    },
    {
      image: '/assets/images/logo-mocha.png',
      name: 'Chroma Devs 3',
      owner: 'Aldiwild#0001',
    },
    {
      image: '/assets/images/logo-mocha.png',
      name: 'Chroma Devs 4',
      owner: 'Aldiwild#0001',
    },
  ],
};
