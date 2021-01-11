import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOADED = 'LOADED';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const DESTROY_SCHOOL = 'DESTROY_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL'


//School Reducer should probably seperate out ************************

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
        state = state.map(school => school.id !== action.school.id ? school : action.school);
    }

    return state;
}

//Student Reducer should probably seperate out ************************

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
      state = state.map(student => student.id !== action.student.id ? student : action.student);
    }    
    //BAMO!! SEEMS TO WORK!! I cannot tell you how much time i wasted on strange reducers
    //becasue I did not realize you could use an include statement on a findByPk axios call :)

    return state;
}
const loadReducer = (state = true, action) => {
    if (action.type === LOADED){
        state = false 
    }
    return state;
}

// ********************************************************************

const reducer = combineReducers({
    schools: schoolsReducer,
    students: studenstReducer,
    loading: loadReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

// ********************************************************************

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

const createStudent = (name, email, gpa, schoolId, history)=>{
    return async(dispatch)=>{
        let student = (await axios.post('/api/students', { name, email, gpa, schoolId })).data;
        // console.log('in thunk');
        // console.log(student);
        if (schoolId){
            student = (await axios.get(`/api/students/${student.id}`)).data;
            // console.log(student);
            const school = (await axios.get(`/api/schools/${schoolId}`)).data;
            // console.log(school);
            dispatch(_updateSchool(school));    
        }    
        //console.log(schoolsReducer);
        //so this works fine but only have a school id not a school object 
        dispatch(_createStudent(student));
        history.push(`/students/${student.id}`)
    }
}

const _destroyStudent = student =>({ type: DESTROY_STUDENT, student});

const destroyStudent = (student, history)=>{
    //console.log(student);
    return async(dispatch)=>{
        await axios.delete(`/api/students/${student.id}`)
        dispatch(_destroyStudent(student))
        //could probably be an axios statement in here to get school then send that to another
        //thunk thing
        if (student.school){
            const school = (await axios.get(`/api/schools/${student.school.id}`)).data;
            // console.log('school');
            // console.log(school);
            dispatch(_updateSchool(school));
        }
        history.push('/students')
    }
}

const _updateStudent = student =>({ type: UPDATE_STUDENT, student});


const updateStudent = (id, name, email, gpa, schoolId, history, unregister)=>{
    return async(dispatch)=>{
        const student = (await axios.put(`/api/students/${id}`, { name, email, gpa, schoolId })).data;
        console.log('in thunk');
        console.log(student);
        dispatch(_updateStudent(student));
        if (student.school){
            const school = (await axios.get(`/api/schools/${student.school.id}`)).data;
            // console.log(school);
            dispatch(_updateSchool(school));
        }
        if (!unregister){
            history.push('/students');
        }
        else{
            // want it to just reload on the same page but don't know how 
            // console.log(`/schools/${unregister}`);
            const school = (await axios.get(`/api/schools/${unregister}`)).data;
            dispatch(_updateSchool(school));
            history.push(`/schools/`);
        }
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

const createSchool = (name, address, description, history)=>{
    return async(dispatch)=>{
        const school = (await axios.post('/api/schools', { name, address, description })).data;
        dispatch(_createSchool(school));
        history.push(`/schools/${school.id}`)
    }
}

const _destroySchool = school =>({ type: DESTROY_SCHOOL, school});

const destroySchool = (school, history)=>{
    return async(dispatch)=>{
        await axios.delete(`/api/schools/${school.id}`)
        dispatch(_destroySchool(school))
        if (school.students){
        //    console.log(school.students);
            for (let i=0; i<school.students.length; i++){
                console.log(school.students[i].id);
                const student = (await axios.get(`/api/students/${school.students[i].id}`)).data;
                // console.log(student);
                dispatch(_updateStudent(student))
            }       
        }
        history.push('/schools')
    }
}

const _updateSchool = school =>({ type: UPDATE_SCHOOL, school});

const updateSchool = (id, name, address, description, history)=>{
    return async(dispatch)=>{
        const school = (await axios.put(`/api/schools/${id}`, { name, address, description })).data;
        // console.log('in update thunk');
        console.log(school);
        dispatch(_updateSchool(school));
        //IT WORKS!!!
        if (school.students){
            for (let i=0; i<school.students.length; i++){
                const student = (await axios.get(`/api/students/${school.students[i].id}`)).data;
                // console.log(student);
                dispatch(_updateStudent(student))
            }       
        }
        history.push('/schools');
    }        
}


export default store;
export { loaded, loadStudents, destroyStudent, createStudent, updateStudent, loadSchools, createSchool, destroySchool, updateSchool};