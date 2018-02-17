import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
var _ = require('lodash');
import {Row, Col, Container} from 'react-grid-system';
import Modal from 'react-responsive-modal';


import styles from './Admin.scss';
import withStyles from '../../decorators/withStyles';
import {getAdminData} from '../../../../actions/loginActions';
import Loader from '../Loader';

@withStyles(styles)
class Admin extends React.Component {
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
          name : 'INC',
          option : []
        }
      ],
      selectEvent: ''
    };
  }

  componentDidMount() {
    if (this.props.users === '') {
      this.props.getAdminData();
    }
  }

  changeEvent = (event) => {
    this.state.events.map((value) => {
      if (value.name === event.target.value) {
        this.setState({
          selectEvent: value
        });
      }
    });


  }


  render() {
    return (
      <div>
        { this.props.loading ? <Loader /> :
          <div>
            <p className='adminHeading'>EVENT REGISTRATIONS</p>
            <p className="adminSelect"> Select Event : <select name="event"
              onChange={(event) => this.changeEvent(event)}
              value={this.state.selectEvent.name}>
              <option value="" disabled selected>Select Event</option>
              {
                this.state.events.map((value, key) => {
                  return <option key={key} value={value.name}>{value.name}</option>
                })
              }
            </select></p>
            <Container>
              { this.state.selectEvent !== '' && <table>
                <tr>
                  <th>Name</th>
                  <th>College</th>
                  <th>Contact No.</th>
                  <th>Email</th>
                  { _.get(this.state.selectEvent.option, 0) && <th>Category</th> }
                </tr>
                {
                  this.props.users.map((user, index) => {
                    let bool;
                    let eventIndexPin;
                    let eventName = this.state.selectEvent.name;
                    _.forEach(user.Events, function (value, eventIndex) {
                      if (value && value.name === eventName) {
                        bool = true;
                        eventIndexPin = eventIndex;
                      }
                    });
                    if (bool) {
                      let userEvent = _.get(user.Events, eventIndexPin);
                      return <tr key={index}>
                        <td>{user.Name}</td>
                        <td>{user.College}</td>
                        <td>{user.Number}</td>
                        <td>{user.Email}</td>
                        { _.get(this.state.selectEvent.option, 0) &&
                        <td>
                          {
                            userEvent.options && userEvent.options.map(function (value) {
                              return value + ' '
                            })
                          }
                        </td>
                        }
                      </tr>
                    }
                  })
                }
              </table>}
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
