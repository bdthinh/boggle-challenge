import { combineEpics } from 'redux-observable';

import notificationEpic from './epics/notification.epic';

export default combineEpics(
  notificationEpic,
);
