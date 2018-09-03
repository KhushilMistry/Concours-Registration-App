import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import styles from './app.scss';
import Auth from '../middlewares/Auth';
import withStyles from './decorators/withStyles';

@withStyles(styles)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        {React.cloneElement(this.props.children)}
      </div>
    );
  }
}


export default connect()(withRouter(App));
