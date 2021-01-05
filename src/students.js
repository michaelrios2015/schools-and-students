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
                { student.name } 
                </Link>
                ------------------({ student.school ? <Link to ={`/schools/${student.school.id}`}>{student.school.name}</Link> : "no school" })
                
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




