import { useParticipants, IconButton, Space, ParticipantsList, useTheme, useBlur, Button, Modal } from '@dolbyio/comms-uikit-react';
import useDrawer from '@hooks/useDrawer';
import { DrawerFooter, DrawerMainContent, DrawerHeader } from '@src/components/SideDrawer';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './Participants.module.scss';
import ModalContentBase from '@src/components/ModalContentBase';
import * as expMetrics from '../../../../utils/expMetrics';

var selectedParticipantName: String;

const handleChange = (event: any) => {
  selectedParticipantName = event.target.value;
}

const handleSubmit = (event: any) => {
  expMetrics.awardExp(selectedParticipantName, 1);
}

const Participants = () => {
  const intl = useIntl();
  const { closeDrawer } = useDrawer();
  const { participants } = useParticipants();
  const { isDesktop, isMobile, isMobileSmall } = useTheme();
  const { isSupported } = useBlur();

  const isSmartphone = isMobile || isMobileSmall;

  const [isModalVisible, setModalVisible] = useState(false);
  const handleClose = () => setModalVisible(false);
  const handleOpen = () => setModalVisible(true);

  return (
    <Space fw fh testID="Participants" className={styles.contentContainer}>
      <DrawerHeader
        title={`Participants (${participants.length})`}
        color="grey.100"
        borderColor="transparent"
        height={isSmartphone ? 48 : 110}
        closeButtonBackgroundColor="grey.500"
        closeButtonOutsideColor="grey.800"
        closeButtonIconColor="white"
        closeButtonStrokeColor="transparent"
        mobileCloseButtonColor="white"
      />
      <DrawerMainContent>
        <ParticipantsList
          localText={intl.formatMessage({ id: 'you' })}
          muteText={intl.formatMessage({ id: 'mute' })}
          unmuteText={intl.formatMessage({ id: 'unmute' })}
          soundOnText={intl.formatMessage({ id: 'soundOn' })}
          soundOffText={intl.formatMessage({ id: 'soundOff' })}
        />
      </DrawerMainContent>
      <Button variant="secondary" onClick={handleOpen}>
        Award Point
      </Button>
      <Modal testID={'AwardParticipantsModal'} isVisible={isModalVisible} close={handleClose} closeButton>
        <ModalContentBase
          headline={intl.formatMessage({ id: 'Award a participation point to: '})}
        />
        <form>
          <input type="text" id="participantName" onChange={handleChange}></input>
        </form>
        <Button variant="secondary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal>
      {isDesktop && (
        <DrawerFooter>
          <Space fw fh className={styles.footerContainer}>
            <Space mh="m" mr="m" className={styles.buttonsSection}>
              {isSupported && (
                <>
                  <IconButton
                    testID="MockBlurButton"
                    backgroundColor="transparent"
                    icon="backgroundBlur"
                    iconColor="grey.300"
                    disabled
                  />
                  <Space className={styles.spacer} />
                </>
              )}
              <IconButton
                testID="CloseParticipantsDrawerButton"
                badge
                backgroundColor="transparent"
                badgeColor="primary.300"
                icon="participants"
                onClick={closeDrawer}
              />
              <Space className={styles.spacer} />
              <IconButton
                testID="MockSettingsButton"
                backgroundColor="transparent"
                icon="settings"
                iconColor="grey.300"
                disabled
              />
            </Space>
          </Space>
        </DrawerFooter>
      )}
    </Space>
  );
};

export default Participants;
