import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import style from './style.less';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, hashHistory, RouterContext } from 'react-router';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  routeTo(path) {
    hashHistory.push(path);
  },
  isActive(path) {
    return this.context.router.isActive(path);
  },
  render() {
    return (
      <Navbar className={classnames(style.nav, 'clearfix')}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" onClick={this.routeTo.bind(null, '/')}>Webpack React Scaffold</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="javascript:;"
                   className={this.isActive('/dashboard')?'active':''}
                   onClick={this.routeTo.bind(null, '/dashboard')}>Dashboard</NavItem>
          <NavItem eventKey={2} href="javascript:;"
                   className={this.isActive('/statistics')?'active':''}
                   onClick={this.routeTo.bind(null, '/statistics')}>Statistics</NavItem>
          <NavDropdown eventKey={3} title="Config" id="config-drop-menu"
                       className={this.isActive('/config')?'active':''}
                       onClick={this.routeTo.bind(null, '/config')}>
            <MenuItem eventKey={3.1} href="javascript:;"
                      className={this.isActive('/config/abc')?'active':''}
                      onClick={(event) => {event.stopPropagation(); this.routeTo('/config/abc')}}>config.abc</MenuItem>
            <MenuItem eventKey={3.1} href="javascript:;"
                      className={this.isActive('/config/def')?'active':''}
                      onClick={(event) => {event.stopPropagation(); this.routeTo('/config/def')}}>config.def</MenuItem>
          </NavDropdown>
          <NavItem eventKey={4} href="javascript:;"
                   className={this.isActive('/unknown')?'active':''}
                   onClick={this.routeTo.bind(null, '/unknown')}>Unknown Route</NavItem>
        </Nav>
      </Navbar>
    );
  }
});
