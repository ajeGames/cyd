import { ping, getStorySummaries } from './storytimeApi';

describe('storytimeApi', () => {
  it('responds to ping', () => {
    return ping()
      .then(data => data.json())
      .then(json => {
        expect(json).toEqual({message:'pong'})
    })
  });

  it('fetches something from remote service', () => {
    return getStorySummaries()
      .then(results => results.json())
      .then(results => {
        expect(results.length).toBe(2);
      })
  });
});
