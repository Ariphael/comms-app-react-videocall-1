import { Modal, Spinner } from "@dolbyio/comms-uikit-react";
import ModalContentBase from "../ModalContentBase";
import { useIntl } from 'react-intl';
import './ParticipationPointsModal.css';
import * as expMetrics from '../../utils/expMetrics';

type ParticipantPointsModalProps = {
  testID?: string;
  isOpen: boolean;
  closeModal: () => void;
};

const ParticipantPointsModal = ({
  testID = 'ParticipantPointsModal',
  isOpen,
  closeModal,
}: ParticipantPointsModalProps) => {
  const intl = useIntl();
  const participantNamesInOrder = expMetrics.getListOfNamesInAscendingRankOrder();
  
  const ranks = participantNamesInOrder.map(name => 
    <tr>
      <td>{participantNamesInOrder.findIndex((participantName) => name === participantName) + 1}</td>
      <td>{name}</td>
      <td>{expMetrics.getExpMetric(name).toString()}</td>
    </tr>
  );

  return (
    <Modal testID={testID} isVisible={isOpen} close={closeModal} closeButton>
      <ModalContentBase
        headline={intl.formatMessage({ id: 'Leaderboard'})}
      />
      <div className="LeaderboardTable">
        <table>
          <tr>
            <th>rank</th>
            <th>name</th>
            <th>exp</th>
          </tr>
          {ranks}
        </table>
      </div>
    </Modal>
  );
}

export default ParticipantPointsModal;