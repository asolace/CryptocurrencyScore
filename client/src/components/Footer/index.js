import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'

import { Eth, Btc } from 'react-cryptocoins'

import BTCdonate from '../../assets/BTCdonate.png'
import ETHdonate from '../../assets/ETHdonate.png'
import copyIcon from '../../assets/copyIcon.png'
import brandImage from '../../assets/cryptocurrencies.svg'

class Footer extends Component {
  state = {
    btcModal: false,
    ethModal: false,
    copied: false,
    value: ''
  }

  btcToggle = e => {
    e.preventDefault()

    this.setState({
      btcModal: !this.state.btcModal,
      value: '1Hpt4hnSYsePr8iyiqckLmTgJGcu2ejgmh'
    })
  }

  ethToggle = e => {
    e.preventDefault()

    this.setState({
      ethModal: !this.state.ethModal,
      value: '0x5C5c8318cD6975D22a8b67d8aA1552eB3e8d8d04'
    })
  }

  render() {
    return (
      <div className="footer-container" id="bot">
        <hr />
        <div className="footer-brand-container">
          <div className="footer-brand-wrapper">
            <span className="footer-brand">
              <img src={brandImage} className="brand-img" alt="brand"/>
            </span>
            <span className="title-full">Cryptocurrency Score</span>
            <span className="title-short">CCScore</span>
          </div>
        </div>
        <hr />
        <div className="footer-links-wrapper">
          <Container>
            <Row>
              <Col>
                <div className="footer-attribution">
                  <p className="footer-label">Attributions</p>
                  Icons made by <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                </div>
              </Col>
            </Row>
          </Container>

          <hr />
         
          <Container>
            <Row>
              <Col>
                <p>
                  <a href="https://www.asolace.com" target="_blank" rel="noopener noreferrer"> Asolace </a> |
                  <Link to="/disclaimer"> Disclaimer</Link> |
                  <Link to="/faq"> FAQ</Link> |
                  <Link to="/contact"> Contact</Link>
                </p>
              </Col>
              <Col>
                <div className="right-footer">
                  <Row>
                    <Col>
                      <p className="footer-label">Donate</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      BTC:&nbsp;<button className="donate" onClick={this.btcToggle}> 1Hpt4hnSYsePr8iyiqckLmTgJGcu2ejgmh </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      ETH:&nbsp;<button className="donate" onClick={this.ethToggle}> 0x5C5c8318cD6975D22a8b67d8aA1552eB3e8d8d04 </button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>


        <Modal isOpen={this.state.btcModal} toggle={this.btcToggle}>
          <ModalHeader toggle={this.btcToggle}><Btc color="#ffb119"/> BTC Address</ModalHeader>
          <ModalBody>
            <img src={BTCdonate} alt="btc"/>
            <div className="copy-text-container">
              <Row>
                <Col className="text-col">
                  <div className="copy-text">
                    <span className="copy-address">1Hpt4hnSYsePr8iyiqckLmTgJGcu2ejgmh</span>
                  </div>
                </Col>

                <Col xs="3">
                  <CopyToClipboard text={this.state.value}
                    onCopy={() => this.setState({copied: true})}>
                    <div onClick={this.handleCopy} className="copy-icon">
                      <img src={copyIcon} alt="copy"/>
                    </div>
                  </CopyToClipboard>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.ethModal} toggle={this.ethToggle}>
          <ModalHeader toggle={this.ethToggle}><Eth color="#6f7cba" /> ETH Address</ModalHeader>
          <ModalBody>
            <img src={ETHdonate} alt="btc"/>
            <div className="copy-text-container">
              <Row>
                <Col className="text-col">
                  <div className="copy-text">
                    <span className="copy-address">0x5C5c8318cD6975D22a8b67d8aA1552eB3e8d8d04</span>
                  </div>
                </Col>

                <Col>
                  <CopyToClipboard
                    text={this.state.value}
                    onCopy={() => this.setState({copied: true})}
                  >
                    <div onClick={this.handleCopy} className="copy-icon">
                      <img src={copyIcon} alt="copy"/>
                    </div>
                  </CopyToClipboard>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}


export default Footer
