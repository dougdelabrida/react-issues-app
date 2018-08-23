import { getFormattedDate } from '../utils'

describe('getFormattedDate', () => {
  it('should return date as dd/mm/yyyy', () => {
    expect(getFormattedDate('2018-08-22T23:07:17Z')).toEqual('22/08/2018')
    expect(getFormattedDate('2018-12-25T23:01:17Z')).toEqual('25/12/2018')
    expect(getFormattedDate('1993-10-26T23:04:12Z')).toEqual('26/10/1993')
  })

  it('should return invalid date', () => {
    expect(getFormattedDate('hello')).toEqual('Invalid Date')
  })
})
