import React, { Component } from 'react'
import { Header, Table, Popup, Label, Button, Icon } from 'semantic-ui-react'
import { Paginator } from './Paginator'

import { getFormattedDate } from './utils'

class App extends Component {

  state = {
    issues: [],
    selectedPage: 1,
    selectedState: 'all',
    totalPages: 0,
    isLoading: false
  }

  async getIssues(params) {
    let totalPages = 0

    const issues = await fetch(`https://api.github.com/repos/facebook/react/issues?page=${params.page}&state=${params.state}&per_page=8`)
      .then(response => {
        const [, last] = response.headers.get('Link').split('rel="next"')
        totalPages = last ? Number(last.match(/page=(.*?)&/)[1]) : params.page
        // TODO IMPROVE
        return response.json()
      })

      return {totalPages, issues}
  }

  handleSelectState = (selectedState) => {
    this.setState({isLoading: true})

    const params = {
      page: 1,
      state: selectedState
    }

    this.getIssues(params).then(response => {
      this.setState({
        isLoading: false,
        selectedState,
        ...response
      })
    })
  }

  handleOnSelectPage = (page) => {
    this.setState({isLoading: true})

    const params = {
      page,
      state: 'all'
    }

    this.getIssues(params).then(response => {
      this.setState({
        isLoading: false,
        selectedPage: page,
        ...response
      })
    })
  }

  componentDidMount() {
    const params = {
      page: 1,
      state: 'all'
    }

    this.setState({isLoading: true})

    this.getIssues(params).then(response => {
      this.setState({
        isLoading: false,
        ...response
      })
    })
  }

  render() {
    const { isLoading, selectedState, issues, selectedPage, totalPages } = this.state
    return (
      <div className="ui container">
        <div className={`ui transition dimmer ${isLoading ? 'active' : null}`}>
          <div className='ui loader'/>
        </div>
        <header className="header">
          <Header as='h1'>React's Issues</Header>
        </header>
        <div>
          <Button.Group>
            <Button
              active={selectedState === 'all'}
              onClick={() => this.handleSelectState('all')}>
                All
            </Button>
            <Button
              active={selectedState === 'open'}
              onClick={() => this.handleSelectState('open')}>
                Open
            </Button>
            <Button
              active={selectedState === 'closed'}
              onClick={() => this.handleSelectState('closed')}>
                Closed
            </Button>
          </Button.Group>
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell width={7}>Title</Table.HeaderCell>
              <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
              <Table.HeaderCell width={2}>Updated At</Table.HeaderCell>
              <Table.HeaderCell width={2}>Labels</Table.HeaderCell>
              <Table.HeaderCell width={1}>State</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.number}</Table.Cell>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{getFormattedDate(issue.created_at)}</Table.Cell>
                <Table.Cell>{getFormattedDate(issue.updated_at)}</Table.Cell>
                <Table.Cell>
                  <Label.Group circular>
                    {issue.labels.map((label, i) => (
                      <Popup
                        trigger={<Label circular empty key={`${label.id}_${i}`} style={{backgroundColor: '#' + label.color}}/>}
                        key={i}
                      >
                        <Popup.Content>
                          {label.name}
                        </Popup.Content>
                      </Popup>
                    ))}
                  </Label.Group>
                </Table.Cell>
                <Table.Cell>
                  <div className={`ui ${issue.state === 'open' ? 'green' : 'red'} label`}>{issue.state}</div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Paginator selectedPage={selectedPage} totalPages={totalPages} onSelectPage={this.handleOnSelectPage} />
        </Table>
      </div>
    )
  }
}

export default App
