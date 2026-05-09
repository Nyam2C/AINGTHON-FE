type CheckCircleIconProps = {
  size?: number;
  className?: string;
};

export function CheckCircleIcon({
  size = 113,
  className,
}: CheckCircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 113 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="56.5" cy="56.5" r="56.5" fill="#3B82F6" />
      <path
        d="M34 58 L50 74 L80 40"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
