import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import {
  alertShownSelector,
  notificationShownSelector,
  notificationSelector,
  notifySuccess,
  notifyError,
} from '../toast';

describe('toast state', () => {
  const state = {
    toast: {
      alert: true,
      notification: {
        message: 'Correct!',
        duration: 3000,
        type: 'success',
        shown: true,
      },
    },
  };

  it('should return correct alert show', () => {
    expect(alertShownSelector(state)).toEqual(true);
  });

  it('should return correct notification status', () => {
    expect(notificationShownSelector(state)).toEqual(true);
  });

  it('should return correct notification', () => {
    expect(notificationSelector(state)).toEqual({
      message: 'Correct!',
      duration: 3000,
      type: 'success',
      shown: true,
    });
  });

  it('should dispatch success notification with correct action payload', async () => {
    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore({});
    await store.dispatch(notifySuccess('correct'));

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'TOAST/SHOW_NOTIFICATION', payload: { message: 'correct', type: 'success', duration: 3000 } }),
    ]));
  });

  it('should dispatch error notification with correct action payload', async () => {
    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore({});
    await store.dispatch(notifyError('wrong'));

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'TOAST/SHOW_NOTIFICATION', payload: { message: 'wrong', type: 'error', duration: 3000 } }),
    ]));
  });
});
