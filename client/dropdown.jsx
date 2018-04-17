import React from 'react';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    this.state = {
      selectedItem: 0,
      isVisible: 'dropdown_menu js-dropdown-menu',
    };
  }

  toggleVisible(selected) {
    if (this.state.isVisible === 'dropdown_menu js-dropdown-menu') {
      this.setState({ isVisible: 'dropdown_menu js-dropdown-menu is-visible', selectedItem: selected});
    } else {
      this.setState({ isVisible: 'dropdown_menu js-dropdown-menu', selectedItem: selected });
    }
  }

  sortBy(itemIndex) {
    this.props.sort(itemIndex);
  }

  render(props) {
    return (
      <div className="feed_sort js-review-feed-sort" style={{ position: 'relative', display: 'inline-block' }}>
        <div className="dropdown js-dropdown dropdown--tab dropdown--arrow dropdown--hover dropdown--restricted is-active" data-component-bound="true">
          <div className="dropdown_toggle js-dropdown-toggle is-active" aria-haspopup="true" role="button" tabIndex="-1">
            <span className="dropdown_toggle-action" data-dropdown-prefix="Sort by" onClick={ () => {this.toggleVisible( this.state.selectedItem);}} >
              <span className="dropdown_prefix">
                {this.props.label}
              </span>
              <span className="dropdown_toggle-text js-dropdown-toggle-text">{this.props.menuItems[this.state.selectedItem]}</span>
              <span aria-hidden="true" style={{ width: 14, height: 14 }} className="icon icon--14-triangle-down icon--size-14 icon--currentColor u-triangle-direction-down dropdown_arrow">
                <svg className="icon_svg">
                  <svg id="14x14_triangle_down" height="100%" viewBox="0 0 14 14" width="100%">
                    <path d="M7 9L3.5 5h7L7 9z" />
                  </svg>
                </svg>
              </span>
            </span>
            <div className="dropdown_menu-container" style={{ position: 'relative' }}>
              <div className={this.state.isVisible} style={{ position: 'relative' }}>
                <div className="dropdown_menu-inner" style={{ position: 'relative' }}>
                  <ul className="dropdown_menu-group" role="menu" aria-hidden="false" style={{ position: 'relative' }}>
                    {this.props.menuItems.map( (item, index) => <DropDownItem item={item} itemIndex={index} context={this} itemSelected={(index === this.state.selectedItem) ? 'tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown is-selected' : 'tab-link js-dropdown-link tab-link--dropdown js-tab-link--dropdown'} />)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DropDownItem = props => (
  <li className="dropdown_item, menuItem" role="presentation" style={{ position: 'relative', zIndex: 1000 }}>
    <a className={props.itemSelected} onClick={ () => { props.context.toggleVisible( props.itemIndex ); props.context.sortBy( props.itemIndex ); }} data-review-feed-label={props.item} data-sort="relevance">
      <span className="tab-link_label menuItem" title="{props.item}">{props.item}</span>
    </a>
  </li>
);

export default DropDown;
