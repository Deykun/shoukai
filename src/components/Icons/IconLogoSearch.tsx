import IconLogo from "./IconLogo";

type Props = {
  engine: string;
  className?: string;
};

const Icon = ({ engine, className }: Props) => {
  return (
    <IconLogo
      className={className}
      id={engine === "default" ? "google" : (engine as string)}
    />
  );
};

export default Icon;
