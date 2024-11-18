type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="m20.8 1l-5.6 16.2l-5-13.2H7l7 18.6V31h3v-9.9L24 1z"
    />
  </svg>
);

export default Icon;
