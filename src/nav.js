import React from 'react';
import axios from 'axios';
import { createSchool, loadStudents } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Nav = ({ schoolsL, studentsL, createSchool, location: { pathname }}) => {
    return (
            <div>
                <header>
                    <h1>JPFP</h1>
                </header>
                <nav>
                    <Link to = '/' className= { pathname === '/' ? 'selected': ''}>Home</Link>
                    <Link to = '/schools' className= { pathname === '/schools' ? 'selected': ''}>Schools ({schoolsL}) </Link>
                    <Link to = '/students' className= { pathname === '/students' ? 'selected': ''}>Students ({studentsL})</Link>
                    <Link to = '/schools/create' className= { pathname === '/schools/create' ? 'selected': ''}>Create a School</Link>
                    <Link to = '/students/create' className= { pathname === '/students/create' ? 'selected': ''}>Create a Student</Link>
                </nav>
            </div>
        );
}

//should learn the difference between default and regular export

const mapStateToProps = ({ schools, students })=> {
    return {
        schoolsL: schools.length,
        studentsL: students.length
    }
};

const mapDispatchToProps = (dispatch, { history })=> {
    //console.log(history);
    return {
        createSchool: (name) => {
            dispatch(createSchool(name, history));
            
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);