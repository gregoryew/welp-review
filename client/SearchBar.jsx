import React from 'react';
import $ from 'jquery';

const SearchBar = props => (
  <div className="section-header_search u-space-r5">
    <div className="arrange_unit arrange_unit--fill">
      <input id="search" type="text" placeholder="Search within the reviews" name="q" autoComplete="on" style={{ height: 25, width: 270 }} onChange={(evt) => { console.log(evt.target.value); }} />
    </div>
    <div className="arrange_unit">
      <button className="ybtn ybtn--primary ybtn--small" onClick={() => { props.search($('#search').val()); }}>
        <span>
          <span aria-hidden="true" style={{ width: 18, height: 18 }} className="icon icon--18-search-small icon--size-18 icon--currentColor">
            <svg className="icon_svg">
              <svg id="18x18_search_small" height="100%" viewBox="0 0 18 18" width="100%">
                <path d="M15.913 14.224a1.324 1.324 0 0 0-.3-.466h.01l-3.378-3.376a5.49 5.49 0 0 0 .802-2.857 5.523 5.523 0 1 0-5.522 5.52 5.49 5.49 0 0 0 2.856-.8l3.37 3.368.006.003a1.364 1.364 0 0 0 .93.384C15.41 16 16 15.41 16 14.684c0-.163-.032-.317-.086-.46zM7.525 10.94a3.422 3.422 0 0 1-3.418-3.416 3.422 3.422 0 0 1 3.418-3.417 3.422 3.422 0 0 1 3.416 3.417 3.42 3.42 0 0 1-3.413 3.416z" />
              </svg>
            </svg>
          </span>
        </span>
      </button>
    </div>
  </div>
);

export default SearchBar;

