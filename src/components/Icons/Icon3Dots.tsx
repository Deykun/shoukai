type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m15 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m-7.274 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5"
    />
  </svg>
);

export default Icon;
