import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const LOADED = 'LOADED';
const SET_VIEW = 'SET_VIEW';

const schoolsReducer = (state = [], action) =>{
    if (action.type === LOAD_SCHOOLS){
        state = action.schools
    }
    if (action.type === CREATE_SCHOOL){
        state = [...state, action.school]
    }
    return state;
}

const studenstReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        state = action.students
    }
    return state;
}

const viewReducer = (state = 'schools', action) => {
    if (action.type === SET_VIEW){
        state = action.view 
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
    loading: loadReducer,
    view: viewReducer
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

const createSchool = (name)=>{
    return async(dispatch)=>{
        const school = (await axios.post('/api/schools', { name })).data
        dispatch(_createSchool(school))
    }
}

const setView = (view) =>{
    return {
        type: SET_VIEW,
        view
    };
};

export default store;
export { loaded, loadSchools, loadStudents, createSchool, setView};