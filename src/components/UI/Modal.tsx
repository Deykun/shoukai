import ReactDOM from "react-dom";
import clsx from "clsx";
import IconClose from "@/components/Icons/IconClose";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div>
      <button
        // className={clsx(
        //   "absolute h-full w-full z-[2] text-[0] left-0 top-0",
        //   "text-transparent bg-[#efe7788c] opacity-100",
        //   "backdrop-blur-[3px] backdrop-saturate-[0.5]",
        // )}
        onClick={onClose}
        type="button"
      >
        {/* {t("common.close")} */}
      </button>
      <div className={clsx(
        "fixed w-[min(500px,80vw)] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 z-[10]",
        "bg-[#f5f9ef] rounded-md overflow-auto no-scrollbar p-4",
        // "shadow-lg"
        "border-4 border-body shadow-md"
      )}>
        <button className="modal-close" onClick={onClose} type="button">
          <IconClose />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("root-modal") as HTMLElement
  );
};

export default Modal;
