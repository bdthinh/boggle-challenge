import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import arrayMiddleware from '../../middlewares/arrayMiddleware';

import {
  resultListSelector,
  resultListLengthSelector,
  submitWord,
} from '../resultList';

describe('resultList state', () => {
  it('should return correct resultList', () => {
    const state = {
      resultList: ['PASS', 'ACE'],
    };
    expect(resultListSelector(state)).toEqual(['PASS', 'ACE']);
    expect(resultListLengthSelector(state)).toEqual(2);
  });

  it('should not append word already in resultList', async () => {
    const initialState = {
      resultList: ['PASS'],
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    await store.dispatch(submitWord('PASS'));

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'TOAST/SHOW_NOTIFICATION', payload: expect.objectContaining({ type: 'error' }) }),
    ]));
  });

  it('should append word not yet in resultList', async () => {
    const initialState = {
      resultList: [],
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    await store.dispatch(submitWord('PASS'));

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'RESULT/APPEND_WORD' }),
    ]));
  });

  it('should append word and notifySuccess', async () => {
    const initialState = {
      resultList: [],
    };

    const mockStore = configureStore([thunk, arrayMiddleware]);
    const store = mockStore(initialState);

    await store.dispatch(submitWord('PASS'));

    expect(store.getActions()).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'TOAST/SHOW_NOTIFICATION', payload: expect.objectContaining({ type: 'success' }) }),
    ]));
  });
});
