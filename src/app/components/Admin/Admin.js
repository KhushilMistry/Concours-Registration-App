import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
var _ = require('lodash');
import { Container } from 'react-grid-system';


import styles from './Admin.scss';
import withStyles from '../../decorators/withStyles';
import { getAdminData } from '../../../../actions/loginActions';
import Loader from '../Loader';

@withStyles(styles)
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.users === '') {
      this.props.getAdminData();
    }
  }


  render() {
    return (
      <div>
        {this.props.loading ? <Loader /> :
          <div>
            <p className='adminHeading'>EVENT REGISTRATIONS</p>
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
