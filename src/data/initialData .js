const initialData = {
  todo: {
    name: 'To-do',
    tasks: [
      {
        id: 'task-1',
        title: 'Redesign login page',
        description: 'Make the login form more user-friendly with better spacing.',
        date: '24 Jun 2025',
        image: 'https://picsum.photos/300/150?random=1',
        tags: [],
      },
      {
        id: 'task-2',
        title: 'Write welcome email',
        description: 'Draft a warm, engaging welcome email for new users.',
        date: '23 Jun 2025',
        image: 'https://picsum.photos/300/150?random=2',
        tags: [],
      },
    ],
  },
  inProgress: {
    name: 'In-progress',
    tasks: [
      {
        id: 'task-3',
        title: 'Update dashboard icons',
        description: 'Switch to brand-aligned icon set in the main dashboard.',
        date: '22 Jun 2025',
        image: 'https://picsum.photos/300/150?random=3',
        tags: [],
      },
    ],
  },
  done: {
    name: 'Done',
    tasks: [
      {
        id: 'task-4',
        title: 'Launch landing page',
        description: 'Finalized and deployed the product landing page.',
        date: '20 Jun 2025',
        image: 'https://picsum.photos/300/150?random=4',
        tags: [],
      },
    ],
  },
};

export default initialData;
