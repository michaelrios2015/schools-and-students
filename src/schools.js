import React from 'react';
import { connect } from 'react-redux';


const Schools = ( { schools}) =>{
    return(
                        <ul>
                        {  
                        schools.map( school => { 
                            return (
                            <li key={ school.id }>
                                { school.name } - ({ school.students ? school.students.length : '0' })
                            </li>
                            );
                        })
                        }
                    </ul>
                    )
              }


export default connect(state=>state)(Schools);