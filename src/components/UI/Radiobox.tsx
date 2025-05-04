import clsx from "clsx";

import IconRadioboxFrame from "@/components/Icons/IconRadioboxFrame";

import Checkbox from "./Checkbox";

type Props = React.ComponentProps<typeof Checkbox>;

const Radiobox = (props: Props) => {
  return (
    <Checkbox
      {...props}
      className={clsx(props.className, "!rounded-full")}
      frameIcon={IconRadioboxFrame}
    />
  );
};

export default Radiobox;
