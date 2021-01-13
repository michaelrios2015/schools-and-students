import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ( {students} ) => {
    // console.log(students);
    
    return(
        <div className = { 'list' }>
            <ul>
            {  
                students.map( student => { 
                    return (
                    <li key={ student.id }>
                        <Link to={`/students/${ student.id }`}>
                        { student.name } 
                        </Link>
                        <br />
                        { student.school ? 'Goes to: ' : 'Not Enrolled'}
                        { student.school ? <Link to ={`/schools/${student.school.id}`}>{student.school.name}</Link> : '' }
                        
                    </li>
                );
            })
            }
        </ul>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return state;
};

//call loadStudents here, now need to add a load async
//nick showed me how to simplfy the logic, don't have time to impliment it but hope to go back to it latter  
const mapDispatchToProps = (dispatch) => {
    return {
      bootstrap: ()=> {
        //dispatch(loadSchools());
        
        dispatch(loadStudents());
        
        //dispatch(loaded());
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Students);




