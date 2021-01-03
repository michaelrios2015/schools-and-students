import React from 'react';
import { connect } from 'react-redux';
import { destroySchool, loadStudents, takeOutSchoolFromStudent } from './store';

const School = ({ school, destroy }) =>{
    if(!school.id){
        return null;
    }
    return(
        <div>
            { school.name } details to follow
            <button onClick={()=>destroy(school)}>Delete</button> 
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
                    dispatch(takeOutSchoolFromStudent(school));
                }
              
            };
        }
    )(School);
    