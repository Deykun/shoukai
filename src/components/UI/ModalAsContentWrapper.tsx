type Props = {
  children: React.ReactNode;
};

const ModalAsContentWrapper = ({ children }: Props) => {
  return (
    <div className="grid">
      <div className="col-start-1 row-start-1">{children}</div>
      <div className="col-start-1 row-start-1 bg-body z-1">
        dssd
      </div>
    </div>
  );
};

export default ModalAsContentWrapper;
