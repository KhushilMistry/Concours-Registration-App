import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
var _ = require('lodash');
import { Row, Col, Container } from 'react-grid-system';
import Modal from 'react-responsive-modal';


import styles from './Dashboard.scss';
import withStyles from '../../decorators/withStyles';
import { logout, addEvent, removeEvent } from '../../../../actions/loginActions';
import Loader from '../Loader';

@withStyles(styles)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          name: 'Badminton - Men',
          Fees: 1500,
        },
        {
          name: 'Badminton - Women',
          Fees: 1000,
        },
        {
          name: 'Basketball - Men',
          Fees: 1500
        },
        {
          name: 'Basketball - Women',
          Fees: 1000
        },
        {
          name: 'Carrom',
          Fees: 1000
        },
        {
          name: 'Chess',
          Fees: 1000
        },
        {
          name: 'Cricket',
          Fees: 3500
        },
        {
          name: 'Football - Men',
          Fees: 2500
        },
        {
          name: 'Football - Women',
          Fees: 1200
        },
        {
          name: 'Kabaddi',
          Fees: 1000
        },
        {
          name: 'Lawn Tennis - Men',
          Fees: 1500
        },
        {
          name: 'Lawn Tennis - Women',
          Fees: 1000
        },
        {
          name: 'Table Tennis - Men',
          Fees: 1500
        },
        {
          name: 'Table Tennis - Women',
          Fees: 1000
        },
        {
          name: 'Volleyball - Men',
          Fees: 1500
        },
        {
          name: 'Volleyball - Women',
          Fees: 1000
        }
      ]
    };
  }

  logout = () => {
    this.props.logout();
  };

  register = (name, fees) => {
    this.props.addEvent(name, this.props.keyChild, this.props.events, fees);
  }

  deregister = (name, fees) => {
    this.props.removeEvent(name, this.props.keyChild, this.props.events, fees);
  }

  render() {

    if (this.props.user === '') {
      this.props.router.push('/');
    }

    console.log(this.props.user.Amount);

    return (
      <div>
        {this.props.loading ? <Loader /> :
          <div>
            <div>
              <div className="adminNavBar">
                <a onClick={() => this.logout()}>Logout</a>
              </div>
            </div>
            <div className="event-list">
              <Container>
                <Row>
                  <Col>
                    <p className="userInfo">Name : <span className="bold">{this.props.user.Name}</span></p>
                  </Col>
                  <Col>
                    <p className="userInfo">Email : <span className="bold">{this.props.user.Email}</span></p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="userInfo">Phone Number : <span className="bold">{this.props.user.Number}</span></p>
                  </Col>
                  <Col>
                    <p className="userInfo">College : <span className="bold">{this.props.user.College}</span></p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="userInfo">Amount to be Paid : <span className="bold">{this.props.user.Amount} Rs</span> </p>
                  </Col>
                </Row>
                <p className="event-heading">EVENTS</p>
                <table>
                  <tr>
                    <th>Event</th>
                    <th>Fees (in Rs.)</th>
                    <th>Register</th>
                  </tr>
                  {
                    this.state.events.map((events, index) => {
                      return <tr key={index}>
                        <td>{events.name}</td>
                        <td>{events.Fees}</td>
                        <td className="text-align-center">
                          {!this.props.events.includes(events.name) ?
                            <button onClick={() => this.register(events.name, events.Fees)} className="btn-success">Register
                          </button>
                            :
                            <button onClick={() => this.deregister(events.name, events.Fees)} className="btn-danger">Deregister
                          </button>
                          }
                        </td>
                      </tr>
                    })
                  }
                </table>
              </Container>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ loginStates }) => {
  return {
    user: loginStates.user,
    keyChild: loginStates.key,
    error: loginStates.error,
    loading: loginStates.loading,
    events: loginStates.events
  }
};

export default connect(mapStateToProps, {
  logout,
  addEvent,
  removeEvent
})(withRouter(Dashboard));
