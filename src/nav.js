import React from 'react';
import axios from 'axios';
import { createSchool } from './store';
import { connect } from 'react-redux';

const Nav = ({ schoolsL, studentsL, createSchool }) => {
    return (
            <nav>
                <a href='#'>Home</a>
                <a href='#schools'>Schools ({schoolsL}) </a>
                <a href='#students'>Students ({studentsL})</a>
                <button onClick={()=> createSchool(Math.random()) }> Create School </button>
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

const mapDispatchToProps = (dispatch)=> {
    return {
        createSchool: (name) => {
            dispatch(createSchool(name));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Nav);