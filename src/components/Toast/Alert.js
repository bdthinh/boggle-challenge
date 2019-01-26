import React from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert-react';

import { withProps, setDisplayName, compose } from 'recompose';

import { resultListLengthSelector } from '../../store/states/resultList';
import { alertShownSelector } from '../../store/states/toast';

const connectToRedux = connect(
  state => ({
    shown: alertShownSelector(state),
    numerOfWords: resultListLengthSelector(state),
  }),
);

const withActionRefreshGame = withProps(() => ({
  // eslint-disable-next-line no-restricted-globals
  refreshGame: () => location.reload(),
}));

const enhance = compose(
  setDisplayName('Alert'),
  connectToRedux,
  withActionRefreshGame,
  setDisplayName('PureAlert'),
);

const Alert = ({ shown, numberOfWords, refreshGame }) => (
  <SweetAlert
    show={shown}
    title="Game end"
    text={`You have finished the game with total ${numberOfWords} words`}
    onConfirm={refreshGame}
    confirmButtonText="Restart"
  />
);

export default enhance(Alert);
