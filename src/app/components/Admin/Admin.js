import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
var _ = require('lodash');
import { Container } from 'react-grid-system';


import styles from './Admin.scss';
import withStyles from '../../decorators/withStyles';
import { getAdminData } from '../../../../actions/loginActions';
import Loader from '../Loader';
import { events } from '../../../utils/constantUtils';

@withStyles(styles)
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectEvent: ''
    };
  }

  componentDidMount() {
    if (this.props.users === '') {
      this.props.getAdminData();
    }
  }

  changeEvent = (event) => {
    this.setState({
      selectEvent: event.target.value
    });
  }

  render() {
    return (
      <div>
        {this.props.loading ? <Loader /> :
          <div>
            <p className='adminHeading'>EVENT REGISTRATIONS</p>
            <p className="adminSelect"> Select Event : <select name="event"
              onChange={(event) => this.changeEvent(event)}
              value={this.state.selectEvent}>
              <option value="">All Events</option>
              {
                events.map((value, key) => {
                  return <option key={key} value={value.name}>{value.name}</option>
                })
              }
            </select>

              <button onClick={() => this.props.getAdminData()} className="reload-button">Reload</button>
            </p>
            <Container>
              <table>
                <tr>
                  <th>Name</th>
                  <th>College</th>
                  <th>Contact No.</th>
                  <th>Email</th>
                  <th>Accomodation</th>
                  <th>Events</th>
                  <th>Amount</th>
                </tr>
                {
                  _.map(this.props.users, ((user, index) => {
                    if (this.state.selectEvent === '' || user.Events.indexOf(this.state.selectEvent) > -1) {
                      let events = "";
                      _.forEach(user.Events, function (value) {
                        events = events + value + ", ";
                      });
                      return <tr key={index}>
                        <td>{user.Name}</td>
                        <td>{user.College}</td>
                        <td>{user.Number}</td>
                        <td>{user.Email}</td>
                        <td>{user.Accomodation}</td>
                        <td>{events}</td>
                        <td>{user.Amount}</td>
                      </tr>
                    }
                  }))
                }
              </table>
            </Container>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ loginStates }) => {
  return {
    users: loginStates.users,
    loading: loginStates.loading
  }
};

export default connect(mapStateToProps, {
  getAdminData
})(withRouter(Admin));
