import React from 'react';
import { connect } from 'react-redux';
import { destroySchool, loadStudents } from './store';

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
                    dispatch(loadStudents());
                }
              
            };
        }
    )(School);
    