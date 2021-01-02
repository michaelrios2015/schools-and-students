import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Schools = ( { schools}) =>{
    return(
                        <ul>
                        {  
                        schools.map( school => { 
                            return (
                            <li key={ school.id }>
                                <Link to={`/schools/${ school.id }`}>
                                { school.name } - ({ school.students ? school.students.length : '0' })
                                </Link>
                            </li>
                            );
                        })
                        }
                    </ul>
                    )
              }


export default connect(state=>state)(Schools);