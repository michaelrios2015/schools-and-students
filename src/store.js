import { createStore } from 'redux';

const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_SCHOOL = 'CREATE_SCHOOL';
const LOADED = 'LOADED';

const initalState = {
      schools: [],
      students: [],
      loading: true
    };

//hmmm.. i mean i can use it but do I really understand it
//ok I think i get it we have a store with a reducder the reducer holds the state
//and actions which say how to change the state 
const store = createStore((state = initalState, action)=> {
    if (action.type === LOAD_SCHOOLS){
        state = {...state, schools: action.schools}
    }
    if (action.type === LOAD_STUDENTS){
        state = {...state, students: action.students}
    }
    if (action.type === LOADED){
        state = {...state, loading: false}
    }
    if (action.type === CREATE_SCHOOL){
        state = {...state, schools: [...state.schools, action.school]}
    }
    return state;
});

//console.log(Store.getState());
export default store;