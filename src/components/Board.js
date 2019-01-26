import React from 'react';
import { connect } from 'react-redux';
import { setDisplayName, compose, lifecycle } from 'recompose';

import {
  tilesInputSelector,
  setupTilesBoard,
} from '../store/states/tiles';

const connectToRedux = connect(
  state => ({
    tiles: tilesInputSelector(state),
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

const Board = ({ tiles }) => (
  <div className="board-container">
    {tiles.map(tile => <div className="tiles">{tile}</div>)}
  </div>
);

export default enhance(Board);
