import React from 'react';

import Notification from './Notification';
import Alert from './Alert';

const Toast = () => ([
  <Notification key="notification" />,
  <Alert key="alert" />,
]);

export default Toast;
