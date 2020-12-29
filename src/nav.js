import React, { Component } from 'react';
import store from './store';
import axios from 'axios';
import { connect } from 'react-redux';

const createSchool = async() => {
    const school = (await axios.post('/api/schools')).data
    store.dispatch({
        type: 'CREATE_SCHOOL',
        school
    });
}

const Nav = ({ schools, students }) => {

    return (
            <nav>
                <a href='#'>Home</a>
                <a href='#schools'>Schools ({schools.length}) </a>
                <a href='#students'>Students ({students.length})</a>
                <button onClick={ createSchool }> Create School </button>
            </nav>
        );
}

//should learn the difference between default and regular export

const mapStateToProps = (state)=> {
    return state;
};

export default connect(mapStateToProps)(Nav);