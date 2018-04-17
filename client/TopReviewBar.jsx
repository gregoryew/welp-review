import React from 'react';
import DropDown from './dropdown.jsx';
import SearchBar from './SearchBar.jsx';

const TopReviewBar = props => (
  <div className="section-header section-header--no-spacing">
    <div><h2>Recommended Reviews for <b>{props.name}</b></h2></div>
    <div className="feed_trust-banner">
      <div className="arrange arrange--12 arrange--middle">
        <div className="arrange_unit">
          <span aria-hidden="true" style={{ fill: 'red', width: 24, height: 24 }} className="icon icon--24-yelp icon--size-24">
            <svg className="icon_svg">
              <svg id="24x24_yelp" height="100%" viewBox="0 0 24 24" width="100%">
                <path d="M18.803 12.49l-4.162 1.194c-.8.23-1.45-.666-.98-1.357l2.42-3.59a.893.893 0 0 1 1.33-.172 7.66 7.66 0 0 1 1.97 2.71.894.894 0 0 1-.572 1.215zm-4.187 2.627l4.117 1.338a.893.893 0 0 1 .53 1.233 7.762 7.762 0 0 1-2.058 2.64.894.894 0 0 1-1.326-.216l-2.3-3.674c-.44-.706.24-1.578 1.03-1.32zm-3.996-3.64l-4.07-7.05a.893.893 0 0 1 .388-1.25A12.475 12.475 0 0 1 11.324 2c.518-.04.96.37.96.89v8.138c0 .913-1.208 1.236-1.664.446zm-.714 3.475L5.704 16a.894.894 0 0 1-1.103-.767 7.68 7.68 0 0 1 .358-3.33.892.892 0 0 1 1.237-.516l3.89 1.898c.75.365.635 1.466-.173 1.667zm.738 1.23c.557-.62 1.584-.205 1.555.627l-.158 4.322c-.02.54-.51.94-1.04.85A7.76 7.76 0 0 1 7.9 20.73a.893.893 0 0 1-.156-1.333l2.897-3.22z" />
              </svg>
            </svg>
          </span>
        </div>
        <div className="arrange_unit arrange_unit--fill">
          <span className="legal-copy">
            <b>Your trust is our top concern,</b> so businesses cant pay to alter or remove their reviews. <a href="https://www.yelp.com/advertiser_faq">Learn more.</a>
          </span>
        </div>
        <div className="arrange_unit">
          <span className="dismiss-link u-text-mid js-dismiss-trust-banner" role="button" aria-label="Close">
            ×
          </span>
        </div>
      </div>
    </div>
    <div className="feed_filters u-space-t1 u-space-b1">
      <div className="section-header_block u-space-0">
        <div className="arrange arrange--middle">
          <div className="arrange_unit arrange_unit--fill feed_search">
            <SearchBar search={props.search} />
          </div>
          <div className="arrange_unit u-nowrap">
            <DropDown label="Sort by: " sort={props.sort} menuItems={['Yelp Sort', 'Newest First', 'Oldest First', 'Highest Rated', 'Lowest Rated', 'Elites']} />
          </div>
          <div className="arrange_unit u-nowrap">
            <DropDown label="Language: " menuItems={['English 12345']} sort={props.sort} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TopReviewBar;
