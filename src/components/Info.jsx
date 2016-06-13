import React from 'react';
import {connect} from 'react-redux';
import {Datatable} from './Datatable';
import * as actionCreators from '../action-creators';
import Rcslider from 'rc-slider';
require('rc-slider/assets/index.css');

export const Info = React.createClass({
  render: function() {
    const {
      gbmReset,
      gbmChange,
      gbmParams: {
        start, mu, sigma, duration
      },
      gbmResult
    } = this.props;
    return (
      <div>
        <button onClick={gbmReset}>Reset</button>
        <span>Mu: {mu}</span>
        <Rcslider min={0} max={1} step={0.01} defaultValue={mu} onChange={(mu) => gbmChange({mu})} />
        <span>Sigma: {sigma}</span>
        <Rcslider min={0} max={1} step={0.01} defaultValue={sigma} onChange={(sigma) => gbmChange({sigma})} />
        <Datatable data={gbmResult} />
      </div>
    );
  }
})

function mapStateToProps(state, props) {
  return {
    gbmParams: state.info.params,
    gbmResult: state.info.gbm,
  };
}

export const InfoContainer = connect(
  mapStateToProps,
  actionCreators
)(Info);
