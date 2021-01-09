import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroySchool, takeOutSchoolFromStudent } from './store';


const School = ({ school, destroy }) =>{
    console.log(school.students);
    if(!school.id){
        return '...loading school';
    }
    if(!school.students){
        school.students = [];
    }
    return(
        <div>
            <header>
            <h1> SCHOOL </h1>
            <h2>{ school.name } </h2>
            students
            </header>
            <ul>
            {/* there should be some east logic to say no students
            not sure how to format  */}
            {school.students.map( student => { 
                return (
                    <li key={ student.id} >
                       <Link to ={`/students/${student.id}`}>{student.name}</Link>
                    </li>
                );    
            }) 
                
            }
            </ul>    
            <br />
            <button onClick={()=>destroy(school)}>Delete</button>
            <br />
            <Link to={`/schools/${school.id}/update`}>Update</Link>
        </div>

        )
}


export default connect(
    (state, otherProps)=> {
        //console.log(otherProps)
        const school = state.schools.find(school => school.id === otherProps.match.params.id * 1) || {};
        return {
            school
            };
        },
        (dispatch, { history })=> {
            return {
                destroy: (school)=> {
                    dispatch(destroySchool(school, history));
                    //not how it's actualy supposed to be done will need another dispatch that filers students
                    //erased students
                    // dispatch(loadStudents());
                    //THIS IS HOW IT'S SUPPOSED TO BE DONE I THINK
                    //dispatch(takeOutSchoolFromStudent(school));
                }
              
            };
        }
    )(School);
    