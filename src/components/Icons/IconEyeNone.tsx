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
      <path d="M12 18q-5.4 0-9-6 3.6-6 9-6t9 6m-5 7a3 3 0 1 0 6 0 3 3 0 1 0-6 0m1 2 4-4" />
    </g>
  </svg>
);

export default Icon;
