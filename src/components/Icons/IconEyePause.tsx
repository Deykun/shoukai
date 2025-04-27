type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M13.022 17.945A9 9 0 0 1 12 18q-5.4 0-9-6 3.6-6 9-6t9 6q-.293.487-.596.935M17 17v5m4-5v5" />
    </g>
  </svg>
);

export default Icon;
