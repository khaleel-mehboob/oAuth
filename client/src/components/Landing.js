import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

class Landing extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return <LoggedOut />;
      default:
        return <LoggedIn />;
    };
  };

  render() {
    console.log(this.props);
    return (
      <div className='container center'>
        {this.renderContent()}  
      </div>
    );
  };
};

function mapStateToProps ({ auth }) {
  return { auth }
};

export default connect(mapStateToProps)(Landing);