import React from 'react';
import { connect } from 'react-redux';
import { setDisplayName, compose, lifecycle } from 'recompose';

import {
  tilesInputSelector,
  setupTilesBoard,
} from '../../store/states/tiles';
import { currentSequenceSelector } from '../../store/states/sequence';

const connectToRedux = connect(
  state => ({
    tiles: tilesInputSelector(state),
    currentSequence: currentSequenceSelector(state),
  }),
  {
    onLoad: setupTilesBoard,
  },
);

const withOnLoadTiles = lifecycle({
  componentDidMount() {
    this.props.onLoad();
  },
});

const enhance = compose(
  setDisplayName('Board'),
  connectToRedux,
  withOnLoadTiles,
  setDisplayName('PureBoard'),
);

const Board = ({ tiles, currentSequence }) => (
  <div className="board-container">
    {tiles.map((tile, index) => (
      <div key={index} className={`tile ${currentSequence.includes(index) && 'highlight'}`}>
        {tile}
      </div>
    ))}
  </div>
);

export default enhance(Board);
