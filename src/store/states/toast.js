import { combineReducers } from 'redux';
import { path } from 'lodash/fp';
import { handleAction } from 'redux-actions';

export const DURATION = 3000;

export const SHOW_ALERT = 'TOAST/SHOW_ALERT';
export const SHOW_NOTIFICATION = 'TOAST/SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'TOAST/CLOSE_NOTIFICATION';

export const alertShownSelector = path('toast.alert');
export const notificationShownSelector = path('toast.notification.shown');
export const notificationSelector = path('toast.notification');

export const showAlert = () => ({ type: SHOW_ALERT, payload: true });

export const showNotification = payload => ({
  type: SHOW_NOTIFICATION,
  payload,
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
});

export const notifySuccess = message => dispatch => dispatch(showNotification({
  message,
  duration: DURATION,
  type: 'success',
}));

const takePayload = (state, { payload }) => payload;

const notification = (state = ({ shown: false }), { type, payload }) => {
  if (type === SHOW_NOTIFICATION) {
    return ({ ...payload, shown: true });
  }
  if (type === CLOSE_NOTIFICATION) {
    return ({ shown: false });
  }
  return state;
};

const alert = handleAction(
  SHOW_ALERT,
  takePayload,
  false,
);

const toast = combineReducers({
  notification,
  alert,
});

export default { toast };
