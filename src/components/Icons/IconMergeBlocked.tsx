type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.22 1.22a.75.75 0 0 1 1.06 0L3.5 2.44l1.22-1.22a.75.75 0 0 1 1.06 1.06L4.56 3.5l1.22 1.22a.75.75 0 0 1-1.06 1.06L3.5 4.56 2.28 5.78a.75.75 0 0 1-1.06-1.06L2.44 3.5 1.22 2.28a.75.75 0 0 1 0-1.06M7.5 3.5a.75.75 0 0 1 .75-.75h2.25a2.75 2.75 0 0 1 2.75 2.75v4.614a2.501 2.501 0 1 1-1.5 0V5.5c0-.69-.56-1.25-1.25-1.25H8.25a.75.75 0 0 1-.75-.75m5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-8-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0m1.5 0a2.5 2.5 0 1 1-3.25-2.386V7.75a.75.75 0 0 1 1.5 0v2.364A2.5 2.5 0 0 1 6 12.5"
      clipRule="evenodd"
    />
  </svg>
);

export default Icon;
