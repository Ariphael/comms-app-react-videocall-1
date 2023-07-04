import { Button, Theme } from "@dolbyio/comms-uikit-react";
import ParticipationPointsModal from "../ParticipationPointsModal/ParticipationPointsModal";
import { Interpolation } from "@emotion/react";
import { ReactNode } from "react";

// const ParticipantStatisticsButton = (props: {onClickFn: (isVisible: boolean, close: () => void) => ReactNode}) => {
//   const onClickFnClone = () => {
//     props.onClickFn(true, () => {});
//   }
//   return (
//     <div>
//       <Button variant="secondary" onClick={onClickFnClone}>
//         Participation
//       </Button>
//     </div>
//   );
// }

const ParticipantStatisticsButton = (prop: {onClickFn: () => void}) => {
  return (
    <div>
      <Button variant="secondary" onClick={prop.onClickFn}>
        Participation
      </Button>
    </div>
  );
}

export default ParticipantStatisticsButton;