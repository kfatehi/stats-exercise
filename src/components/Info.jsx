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

    let last = gbmResult[gbmResult.length-1].value;
    let first = gbmResult[1].value;
    let cagr = Math.pow(last/first, 1.0/duration) - 1
    return (
      <div>
        <div>
          <button onClick={gbmReset}>Reset</button>
        </div>
        <span>Duration: {duration}</span>
        <Rcslider min={0} max={1000} defaultValue={duration} onChange={(duration) => gbmChange({duration})} />
        <span>Mu: {mu} (Actual CAGR: {cagr})</span>
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
