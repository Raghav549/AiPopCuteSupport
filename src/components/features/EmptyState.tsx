import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="size-16 rounded-full gradient-yellow-soft flex items-center justify-center mb-4">
        <Icon className="size-8 text-yellow-600" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-[260px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="gradient-yellow text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-cute hover:opacity-90 transition-opacity active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
