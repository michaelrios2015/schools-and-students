import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loaded, loadSchools, loadStudents } from './store';
import Schools from './schools';
import School from './school';
import Students from './students';
import Nav from './nav';
import { HashRouter as Router, Route, Link } from 'react-router-dom';


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
              <Route component = {Nav} />
              <Route component={Home} path = '/' exact />
              <Route component={Schools} path = '/schools' exact />
              <Route component={ School } path = '/schools/:id' />
              <Route component={Students} path = '/students' />
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