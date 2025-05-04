type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <g fill="none" stroke="currentColor">
      <path
        strokeLinejoin="round"
        strokeWidth="4.302"
        d="M44.782 24.17 31.918 7.1 14.135 20.5 27.5 37l3.356-2.336z"
      />
      <path
        strokeLinejoin="round"
        strokeWidth="4.302"
        d="m27.5 37-3.839 3.075-10.563-.001-2.6-3.45-6.433-8.536L14.5 20.225"
      />
      <path
        strokeLinecap="round"
        strokeWidth="4.5"
        d="M13.206 40.072h31.36"
      />
    </g>
  </svg>
);

export default Icon;
