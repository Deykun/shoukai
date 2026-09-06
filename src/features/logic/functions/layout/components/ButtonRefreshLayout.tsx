import ButtonIcon from "@/components/UI/ButtonIcon";

import useLayout from "../hooks/useLayout";
import IconFlow from "@/components/Icons/IconFlow";

const ButtonRefreshLayout = () => {
  const layout = useLayout();

  return (
    <ButtonIcon label="Refresh layout" labelPosition="right" onClick={layout}>
      <IconFlow />
    </ButtonIcon>
  );
};

export default ButtonRefreshLayout;
