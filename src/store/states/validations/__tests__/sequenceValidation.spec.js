import {
  checkCombinationInResultList,
  canChoose,
  checkCombinationPossible,
  VALID_STATE,
} from '../sequenceValidation';

import {
  EXAMPLE_POSITION_MAP,
} from '../../__tests__/mockData';

describe('sequenceValidation', () => {
  it('should checkCombinationInResultList failed', () => {
    const combination = 'PASS';
    const resultList = ['PASS'];

    expect(checkCombinationInResultList(combination, resultList)).toEqual({
      valid: false,
      error: 'Word is already chosen before',
    });
  });

  it('should checkCombinationInResultList passed', () => {
    const combination = 'PASS';
    const resultList = ['PASSS'];

    expect(checkCombinationInResultList(combination, resultList)).toEqual(VALID_STATE);
  });

  it('should checkCombinationPossible failed', () => {
    const combination = 'ACE';
    expect(checkCombinationPossible(combination, EXAMPLE_POSITION_MAP)).toEqual({
      valid: false,
      error: 'Cannot combine this word',
    });
  });

  it('should checkCombinationPossible passed', () => {
    const combination = 'PASS';
    expect(checkCombinationPossible(combination, EXAMPLE_POSITION_MAP)).toEqual({
      valid: true,
      error: '',
      data: [2, 3, 7, 11],
    });
  });

  it('should define correct chosse possibility', () => {
    expect(canChoose(2, 4)).toEqual(false);
    expect(canChoose(2, 5)).toEqual(true);
    expect(canChoose(3, 0)).toEqual(false);
    expect(canChoose(0, 3)).toEqual(false);
    expect(canChoose(8, 3)).toEqual(false);
    expect(canChoose(1, 5)).toEqual(true);
  });
});
