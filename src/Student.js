import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyStudent } from './store';

const Student = ({ student, destroy }) =>{
    if(!student.id){
        return '...loading school';
    }
    return(
        <div>
            <header>
                <h1> STUDENT </h1>
                <h2>{ student.name } </h2>
                <hr />
            </header>
            <main>
                <h4>Details</h4>
                {student.email && `email: ${student.email}` }
                <br />
                {student.gpa && `gpa: ${student.gpa}` }
                {/* { student.email } ---- { student.gpa } */}
                <p>{student.school && 'Attends: ' }
                {student.school ? <Link to ={`/schools/${student.school.id}`}>{student.school.name}</Link>: 'Not enrolled in a school' }</p>
                <br />
                <button onClick={()=>destroy(student)}>Delete Student</button>
                <br />
                <p><Link to={`/students/${student.id}/update`}>Update Student</Link></p>
            </main>
        </div>

        )
}

export default connect(
    (state, otherProps)=> {
        //console.log(otherProps)
        const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
        return {
            student
            };
        },
        (dispatch, { history })=> {
            return {
                destroy: (student)=> {
                    //console.log(student);
                    dispatch(destroyStudent(student, history));
                }
              
            };
        }
    )(Student);
    