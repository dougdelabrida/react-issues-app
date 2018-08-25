import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from 'semantic-ui-react'
import { getRangePages, Paginator } from '../Paginator'

describe('getPages', () => {
  it('should work correctly at the very beginning', () => {
    expect(getRangePages(1, 400)).toEqual([1, 2, 3, "...", 400])
  })

  it('should work correctly in the middle', () => {
    expect(getRangePages(200, 674)).toEqual([1, '...', 198, 199, 200, 201, 202, '...', 674])
  })

  it('should work correctly at the end', () => {
    expect(getRangePages(399, 400)).toEqual([1, '...', 397, 398, 399, 400])
  })
})

describe('Paginator', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <Table>
        <Paginator selectedPage={33} totalPages={97} onSelectPage={() => null} />
      </Table>
    , div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
