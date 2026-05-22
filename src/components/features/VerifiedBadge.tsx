interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VerifiedBadge({ size = 'md', className = '' }: VerifiedBadgeProps) {
  const sizeMap = {
    sm: 14,
    md: 18,
    lg: 20,
  };

  const px = sizeMap[size];

  return (
    <span className={`inline-flex items-center ${className}`} title="Verified profile">
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verified profile"
      >
        <path
          d="M12 2L14.09 4.09L17 3L17.59 5.91L20.5 6.5L19.91 9.41L22 11.5L19.91 13.59L20.5 16.5L17.59 17.09L17 20L14.09 18.91L12 21L9.91 18.91L7 20L6.41 17.09L3.5 16.5L4.09 13.59L2 11.5L4.09 9.41L3.5 6.5L6.41 5.91L7 3L9.91 4.09L12 2Z"
          fill="#0095F6"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
