import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import '../../../../node_modules/rxjs/add/operator/map';
import '../../../../node_modules/rxjs/add/operator/delay';
import '../../../../node_modules/rxjs/add/operator/debounceTime';

import rootEpic from '../../rootEpic';

import {
  notifySuccess,
} from '../../states/toast';

describe('toast state', () => {
  it('should dispatch close notification after show', async () => {
    const epicMiddleware = createEpicMiddleware(rootEpic);

    const mockStore = configureStore([thunk, arrayMiddleware, epicMiddleware]);
    const store = mockStore({});
    await store.dispatch(notifySuccess('correct'));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        expect.objectContaining({ type: 'TOAST/SHOW_NOTIFICATION' }),
        expect.objectContaining({ type: 'TOAST/CLOSE_NOTIFICATION' }),
      ]));
    }, 3000);
  });
});
