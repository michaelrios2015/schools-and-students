import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Schools = ({ schools }) =>{
    return(
            <div className = { 'list' }>
                <ul>
                    {  
                        schools.map( school => { 
                            return (
                                <li key={ school.id }>
                                    <Link to={`/schools/${ school.id }`}>
                                    { school.name } 
                                    </Link> 
                                    <br />
                                    Number of students({ school.students ? school.students.length : '0' })
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            )
}


export default connect(state=>state)(Schools);
