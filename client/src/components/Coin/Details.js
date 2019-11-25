import React, { Component } from 'react';
import helper from '../../helpers'
import Loading from '../Loading'

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';

import Repo from './Repo'

class Details extends Component {
  state = {
    activeTab: '1',
    name: "",
    url: "",
    algorithm: "",
    description: "",
    techDoc: "",
    repo: [],
    facebook: {},
    twitter: {},
    reddit: {},
    fetching: true
  }

  async componentDidUpdate(prevProps, prevState) {
    const { coin } = this.props
    if (prevProps.coin !== this.props.coin) {
      this.setState({
        name: coin.name,
        url: coin.url,
        algorithm: coin.algorithm,
        description: coin.description,
        techDoc: coin.technicalDoc[0],
        repo: coin.repo,
        facebook: coin.facebook,
        twitter: coin.twitter,
        reddit: coin.reddit,
        fetching: false
        })
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  paragraphParse = string => {
    if (string === undefined) return 'N/A'
    let cleanText = string.replace(/<\/?[^>]+(>|$)/g, "")
    return cleanText
  }

  mappedReposLists = () => {
    return this.state.repo.List.map((list, i) => {
      return (
        <div key={i}>
          <Repo list={list} />
        </div>
      )
    })
  }

  render() {
    const { name, url, algorithm, description, techDoc, facebook, twitter, reddit, fetching } = this.state

    return (
      <div className="details-container">
        {!fetching && [
          <Nav key='1' tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Twitter
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Repo
              </NavLink>
            </NavItem>
          </Nav>,

          <TabContent key="2" activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  {/* DETAIL */}
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Website</th>
                        <th>Technical Doc</th>
                        <th>Algorithm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></td>
                        <td><a href={techDoc} target="_blank" rel="noopener noreferrer">Link</a></td>
                        <td>{helper.isNA(algorithm)}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <span>Facebook</span>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Website</th>
                        <th>Points</th>
                        <th>Likes</th>
                        <th>Talks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href={facebook.link} target="_blank" rel="noopener noreferrer">Facebook</a></td>
                        <td>{facebook.Points}</td>
                        <td>{facebook.likes}</td>
                        <td>{facebook.talking_about}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <span>Redit</span>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Website</th>
                        <th>Points</th>
                        <th>Active Users</th>
                        <th>Subscriber</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href={reddit.link} target="_blank" rel="noopener noreferrer">Reddit</a></td>
                        <td>{reddit.Points}</td>
                        <td>{reddit.active_users}</td>
                        <td>{reddit.subscribers}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th>Comments / hr.</th>
                        <th>Comments / day.</th>
                        <th>Post / hr.</th>
                        <th>Post / day.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{reddit.comments_per_hour}</td>
                        <td>{reddit.comments_per_day}</td>
                        <td>{reddit.posts_per_hour}</td>
                        <td>{reddit.posts_per_day}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <h5>Description</h5>
                  <p>{this.paragraphParse(description)}</p>
                </Col>
              </Row>
            </TabPane>


            <TabPane tabId="2" className="twitter-tab">
              {/* TWITTER */}
              <Row>
                <Col sm="4">
                  <Card body>
                    <p><span>Points: </span> {twitter.Points}</p>
                    <p><span>Weblink: </span><a href={twitter.link}> {twitter.link}</a></p>
                    <p><span>Account Creation: </span> {twitter.account_creation}</p>
                    <p><span>Favorites: </span> {twitter.favourites}</p>
                    <p><span>Followers: </span> {twitter.follwers}</p>
                    <p><span>Following: </span> {twitter.following}</p>
                    <p><span>Lists: </span> {twitter.lists}</p>
                    <p><span>Statuses: </span> {twitter.statuses}</p>
                  </Card>
                </Col>
                <Col sm="8">
                  <Card body>
                    <CardTitle>Twitter Feed</CardTitle>
                    <CardText>Coming Soon...</CardText>
                    <Button>Coming soon</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>


            <TabPane tabId="3">
              {/* REPO */}
              <Row>
                <Col sm="12">
                  {this.mappedReposLists()}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        ]}

        {fetching && <Loading />}
      </div>
    )
  }
}

export default Details
