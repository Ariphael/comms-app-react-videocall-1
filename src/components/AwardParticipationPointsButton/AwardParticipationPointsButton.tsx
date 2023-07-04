import { Button } from "@dolbyio/comms-uikit-react";

const ParticipantStatisticsButton = () => {
  const handleClick = () => {
    alert("test");
  }
  return (
    <Button variant="secondary" onClick={handleClick}>
      Award
    </Button>
  );
}

export default ParticipantStatisticsButton;