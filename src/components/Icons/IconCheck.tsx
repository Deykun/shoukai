type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M9.53 3.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 0 1 1.06-1.06l.97.97 3.97-3.97a.75.75 0 0 1 1.06 0"
      clip-rule="evenodd"
    />
  </svg>
);

export default Icon;
