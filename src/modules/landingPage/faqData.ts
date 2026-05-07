export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is Mocha free to use?',
    answer:
      'Yes. The core cross-server chat features are free. Premium plans add higher room limits, advanced moderation tools, and priority support — check the Pricing page for details.',
  },
  {
    question: 'Do I need to move my community to a new server?',
    answer:
      'No. Mocha bridges channels in your existing server. Your members stay where they are — only the messages travel across the room.',
  },
  {
    question: 'Who can join a room?',
    answer:
      'Any Discord server admin who has invited Mocha can join a public room using the room ID. Room owners can also restrict joining to keep the room private.',
  },
  {
    question: 'Can one server join multiple rooms?',
    answer:
      'Yes. Each channel joins independently. You can link #gaming to a game room, #study to a study room, and #events to an event room — all from the same server.',
  },
  {
    question: 'What happens to my messages — are they stored?',
    answer:
      'Mocha relays messages in real time between connected channels. Review the Privacy Policy for full details on data handling and retention.',
  },
  {
    question: 'Can I control who can send messages in the room?',
    answer:
      'Room owners can prohibit @everyone and @here mentions, set slow mode, and manage which servers remain connected. Per-user moderation follows each server\'s own Discord permissions.',
  },
  {
    question: 'What if I want to leave a room?',
    answer:
      'Run /room leave in the linked channel. The channel is unlinked instantly and no further messages are relayed in either direction.',
  },
];
