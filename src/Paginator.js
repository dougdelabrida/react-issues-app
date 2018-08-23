import React from 'react'
import { Icon, Menu, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export function getRangePages(selectedPage, totalPages) {
  const delta = 2
  const range = []

  for (let i = Math.max(2, selectedPage - delta); i <= Math.min(totalPages - 1, selectedPage + delta); i++) {
    range.push(i)
  }

  if (selectedPage - delta > 2) {
    range.unshift("...")
  }
  if (selectedPage + delta < totalPages - 1) {
    range.push("...")
  }

  range.unshift(1)
  range.push(totalPages)

  return range
}

export const Paginator = ({selectedPage, totalPages, onSelectPage}) => (
  <Table.Footer>
    <Table.Row>
      <Table.HeaderCell colSpan='6'>
        <Menu floated='right' pagination>
          <Menu.Item
            as='a'
            disabled={selectedPage === 1}
            onClick={() => onSelectPage(selectedPage - 1)}
            icon>
            <Icon name='chevron left' />
          </Menu.Item>
          {getRangePages(selectedPage, totalPages).map((page, i) => (
            <Menu.Item
              as='a'
              key={`${page}_${i}`}
              disabled={page === selectedPage || page === '...'}
              onClick={() => onSelectPage(page)}
              >
              {page}
            </Menu.Item>
          ))}
          <Menu.Item
            as='a'
            disabled={selectedPage === totalPages}
            onClick={() => onSelectPage(selectedPage + 1)}
            icon>
            <Icon name='chevron right' />
          </Menu.Item>
        </Menu>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
)

Paginator.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onSelectPage: PropTypes.func.isRequired
}
