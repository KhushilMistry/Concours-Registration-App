import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
var _ = require('lodash');
import {Row, Col, Container} from 'react-grid-system';
import Modal from 'react-responsive-modal';


import styles from './Dashboard.scss';
import withStyles from '../../decorators/withStyles';
import {logout, addEvent, removeEvent} from '../../../../actions/loginActions';
import Loader from '../Loader';

@withStyles(styles)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          name: 'Footloose',
          option: ['Solo', 'Duet', 'Group']
        },
        {
          name: 'Naach',
          option: ['Solo', 'Duet/Trio', 'Group']
        },
        {
          name: 'Rhapsody',
          option: ['Western Solo', 'Western Group', 'Instrumental']
        },
        {
          name: 'Raga',
          option: ['Indian Solo', 'Indian Group']
        },
        {
          name: 'Masquerade',
          option: ['Naivete', 'Proscenium', 'Felicity', 'Acte Mono', 'Pehchan Kaun', 'Goofspoof']
        },
        {
          name: 'Battledrome',
          option: ['Mini Militia', 'Clash Royale', 'Counter Strike : Global Offensive', 'Dota 2', 'Age of Empires 2', 'FIFA 15', 'Need for Speed : Most Wanted', 'Counter Strike : Global Offensive 1v1']
        },
        {
          name: 'Rampage',
          option: ['Solo', 'Group']
        },
        {
          name: 'Code Mutants',
          option: []
        },
        {
          name: 'Googlock Holmes',
          option: []
        },
        {
          name: 'Crazy Math',
          option: []
        },
        {
          name: 'DJ Wars',
          option: []
        },
        {
          name: 'Reveles',
          option: ['InSight', 'Scribo Scientia']
        },
        {
          name: 'Showdown',
          option: []
        },
        {
          name: 'Conceive',
          option: []
        },
        {
          name: 'Forage',
          option: []
        },
        {
          name: 'Hackathon',
          option: []
        },
        {
          name: 'Shailee',
          option: [' Writing Contest', 'Spelling Bee', 'Auther`s Session', 'Poetry Slam', 'Workshop', 'Literature Quiz']
        },
        {
          name: 'Accomodation',
          option: ['1 Day(Rs.800)', '2 Days(Rs.1000)', '3/4 Days(Rs.1200)']
        },
        {
          name: 'INC',
          option: []
        }
      ],
      open: false,
      selectEvent: '',
      options: []
    };
  }

  logout = () => {
    this.props.logout();
  };

  onOpenModal = (index) => {
    let newState = this.state;
    this.setState({
      selectEvent: _.get(newState.events, index)
    });
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      options: [],
      selectEvent: '',
    });
  };

  changeOptions = (option) => {
    let newState = this.state.options;
    if (_.includes(newState, option)) {
      _.pull(newState, option);
    }
    else {
      newState.push(option);
    }
    this.setState({
      options: newState
    });
  }

  addEvent = () => {
    let events = _.cloneDeep(this.props.events);
    this.props.addEvent(this.state.selectEvent, this.state.options, this.props.keyChild, events);
    this.onCloseModal();
  }

  deregister = (name) => {
    let events = _.cloneDeep(this.props.events);
    this.props.removeEvent(name, this.props.keyChild, events);
  }


  render() {
    if (this.props.user === '') {
      this.props.router.push('/');
    }

    return (
      <div>
        { this.props.loading ? <Loader /> :
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
                <p className="event-heading">EVENTS</p>
                <table>
                  <tr>
                    <th>Event</th>
                    <th>Register</th>
                  </tr>
                  {
                    this.state.events.map((events, index) => {
                      let bool;
                      _.forEach(this.props.events, function (value) {
                        if (value.name === events.name) {
                          bool = true;
                        }
                      });
                      return <tr key={index}>
                        <td>{events.name}</td>
                        <td className="text-align-center">
                          { !bool &&
                          <button onClick={() => this.onOpenModal(index)} className="btn-success">Register</button> }
                          { bool && <button onClick={() => this.deregister(events.name)} className="btn-danger">
                            Deregister</button>}
                        </td>
                      </tr>
                    })
                  }
                </table>
              </Container>
            </div>
            <Modal open={this.state.open} onClose={this.onCloseModal} className="externalModal">
              <p className="modal-heading">{_.get(this.state.selectEvent, 'name')}</p>
              {
                this.state.selectEvent !== '' && this.state.selectEvent.option.map((option, index) => {
                  return <div className="inputCheckboxContainer" key={index}>
                    <input id={index} type="checkbox" name={option} label={option} className="inputCheckbox"
                      onChange={() => this.changeOptions(option)}
                    />
                    <label htmlFor={index} className="checkboxLable">{option}</label>
                  </div>
                })
              }
              <div className="text-align-center">
                <button className="btn-success" onClick={() => this.addEvent()}>Register</button>
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
  removeEvent
})(withRouter(Dashboard));
