import ButtonIcon from "@/components/UI/ButtonIcon";

import useLayout from "../hooks/useLayout";
import IconFlowVertical from "@/components/Icons/IconFlowVertical";

const ButtonRefreshLayout = () => {
  const layout = useLayout();

  return (
    <ButtonIcon label="Refresh layout" labelPosition="right" onClick={layout}>
      <IconFlowVertical />
    </ButtonIcon>
  );
};

export default ButtonRefreshLayout;
