import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
var _ = require('lodash');
import { Row, Col, Container } from 'react-grid-system';
import Modal from 'react-responsive-modal';


import styles from './Dashboard.scss';
import withStyles from '../../decorators/withStyles';
import { logout, addEvent, removeEvent, updateAccomodation, sendEmailConfirmation } from '../../../../actions/loginActions';
import { events } from '../../../utils/constantUtils';
import Loader from '../Loader';

@withStyles(styles)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openConfirm: false,
      accomodation: 0
    };
  }

  logout = () => {
    this.props.logout();
  };

  toggleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };

  register = (name, fees) => {
    this.props.addEvent(name, this.props.keyChild, this.props.events, fees);
  }

  deregister = (name, fees) => {
    this.props.removeEvent(name, this.props.keyChild, this.props.events, fees);
  }

  submitAccomodation = () => {
    this.props.updateAccomodation(this.state.accomodation, this.props.keyChild);
    this.toggleModal();
  }

  onChangeAccomodation = (event) => {
    if (event.target.value >= 0) {
      this.setState({
        accomodation: event.target.value
      });
    }
  }

  toggleModalConfirm = () => {
    this.setState({
      openConfirm: !this.state.openConfirm
    });
  };

  sendConfirmationMail = () => {
    this.toggleModalConfirm();
    this.props.sendEmailConfirmation(this.props.user.Email, this.props.events, this.props.user.Name, events, this.props.user.Accomodation);
  }

  render() {

    if (this.props.user === '') {
      this.props.router.push('/');
    }

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
                  <Col>
                    <p className="userInfo">Accomodation : <span className="bold">{this.props.user.Accomodation}</span> <span>
                      <button onClick={() => this.toggleModal()} className="btn-success change-button">Change
                    </button>
                    </span></p>
                  </Col>
                </Row>
                <p className="event-heading">EVENTS</p>
                <table>
                  <tr>
                    <th>Event</th>
                    <th>Fees (in Rs)</th>
                    <th>Register</th>
                  </tr>
                  {
                    events.map((events, index) => {
                      return <tr key={index}>
                        <td>{events.name}</td>
                        <td>{events.Fees === 0 ? 'TBA' : events.Fees}</td>
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
                <p className="event-heading">RULES</p>
                <ul className="rules-list">
                  <li>The registration of all events of your college must be done at one time. Multiple entries from one college will not be accepted.</li>
                  <li>Once the team list is submitted at the time of registration, no changes will be allowed.</li>
                  <li>Right of any changes is given to the organizing committee.</li>
                  <li>All colleges must provide ID cards for each player. The teams must produce these documents prior to their matches and whenever called upon. For the ID card to be genuine,then that should be approved by the college authorities via an official signed letter with photo ID proof for the particular participant. In case the person has a photocopy of his/her ID card, it must be duly attested by the Dean of the college.Also, you need to bring latest fee receipt which will be generated as soon as you register.</li>
                  <li>Without the payment of the registration fee your entry will not be considered.</li>
                  <li>You will be contacted later for accomodation regarding its fees.</li>
                  <li className="red">You have to confirm your registration by clicking on following button. Without that your entry will not be considered. You will receive an email containing your registration details. You have to show that at the time of reporting.</li>
                </ul>
              </Container>
              <button onClick={() => { this.sendConfirmationMail() }} className="btn-success confirm-button">Confirm
              </button>
            </div>
            <Modal open={this.state.open} onClose={this.toggleModal} className="externalModal">
              <p className="modal-heading">Accomodation</p>
              <div className="inputCheckboxContainer">
                <input type="number" className="inputText"
                  onChange={(event) => this.onChangeAccomodation(event)}
                />
              </div>
              <div className="text-align-center">
                <button className="btn-success" onClick={() => this.submitAccomodation()}>Register</button>
              </div>
            </Modal>
            <Modal open={this.state.openConfirm} onClose={this.toggleModalConfirm} className="externalModal">
              <p className="modal-heading">Confirmation mail has been sent.</p>
              <div className="text-align-center">
                <button className="btn-success" onClick={() => this.toggleModalConfirm()}>Done</button>
              </div>
            </Modal>
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
  removeEvent,
  updateAccomodation,
  sendEmailConfirmation
})(withRouter(Dashboard));
