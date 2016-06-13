import gbm from '../gbm';

export function info(state = {}, action) {
  let calcState = (start, mu, sigma, duration) => {
    return {
      params: { start, mu, sigma, duration },
      gbm: gbm(start, mu, sigma, duration)
    }
  }

  let reset = () => {
    return calcState(100, 0.05, 0.15, 15);
  }

  switch (action.type) {
    case 'INIT':
      return reset();
    case 'RESET_GBM':
      return reset();
  }
  return state
}
