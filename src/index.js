import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loaded, loadSchools, loadStudents, setView } from './store';
import Schools from './schools';
import Students from './students';
import Nav from './nav';


//this needs a store and a bunch of other stuff
class _App extends Component{
  constructor(){
    super();
  }
  async componentDidMount(){
  
    this.props.bootstrap();
    window.addEventListener('hashchange', ()=> {
        this.props.setView(window.location.hash.slice(1));
    })
    this.props.setView(window.location.hash.slice(1));
  }

  render(){
    const { loading, view } = this.props;
    // console.log(view);
    
    if(loading){
      return '....loading';
    }
    return (
          <div>
            <Nav />
            { view === 'schools' && <Schools /> }
            { view === 'students' && <Students />}
          </div>
        );
  }
}

const mapStateToProps = ({loading, view}) => {
  return {
    loading,
    view
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadSchools());
      
      dispatch(loadStudents());
      
      dispatch(loaded());
    },
    setView: function(view) {
      dispatch(setView(view));
    }
  };
}



const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(<Provider store= {store}><App /></Provider>, document.querySelector('#root'));