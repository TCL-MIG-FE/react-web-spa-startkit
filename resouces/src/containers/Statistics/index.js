import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import statisticsActions from '../../actions/statistics';

import style from './style.less';

var Test = React.createClass({
  reloadData() {
    this.props.actions.getUser({
      username: 'millet',
      password: 'jjer'
    });
  },
  render() {
    var {statistics, actions} = this.props;
    return (
      <div>
        <p>{statistics.text}</p>
        <p>{statistics.users.join(' | ')}</p>
        <p>{statistics.a.b} {statistics.a.c}</p>
        <p>Click count {statistics.clickCnt}</p>
        <br/>
        <ButtonGroup>
          <Button onClick={this.reloadData}>Load User</Button>
          <Button onClick={actions.addUser}>Add User</Button>
          <Button onClick={actions.clickTest}>Just Click</Button>
        </ButtonGroup>
      </div>
    );
  }
});

// connect action to props
const mapStateToProps = (state) => ({statistics: state.statistics});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(statisticsActions, dispatch)});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
