import React, { Component } from 'react'
import helper from '../../helper'

import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';

class Repo extends Component {
  state = {
    collapse: false
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { list } = this.props

    return (
      <div>
        {
          <div>
            <Button color="info" onClick={this.toggle} style={{ marginTop: '1rem' }} block>{helper.utcToDate(list.created_at)}</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card>
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Website</th>
                        <th>Language</th>
                        <th>Stars</th>
                        <th>Subscribers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href={list.url} target="_blank">Link</a></td>
                        <td>{list.language}</td>
                        <td>{list.stars}</td>
                        <td>{list.subscribers}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Fork</th>
                        <th>Forks</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{list.fork}</td>
                        <td>{list.forks}</td>
                        <td>{list.size}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Closed Issues</th>
                        <th>Closed Pull Issues</th>
                        <th>Closed Total Issues</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{list.closed_issues}</td>
                        <td>{list.closed_pull_issues}</td>
                        <td>{list.closed_total_issues}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Open Issues</th>
                        <th>Open Pull Issues</th>
                        <th>Open Total Issues</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{list.open_issues}</td>
                        <td>{list.open_pull_issues}</td>
                        <td>{list.open_total_issues}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Last Push</th>
                        <th>Last Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{list.last_push}</td>
                        <td>{list.last_update}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        }
      </div>
    )
  }
}

export default Repo
