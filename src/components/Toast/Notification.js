import React from 'react';
import { renderNothing, branch, compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { negate, path } from 'lodash/fp';

import {
  notificationSelector,
  notificationShownSelector,
} from '../../store/states/toast';

const connectToRedux = connect(
  state => ({
    shown: notificationShownSelector(state),
    notification: notificationSelector(state),
  }),
);

const conditionalRender = branch(
  negate(path('shown')),
  renderNothing,
);

const enhance = compose(
  setDisplayName('Notification'),
  connectToRedux,
  conditionalRender,
  setDisplayName('PureNotification'),
);

const Notification = ({ notification }) => (
  <div className={`page-message message ${notification.type}`}>
    <div>{notification.message}</div>
  </div>
);

export default enhance(Notification);
