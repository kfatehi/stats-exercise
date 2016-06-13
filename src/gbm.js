import { jStat } from 'jstat';

function getChange(seed, mean, variance, sigma, mu) {
  return jStat.normal.inv(seed, mean, variance) * sigma + mu;
}

function getValue(prevValue, change) {
  return prevValue * ( 1 + change );
}

// Simple Gemoetric Brownian Motion
export default function(initialValue=100, mu, sigma, tickCount=15) {
  let ticks = [...Array(tickCount+1).keys()].slice(1, tickCount+1);
  let initialState = [{ time: 0, value: initialValue, change: null }];
  let reducer = (list, time) => {
    let prev = list[time-1];
    let change = getChange(Math.random(), 0, 1, sigma, mu);
    let value = getValue(prev.value, change)
    return [...list, { time, value, change }];
  }
  return ticks.reduce(reducer, initialState);
}
