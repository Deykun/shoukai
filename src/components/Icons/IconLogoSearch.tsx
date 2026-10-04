import IconLogo from "./IconLogo";

type Props = {
  engine: string;
  className?: string;
};

const Icon = ({ engine, className }: Props) => {
  return (
    <IconLogo
      className={className}
      // TODO: add storing of default
      id={engine === "defaultSearch" ? "google" : (engine as string)}
    />
  );
};

export default Icon;
