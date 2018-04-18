import React from 'react'

const Faq = () =>
  <div className="faq">
    <div className="faq-header-container">
      <div className="faq-header">
        <h2>FAQ</h2>
        <h5>Community based cryptocurrency ranking to help others make better investment choices.</h5>
      </div>
    </div>

    <div className="faq-content-container">
      <p>
        <b>What is <em>"Cryptocurrency Score"</em>?</b>
      </p>
      <ul>
        <li>Cryptocurrency Score is a way for the community to rate coins.</li>
        <li>It then takes does some crazy math and gives us an average of each coin based on the community.</li>
        <li>Every user have their own profile and they can give comments on the coins that they rated</li>
      </ul>

      <p>
        <b>Can I rate without logging in?</b>
        No, <br/>
        To prevent scores to be compromised by multiple rating by one person we do not allow users to rate without logging in.
      </p>

      <p>
        <b>How are ratings being caculated?</b>
        We currently use the formula <code>score=5p/10+5(1−e−q/Q).</code><br />
        Each user have their <em>"influcene"</em> rating and that's weight in along with the coins that they rate.<br/>
      </p>

      <p>
        <b>What are <em>"influcene"</em> rating?</b>
        Influcene ratings are ratings that other users rate you as.
      </p>

      <p>
        <b>Where do the coin data come from?</b>
        Coin data are coming from <a href="https://coinmarketcap.com/">Coinmarketcap</a> API
      </p>

      <p>
        <b>How frequent do coin data update?</b>
        Coin updates ever 5 minutes from <a href="https://coinmarketcap.com/">Coinmarketcap</a> API
      </p>

    </div>
  </div>

export default Faq
