import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
var _ = require('lodash');


import styles from '../../style/common-login.scss';
import withStyles from '../../decorators/withStyles';
import { signUp } from '../../../../actions/loginActions';
import Auth from '../../../middlewares/Auth';
import Loader from '../Loader';

@withStyles(styles)
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      name: '',
      email: '',
      password: '',
      college: '',
      number: ''
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  changeState = (event) => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  check = () => {
    if (this.state.name === '' || this.state.password === '' || this.state.batch === '' || this.state.email === '' || this.state.college === '') {
      return false;
    }
    else {
      return true;
    }

  }



  sign_Up = () => {
    if (!this.check()) {
      this.setState({
        error: 'Please, Fill all the details.'
      });
      return;
    }

    const query = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      number: this.state.number,
      college: this.state.college
    }

    this.props.signUp(query);
    this.setState({
      name: '',
      email: '',
      password: '',
      number: '',
      college: '',
      error: ''
    });


  };


  render() {
    if (this.props.user !== '') {
      this.props.router.push('/dashboard');
    }
    return (
      <div>
        {this.props.loading ? <Loader /> :
          <div className="login-box">
            <img src={require("../../../../images/logo.png")} className="logo-image" />
            <p className="login-heading">Sign Up</p>
            <input className="login-input" name='name' placeholder="Name" onChange={(event) => this.changeState(event)}
              value={this.state.name}
            /><br />
            <input className="login-input" name='email' placeholder="Email"
              onChange={(event) => this.changeState(event)}
              value={this.state.email}
            /><br />
            <input className="login-input" name='password' placeholder="Password" type="password"
              onChange={(event) => this.changeState(event)}
              value={this.state.password}
            /><br />
            <input className="login-input" name='number' placeholder="Mobile Number" type="number"
              onChange={(event) => this.changeState(event)}
              value={this.state.number}
            /><br />
            <input className="login-input" name='college' placeholder="College Name"
              onChange={(event) => this.changeState(event)}
              value={this.state.college}
            /><br />
            <button className="login-button" onClick={this.sign_Up}>Sign Up</button>
            {this.state.error !== '' ? <div className="error-message">{this.state.error}</div> :
              <div className="error-message">{this.props.error}</div>}
            <p className="login-text">Already Signed Up ? <Link className="login-link" to="/">Log in</Link></p>
          </div>
        }
      </div>
    );
  }

}

const mapStateToProps = ({ loginStates }) => {
  return {
    user: loginStates.user,
    error: loginStates.error,
    loading: loginStates.loading
  }
};

export default connect(mapStateToProps, {
  signUp
})(withRouter(SignUp));