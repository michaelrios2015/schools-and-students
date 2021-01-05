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
            <h2>{ student.name } </h2>
            {student.school ? <Link to ={`/schools/${student.school.id}`}>{student.school.name}</Link> : 'NOT ENROLLED' }
            <br />
            <button onClick={()=>destroy(student)}>Delete</button>
            <br />
            <Link to={`/students/${student.id}/update`}>Update</Link>
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
                    //not how it's actualy supposed to be done will need another dispatch that filers students
                    //erased students
                    // dispatch(loadStudents());
                    //THIS IS HOW IT'S SUPPOSED TO BE DONE I THINK
                    // dispatch(takeOutSchoolFromStudent(school));
                }
              
            };
        }
    )(Student);
    