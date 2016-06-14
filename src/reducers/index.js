import calcGBM from '../gbm';

const defaultParams = {
  start: 100,
  mu: 0.05,
  sigma: 0.15,
  duration: 15
}

export function info(state = {}, action) {
  let calcState = (params) => {
    let { start, mu, sigma, duration} = params;
    let gbm = calcGBM(start, mu, sigma, duration)
    return { params, gbm };
  }

  let reset = (params = {}) => {
    return calcState(Object.assign({}, defaultParams, params))
  }

  switch (action.type) {
    case 'INIT':
      return reset();
    case 'RESET_GBM':
      return reset(state.params);
    case 'CHANGE_GBM':
      return reset(action.params);
  }
  return state
}
