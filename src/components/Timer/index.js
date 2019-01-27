import React from 'react';
import { connect } from 'react-redux';
import fns from 'date-fns';

import { withState, setDisplayName, compose, lifecycle } from 'recompose';

import { showAlert } from '../../store/states/toast';

const connectToRedux = connect(
  null,
  {
    onShow: showAlert,
  },
);

const TIME = 10 * 60 * 1000;

const deadline = Date.now() + TIME;

const withCurrentTime = withState('currentTime', 'setCurrentTime', Date.now());

const withCountdown = lifecycle({
  componentDidMount() {
    setInterval(() => this.props.setCurrentTime(Date.now()), 1000);
    setTimeout(() => {
      this.props.onShow();
    }, TIME);
  },
});

const enhance = compose(
  setDisplayName('Timer'),
  connectToRedux,
  withCurrentTime,
  withCountdown,
  setDisplayName('PureTimer'),
);


const Timer = ({ currentTime }) => (
  <div className="timer">
    <span className="countdown">{fns.format(new Date(0, 0, 0, 0, 0, (deadline - currentTime) / 1000), 'mm:ss')}</span>
  </div>
);

export default enhance(Timer);
