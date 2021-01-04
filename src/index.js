import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loaded, loadSchools, loadStudents } from './store';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';

import Schools from './Schools';
import School from './School';
import CreateSchool from './CreateSchool';
import UpdateSchool from './UpdateSchool';

import Students from './Students';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';

const Home = () => {
  return (
    <p>HOMIE</p>
  )

}

//this needs a store and a bunch of other stuff
class _App extends Component{
  constructor(){
    super();
  }
  async componentDidMount(){
    this.props.bootstrap();
  }

  render(){
    const { loading } = this.props;
    if(loading){
      return '....loading';
    }
    return (
          <Router>
            <div>
              <Route component = { Nav } />
              <Route component={ Home } path = '/' exact />

              <Route component={ Schools } path = '/schools' exact />
              <Switch>
                <Route component={ CreateSchool } path = '/schools/create' />
                <Route component={ School } path = '/schools/:id' exact/>
              </Switch>
              <Route component={ UpdateSchool} path = '/schools/:id/update' />
              
              <Route component={ Students } path = '/students' exact/>
              <Switch>
                <Route component={ CreateStudent } path = '/students/create' />
                <Route component={ Student } path = '/students/:id' exact/>
              </Switch>
              <Route component={ UpdateStudent } path = '/students/:id/update'/>
            </div>
          </Router>
        );
  }
}

const mapStateToProps = ({ loading }) => {
  return {
    loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadSchools());
      
      dispatch(loadStudents());
      
      dispatch(loaded());
    }
  };
}



const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(<Provider store= {store}><App /></Provider>, document.querySelector('#root'));