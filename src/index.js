import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import store from './store';
import Schools from './schools';
import Students from './students';
import Nav from './nav';


//this needs a store and a bunch of other stuff
class _App extends Component{
  constructor(){
    super();
    this.state = { view: ''};
  }
  async componentDidMount(){
    
    window.addEventListener('hashchange', ()=> {
        this.setState({ view: window.location.hash.slice(1)});
    })
    this.setState({ view: window.location.hash.slice(1)});

    const schools = (await axios.get('/api/schools')).data;
    
    store.dispatch({
        type: 'LOAD_SCHOOLS',
        schools
    })
    const students = (await axios.get('/api/students')).data;
    
    store.dispatch({
        type: 'LOAD_STUDENTS',
        students
    })
    
    store.dispatch({
        type: 'LOADED',
    })


  }

  render(){
    const { view } = this.state;
    const { loading } = this.props;
    if(loading){
      return '....loading';
    }
    return (
        <div>
            <Nav />
            { view === 'schools' ? <Schools /> : '' }
            { view === 'students' ? <Students /> : '' }
      </div>
    );
  }
}

const App = connect()(_App);

render(<Provider store= {store}><App /></Provider>, document.querySelector('#root'));