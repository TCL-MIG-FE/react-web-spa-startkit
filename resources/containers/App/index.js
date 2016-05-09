import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Nav from '../../components/Nav';

import { Grid } from 'react-bootstrap';

var App = React.createClass({
  render() {
    return (
      <div>
        <header>
          <Nav {...this.props}/>
        </header>
        <section>
          <Grid>
            {this.props.children}
          </Grid>
        </section>
      </div>
    );
  }
});

// connect action to props
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
