type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M14 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v5" />
      <path d="M11 16H6a2 2 0 0 0-2 2m11-2 3-3 3 3m-3-3v9" />
    </g>
  </svg>
);

export default Icon;
