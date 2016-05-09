import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DashboardModal from '../../components/DashboardModal';
import BarCharts from '../../components/BarCharts';
import dashboardActions from '../../actions/dashboard';
import style from './style.less';

var Dashboard = React.createClass({
  getInitialState() {
    return {
      showModal: false
    }
  },
  onShowModal() {
    this.setState({showModal: true});
  },
  onCloseModal() {
    this.setState({showModal: false});
  },
  onGetChartData() {
    this.props.actions.getChartData().then(() => {
      this.refs.barCharts.setOption(this.props.data.chartData);
    });
  },
  componentDidMount() {
    this.onGetChartData();
  },
  render() {
    var {actions, data} = this.props;
    var {showModal} = this.state;
    return (
      <div>
        <h2>Dashboard</h2>
        <Button bsStyle="success" onClick={this.onShowModal}><i className="icon icon-kehufuwu"></i> Show Modal</Button>
        <DashboardModal showModal={showModal} onClose={this.onCloseModal}/>
        <br/><br/>
        <Button onClick={this.onGetChartData}><i className="glyphicon glyphicon-ice-lolly"></i> Reload Chart Data</Button>
        <BarCharts ref="barCharts"/>
      </div>
    );
  }
});

// connect action to props
const mapStateToProps = (state) => ({data: state.dashboard});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(dashboardActions, dispatch)});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
