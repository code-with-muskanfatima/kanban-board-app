
const initialData = {
  todo: {
    name: 'To-do',
    tasks: [
      {
        id: 'task-1',
        title: 'Redesign login page',
        description: 'Make the login form more user-friendly with better spacing.',
        date: '2025-06-24',
        tags: ['UI']
      },
      {
        id: 'task-2',
        title: 'Write welcome email',
        description: 'Draft a warm, engaging welcome email for new users.',
        date: '2025-06-23',
        tags: ['Content']
      }
    ]
  },
  inProgress: {
    name: 'In-progress',
    tasks: [
      {
        id: 'task-3',
        title: 'Update dashboard icons',
        description: 'Switch to brand-aligned icon set in the main dashboard.',
        date: '2025-06-22',
        tags: ['Design']
      }
    ]
  },
  done: {
    name: 'Done',
    tasks: [
      {
        id: 'task-4',
        title: 'Launch landing page',
        description: 'Finalized and deployed the product landing page.',
        date: '2025-06-20',
        tags: ['Deploy']
      },
      {
  id: 'task-5',
  title: 'Fix login redirect',
  description: 'Users should be redirected to dashboard after login.',
  date: '2025-07-09',
  tags: ['Bug'],
  avatar: 'https://i.pravatar.cc/36?img=5',
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/username' },
    { label: 'GitHub', url: 'https://github.com/username' },
    { label: 'Website', url: 'https://example.com' }
  ]
}

    ]
  },
  
};

export default initialData;
