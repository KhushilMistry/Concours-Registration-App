import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
var _ = require('lodash');


import styles from '../../style/common-login.scss';
import withStyles from '../../decorators/withStyles';
import { signIn } from '../../../../actions/loginActions';
import Loader from '../Loader';
import firebase from '../../../firebase.js';

@withStyles(styles)
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
  }


  changeState = (event) => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  check = () => {
    if (this.state.email === '' || this.state.password === '') {
      return false;
    }
    else {
      return true;
    }

  }



  sign_In = () => {

    if (!this.check()) {
      this.setState({
        error: 'Please, Fill all the details.'
      });
      return;
    }

    const query = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.signIn(query);

    this.setState({
      name: '',
      email: '',
      password: '',
      number: '',
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
              <p className="login-heading">Log In</p>
              <input className="login-input" placeholder="Email" name="email"
                onChange={(event) => this.changeState(event)}
                value={this.state.email}
              /><br />
              <input className="login-input" placeholder="Password" name="password" type="password"
                onChange={(event) => this.changeState(event)}
                value={this.state.password}
              /><br />
              <button className="login-button" onClick={this.sign_In}>Log in</button>
              {
                this.state.error !== '' ? <div className="error-message">{this.state.error}</div> :
                  <div className="error-message">{this.props.error}</div>
              }
              <p className="login-text">Already Signed In ? <Link className="login-link" to="/signup">Sign Up</Link></p>
            </div>
        }
      </div>
    );
  }

}

const mapStateToProps = ({ loginStates }) => {
  return {
    user: loginStates.user,
    loading: loginStates.loading,
    error: loginStates.error
  }
};

export default connect(mapStateToProps, {
  signIn
})(withRouter(LoginPage));
