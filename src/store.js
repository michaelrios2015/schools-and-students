import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOADED = 'LOADED';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REMOVE_STUDENT_FROM_SCHOOL = 'REMOVE_STUDENT_FROM_SCHOOL';
const UPDATE_STUDENTS_SCHOOL_NAME = 'UPDATE_STUDENTS_SCHOOL_NAME';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const DESTROY_SCHOOL = 'DESTROY_SCHOOL';
const REMOVE_SCHOOL = 'REMOVE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'

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
        state = state.map((school) => { if (school.id !== action.school.id){
                                            return school 
                                            } else {
                                                school.name =  action.school.name;
                                                console.log(school);
                                                return school
                                            }});
    }
    if (action.type === REMOVE_STUDENT_FROM_SCHOOL){
        state = state.map((school) => { 
            //console.log(student.school);        
             if (school.students.length > 0 ){
                console.log('school.students');
                console.log(school.students);
                console.log(action.student.id);
                school.students = school.students.filter((student)=>{ 
                    console.log('in filter');
                    console.log(typeof student.id);
                    if (student.id !== action.student.id){
                        console.log('in filter if statement');
                        return student;
                    }})
                console.log(school.students);      
         } 
         return school;
        })   
    }
    return state;
}

const studenstReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        state = action.students
    }
    if (action.type === DESTROY_STUDENT){
        state = state.filter(student => student.id !== action.student.id);
    }
    if (action.type === CREATE_STUDENT){
        state = [...state, action.student]
    }

    if (action.type === UPDATE_STUDENT){
        state = state.map((student) => { if (student.id !== action.student.id){
                                            return student 
                                            } else {
                                                student.name =  action.student.name;
                                                console.log(student);
                                                return student
                                            }});
    }

    //BAMO!! SEEMS TO WORK!!
    if (action.type === REMOVE_SCHOOL){
        state = state.map((student) => { 
             if (student.school ){
                console.log(student.school.name);
                    if (student.school.name === action.school.name){
                    student.school = null;
         } 
        }
        return student;
    })
    }
    if (action.type === UPDATE_STUDENTS_SCHOOL_NAME){
        state = state.map((student) =>{
            if (student.school){
                console.log(student.school.name);
                    if (student.school.id === action.school.id){
                    student.school.name = action.school.name;
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

//STUDENT THUNKS****************************************

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

const _createStudent = (student) =>{
    return {
        type: CREATE_STUDENT,
        student
    };
};

const createStudent = (name, history)=>{
    return async(dispatch)=>{
        const student = (await axios.post('/api/students', { name })).data;
        dispatch(_createStudent(student));
        history.push(`/students/${student.id}`)
    }
}

const _destroyStudent = student =>({ type: DESTROY_STUDENT, student});

const _removeStudentFromSchool = student =>({ type: REMOVE_STUDENT_FROM_SCHOOL, student});

const destroyStudent = (student, history)=>{
    console.log(student);
    return async(dispatch)=>{
        await axios.delete(`/api/students/${student.id}`)
        dispatch(_destroyStudent(student))
        dispatch(_removeStudentFromSchool(student))
        history.push('/students')
    }
}

const _updateStudentsSchoolName = (school) =>{
    return {
        type: UPDATE_STUDENTS_SCHOOL_NAME,
        school
    };
};

const _updateStudent = student =>({ type: UPDATE_STUDENT, student});

const updateStudent = (id, name, history)=>{
    return async(dispatch)=>{
        const student = (await axios.put(`/api/students/${id}`, { name })).data;
        dispatch(_updateStudent(student));
        history.push('/students');
    }
}

//SCHOOL THUNKS****************************************

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
        history.push(`/schools/${school.id}`)
    }
}

const _destroySchool = school =>({ type: DESTROY_SCHOOL, school});

const destroySchool = (school, history)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/schools/${school.id}`)
        dispatch(_destroySchool(school))
        history.push('/schools')
    }
}

const _updateSchool = school =>({ type: UPDATE_SCHOOL, school});

const updateSchool = (id, name, history)=>{
    return async(dispatch)=>{
        const school = (await axios.put(`/api/schools/${id}`, { name })).data;
        dispatch(_updateSchool(school));
        // so this is cheating but works 
        // dispatch(loadStudents());
        //IT WORKS!!!
        dispatch(_updateStudentsSchoolName(school))
        //don't really understand but very cool :)
        // console.log(school);
        history.push('/schools');
    }
}

const takeOutSchoolFromStudent = school =>({ type: REMOVE_SCHOOL, school});

export default store;
export { loaded, loadStudents, destroyStudent, createStudent, updateStudent, loadSchools, createSchool, destroySchool, updateSchool, takeOutSchoolFromStudent};