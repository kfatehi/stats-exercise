import React from 'react';
import {connect} from 'react-redux';
import {Datatable} from './Datatable';
import * as actionCreators from '../action-creators';

export const Info = React.createClass({
  render: function() {
    const {
      gbmReset,
      gbmParams: {
        start, mu, sigma, duration
      },
      gbmResult
    } = this.props;
    return (
      <div>
        <button onClick={gbmReset}>Reset</button>
        <span>Mu: {mu}</span>
        <span>Sigma: {sigma}</span>
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
