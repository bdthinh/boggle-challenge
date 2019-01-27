/* eslint-disable no-loop-func */
import { path, forEach, flow, map, filter, last, split } from 'lodash/fp';

export const VALID_STATE = { valid: true, error: '' };

export const checkCombinationInResultList = (combination, resultList) => {
  if (resultList.includes(combination)) {
    return ({
      valid: false,
      error: 'Word is already chosen before',
    });
  }
  return VALID_STATE;
};

const INCREMENTS = [-5, -4, -3, -1, 1, 3, 4, 5];

export const canChoose = (from, to) => {
  if (from === to) {
    return false;
  }
  // eslint-disable-next-line
  for (let i = 0; i < INCREMENTS.length; i++) {
    if (from + INCREMENTS[i] === to) {
      return true;
    }
  }
  return false;
};

export const checkCombinationPossible = (combination, positionMap) => {
  const positionsConversion = flow(
    split(''),
    map(alphabet => positionMap[alphabet]),
  )(combination);

  const noOfLadders = positionsConversion.length;

  if (noOfLadders === 0) {
    return ({ ...VALID_STATE, data: [] });
  }

  const sequenceBook = {
    0: map(position => ([position]), positionsConversion[0]),
  };

  // eslint-disable-next-line
  for (let i = 0; i < noOfLadders - 1; i++) {
    const currentLadder = positionsConversion[i];
    const nextLadder = positionsConversion[i + 1];

    forEach(from => (
      flow(
        filter(to => canChoose(from, to)),
        forEach(to => {
          // eslint-disable-next-line immutable/no-mutation
          sequenceBook[i + 1] = [
            ...(sequenceBook[i + 1] || []),
            ...flow(
              filter(sequence => last(sequence) === from && !sequence.includes(to)),
              map(sequence => ([...sequence, to])),
            )(sequenceBook[i]),
          ];
        }),
      )(nextLadder)
    ), currentLadder);
  }

  const currentSequence = path('[0]', sequenceBook[noOfLadders - 1]);
  if (!currentSequence) {
    return ({
      valid: false,
      error: 'Cannot combine this word',
    });
  }
  return ({ ...VALID_STATE, data: currentSequence });
};
