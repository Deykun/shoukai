type Props = {
  children: React.ReactNode;
};

const NodeTitle = ({ children }: Props) => {
  return <h2 className="text-primary-contrast font-[600]">{children}</h2>;
};

export default NodeTitle;
