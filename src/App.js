import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home'
import Sobre from './Sobre'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
            <header>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container'>
                  <Link className="navbar-brand" to="/">Gerenciador de Produtos</Link>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Produtos</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/sobre">Sobre</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>
            <main role="main" className="container">
              <Route exact path='/' component={Home} />
              <Route exact path='/sobre' component={Sobre} />
              {/* <h1 className="mt-5">Sticky footer with fixed navbar</h1> */}
              {/* <p className="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code>padding-top: 60px;</code> on the <code>body &gt; .container</code>.</p>
              <p>Back to <a href="../sticky-footer">the default sticky footer</a> minus the navbar.</p> */}
            </main>
        </Fragment>
      </Router>
    );
  }
}

export default App;
