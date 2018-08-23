import React, { Component } from 'react'
import { Header, Table, Popup, Label } from 'semantic-ui-react'
import { Paginator } from './Paginator'

class App extends Component {

  state = {
    issues: [],
    selectedPage: 1,
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
    return (
      <div className="ui container">
        <div className={`ui transition dimmer ${this.state.isLoading ? 'active' : null}`}>
          <div className='ui loader'/>
        </div>
        <header>
          <Header as='h1'>React's Issues</Header>
        </header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Issue Number</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Labels</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>{issue.number}</Table.Cell>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>{issue.created_at}</Table.Cell>
                <Table.Cell>{issue.updated_at}</Table.Cell>
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

          <Paginator selectedPage={this.state.selectedPage} totalPages={this.state.totalPages} onSelectPage={this.handleOnSelectPage} />
        </Table>
      </div>
    )
  }
}

export default App
