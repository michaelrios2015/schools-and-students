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

export default connect(mapStateToProps)(Students);




