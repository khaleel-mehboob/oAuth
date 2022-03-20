import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
