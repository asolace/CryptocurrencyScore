import React, { Component } from 'react';
import axios from 'axios'
import helper from '../../helpers'
import Loading from '../Loading'

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import classnames from 'classnames';

import Repo from './Repo'

class Details extends Component {
  state = {
    activeTab: '1',
    general: {},
    ico: {},
    seo: {},
    repos: {},
    facebook: {},
    twitter: {},
    reddit: {},
    fetching: true
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.coin !== this.props.coin) {
      try {
        let res = await axios.get('/api/coin/detail/' + this.props.coin.ccId)
        let { details, social } = res.data.data

        this.setState({
          general: details.General,
          ico: details.ICO,
          seo: details.SEO,
          repos: social.CodeRepository,
          facebook: social.Facebook,
          twitter: social.Twitter,
          reddit: social.Reddit,
          fetching: false
         })
      } catch (e) {
        console.log(e)
      }
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
    return this.state.repos.List.map((list, i) => {
      return (
        <div key={i}>
          <Repo list={list} />
        </div>
      )
    })
  }

  render() {
    const { general, ico, facebook, twitter, reddit, fetching } = this.state

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

            {ico.Status !== 'N/A' &&
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  ICO
                </NavLink>
              </NavItem>
            }


            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
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
                        {ico.Status !== 'N/A' && <th>White Paper</th>}
                        <th>Start Date</th>
                        <th>Algorithm</th>
                        <th>Coins Mined</th>
                        <th>Proof of Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href={helper.renderWebUrl(general.AffiliatedUrl)} target="_blank">{general.Name}</a></td>
                        {ico.Status !== 'N/A' && <td><a href={ico.WhitePaperLink} target="_blank">Link</a></td>}
                        <td>{helper.isNA(general.StartDate)}</td>
                        <td>{helper.isNA(general.Algorithm)}</td>
                        <td>{general.TotalCoinsMined + ' / ' + helper.isNA(general.TotalCoinSupply)}</td>
                        <td>{helper.isNA(general.ProofType)}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <u>-- FACEBOOK --</u>
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
                        <td><a href={facebook.link} target="_blank">Facebook</a></td>
                        <td>{facebook.Points}</td>
                        <td>{facebook.likes}</td>
                        <td>{facebook.talking_about}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <u>-- REDDIT --</u>
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
                        <td><a href={reddit.link} target="_blank">Reddit</a></td>
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
                  <p>{this.paragraphParse(general.Description)}</p>
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
                    <p><span>Faavourites: </span> {twitter.favourites}</p>
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
              {/* ICO */}
              <Row>
                <Col sm="12">
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Blog</th>
                      <th>Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ico.Status}</td>
                      <td><a href={ico.BlockLink}>Blog</a></td>
                      <td>{helper.utcToDate(ico.Date)}</td>
                      <td>{helper.utcToDate(ico.EndDate)}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th>Funding Cap</th>
                      <th>Funding Target</th>
                      <th>Funding Raised</th>
                      <th>Funding Raised USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ico.FundingCap}</td>
                      <td>{ico.FundingTarget}</td>
                      <td>{ico.FundsRaised}</td>
                      <td>{helper.stringToUSD(ico.FundsRaisedUSD)}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th>Starting Price</th>
                      <th>Starting Currency</th>
                      <th>Token for Investors</th>
                      <th>Reserve Splits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ico.StartPrice}</td>
                      <td>{ico.StartPriceCurrency}</td>
                      <td>{ico.TokenPercentageForInvestors} %</td>
                      <td>{ico.TokenReserveSplit}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th>Jurisdiction</th>
                      <th>Legal Advisers</th>
                      <th>LegalForm</th>
                      <th>Security Audit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{ico.Jurisdiction}</td>
                      <td>{ico.LegalAdvisers}</td>
                      <td>{ico.LegalForm}</td>
                      <td>{ico.SecurityAuditCompany}</td>
                    </tr>
                  </tbody>
                </Table>

                <h5>Description</h5>
                <p>{this.paragraphParse(ico.Description)}</p>
                </Col>
              </Row>
            </TabPane>





            <TabPane tabId="4">
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
