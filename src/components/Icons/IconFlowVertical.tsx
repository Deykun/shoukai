type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <path d="m2 7 4-4 4 4M6 3v18m-4-4 4 4 4-4" />
    </g>
  </svg>
);

export default Icon;
