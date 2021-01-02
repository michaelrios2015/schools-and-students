import React from 'react';
import axios from 'axios';
import { createSchool, loadStudents } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';

const Nav = ({ schoolsL, studentsL, createSchool, location: { pathname }}) => {
    return (

            <nav>
                <Link to = '/' className= { pathname === '/' ? 'selected': ''}>Home</Link>
                <Link to = '/schools' className= { pathname === '/schools' ? 'selected': ''}>Schools ({schoolsL}) </Link>
                <Link to = '/students' className= { pathname === '/students' ? 'selected': ''}>Students ({studentsL})</Link>
                <button onClick={()=> createSchool(faker.name.firstName()) }> Create School </button>
            </nav>
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