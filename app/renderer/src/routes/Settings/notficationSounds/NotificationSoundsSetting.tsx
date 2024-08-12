import { Collapse, Radio } from "components";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import React, { useCallback } from "react";
import { setNotificationSounds } from "store";

import { NotificationSounds } from "store/settings/types";
import {
  StyleSectionSubHeading,
  StyledSectionSubSection,
} from "styles";

const NotificationSoundsSetting: React.FC = () => {
  const settings = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const onChangeNotificationSound = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setNotificationSounds(e.target.value as NotificationSounds)
      );
    },
    [dispatch]
  );

  return (
    <Collapse title="Notification Sounds" heightResponsive={true}>
      <StyledSectionSubSection>
        <StyleSectionSubHeading>
          Notifcation Sounds Types
        </StyleSectionSubHeading>
        <Radio
          id="single"
          label="single"
          name="notification"
          value={NotificationSounds.DEFAULT}
          checked={
            settings.notificationSounds === NotificationSounds.DEFAULT
          }
          onChange={onChangeNotificationSound}
        />
        <Radio
          id="multiple"
          label="multiple"
          name="notification"
          value={NotificationSounds.MULTI}
          checked={
            settings.notificationSounds === NotificationSounds.MULTI
          }
          onChange={onChangeNotificationSound}
        />
        <Radio
          id="custom"
          label="custom"
          name="notification"
          value={NotificationSounds.CUSTOM}
          checked={
            settings.notificationSounds === NotificationSounds.CUSTOM
          }
          onChange={onChangeNotificationSound}
        />
      </StyledSectionSubSection>
    </Collapse>
  );
};

export default NotificationSoundsSetting;
