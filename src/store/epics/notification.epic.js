import { combineEpics } from 'redux-observable';

import {
  DURATION,
  SHOW_NOTIFICATION,
  closeNotification,
} from '../states/toast';

const closeNotificationAfterDurationEpic = action$ =>
  action$
    .ofType(SHOW_NOTIFICATION)
    .debounceTime(100)
    .delay(DURATION)
    .map(closeNotification);

export default combineEpics(
  closeNotificationAfterDurationEpic,
);
