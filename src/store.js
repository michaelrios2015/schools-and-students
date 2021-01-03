import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DESTROY_SCHOOL = 'DESTROY_SCHOOL';
const REMOVE_SCHOOL = 'REMOVE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'
const LOADED = 'LOADED';

const schoolsReducer = (state = [], action) =>{
    if (action.type === LOAD_SCHOOLS){
        state = action.schools
    }
    if (action.type === CREATE_SCHOOL){
        state = [...state, action.school]
    }
    if (action.type === DESTROY_SCHOOL){
        state = state.filter(school => school.id !== action.school.id);
    }
    if (action.type === UPDATE_SCHOOL){
        // state = state.map(school => console.log(school));
        state = state.map(school => school.id !== action.school.id ? school.name : action.school.name);
        console.log('STATE');
        console.log(state);
        //console.log('action.school');
        //console.log(action.school.data);
    }
    return state;
}

const studenstReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        state = action.students
    }
    //BAMO!! SEEMS TO WORK!!
    if (action.type === REMOVE_SCHOOL){
        state = state.map((student) => { 
            //console.log(student.school);        
             if (student.school ){
                console.log(student.school.name);
                    if (student.school.name === action.school.name){
                    student.school = null;
         } 
        }
        return student;
    })
    }
    return state;
}

const loadReducer = (state = true, action) => {
    if (action.type === LOADED){
        state = false 
    }
    return state;
}

const reducer = combineReducers({
    schools: schoolsReducer,
    students: studenstReducer,
    loading: loadReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

const loaded = () =>{
    return {
        type: LOADED
    };
};

const _loadSchools = (schools) =>{
    return {
        type: LOAD_SCHOOLS,
        schools
    };
};

const loadSchools = () =>{
    return async(dispatch)=>{
        const schools = (await axios.get('/api/schools')).data;
        dispatch(_loadSchools(schools));
    }
};

const _loadStudents = (students) =>{
    return {
        type: LOAD_STUDENTS,
        students
    };
};

const loadStudents = () =>{
    return async(dispatch)=>{
        const students = (await axios.get('/api/students')).data;
        dispatch(_loadStudents(students));
    }
};

const _createSchool = (school) =>{
    return {
        type: CREATE_SCHOOL,
        school
    };
};

const createSchool = (name, history)=>{
    return async(dispatch)=>{
        const school = (await axios.post('/api/schools', { name })).data;
        dispatch(_createSchool(school));
        //don't really understand but very cool :)
        history.push(`/schools/${school.id}`)
    }
}

const _destroySchool = school =>({ type: DESTROY_SCHOOL, school});

const destroySchool = (school, history)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/schools/${school.id}`)
        dispatch(_destroySchool(school))
        //don't really understand but very cool :)
        history.push('/schools')
    }
}

const _updateSchool = school =>({ type: UPDATE_SCHOOL, school});

const updateSchool = (id, name, history)=>{
    return async(dispatch)=>{
        const school = (await axios.put(`/api/schools/${id}`, { name })).data;
        dispatch(_updateSchool(school));
        //don't really understand but very cool :)
        // console.log(school);
        history.push('/schools');
    }
}

const takeOutSchoolFromStudent = school =>({ type: REMOVE_SCHOOL, school});

export default store;
export { loaded, loadSchools, loadStudents, createSchool, destroySchool, updateSchool, takeOutSchoolFromStudent};