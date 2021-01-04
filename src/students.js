import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ( {students} ) => {
    // console.log(students);
    return(
        <ul>
        {  
        students.map( student => { 
            return (
            <li key={ student.id }>
                <Link to={`/students/${ student.id }`}>
                { student.name } - ({ student.school ? student.school.name : "no school" })
                </Link>
            </li>
            );
        })
        }
    </ul>
    )
}

const mapStateToProps = (state)=> {
    return state;
};

export default connect(mapStateToProps)(Students);




