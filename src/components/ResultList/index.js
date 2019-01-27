import React from 'react';
import { connect } from 'react-redux';
import { setDisplayName, compose } from 'recompose';

import { resultListSelector } from '../../store/states/resultList';

const connectToRedux = connect(
  state => ({
    resultList: resultListSelector(state),
  }),
);

const enhance = compose(
  setDisplayName('ResultList'),
  connectToRedux,
  setDisplayName('PureResultList'),
);


const ResultList = ({ resultList }) => (
  <div className="result-list">
    <legend>
      <span>CORRECT</span>
      {resultList.length > 0 && <span>: {resultList.length}</span>}
    </legend>
    <div className="words">
      {resultList.map(word => <div key={word} className="word">{word}</div>)}
    </div>
  </div>
);

export default enhance(ResultList);
