import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroySchool, updateStudent } from './store';


const School = ({ school, destroy, update }) =>{
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
                <hr></hr>
            </header>
            
            <main>
                <h4>Details</h4>
                <p>{ school.address ? `Address: ${ school.address }` : ''}</p>
                <p>{ school.description ? `About our school: ${ school.description }` : " "}</p>
                { school.students.length > 0 ? 'Students:' : ' ' }
                <ul>
                {/* there should be some east logic to say no students
                not sure how to format  */}
                {school.students.map( student => { 
                    return (
                        <li key={ student.id} >
                            <Link to ={`/students/${student.id}`}>{student.name}</Link> ---
                            <button onClick={()=>update(student.id, student.name, student.gmail, student.gpa, null, school.id)}>Unregister</button>
                        </li>
                    );    
                }) 
                    
                }
                </ul>    
                <br />
                <button onClick={()=>destroy(school)}>Delete School</button>
                <br />
                <p><Link to={`/schools/${school.id}/update`}>Update School</Link></p>
            </main>
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
                },
                update: (id, name, email, gpa, schoolId, unregister)=> {
                        dispatch(updateStudent(id, name, email, gpa, null, history, unregister));
                }
                // update: (id)=> {
                //         console.log(id);
                // }
              
            };
        }
    )(School);
    