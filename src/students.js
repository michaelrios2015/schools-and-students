import React from 'react';
import { connect } from 'react-redux';

const Students = ( {students} ) => {
    console.log(students);
    return(
        <ul>
        {  
        students.map( student => { 
            return (
            <li key={ student.id }>
                { student.name } - ({ student.school ? student.school.name : "no school" })
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




