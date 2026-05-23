import { useParams } from 'react-router-dom';

const content: Record<string, string> = {
  profile: 'Manage your creator profile details and showcase links.',
  posts: 'Review and manage all your published posts.',
  studio: 'Open advanced studio workflow for creators.',
  votes: 'Track vote performance and supporter activity.',
  analytics: 'Explore audience growth and engagement insights.',
  supporters: 'Browse top supporters and recent interactions.',
  comments: 'Moderate comments from your community.',
  settings: 'Configure creator-specific account settings.',
};

export default function CreatorSection() {
  const { section = 'analytics' } = useParams();
  return <div className="px-4 py-4"><div className="bg-white rounded-xl p-4 shadow-card"><h2 className="font-bold capitalize mb-2">Creator {section}</h2><p className="text-sm text-muted-foreground">{content[section] ?? 'Section available.'}</p></div></div>;
}
