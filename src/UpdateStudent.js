import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from './store';

class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.student.id ? this.props.student.name : '',
            email: this.props.student.id ? this.props.student.email : '',
            gpa: this.props.student.id ? this.props.student.gpa : '',
            schoolId: this.props.student.id ? this.props.student.schoolId : '',
            error: ''
        };
        console.log(this.props.state);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidUpdate(prevProps){
        //mostly get it
        if (!prevProps.student.id && this.props.student.id){
            this.setState({ name: this.props.student.name, email: this.props.student.email, gpa: this.props.student.gpa, schoolId: this.props.student.schoolId });
            console.log(this.props);
        }
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    async onSave(ev){
        ev.preventDefault();
        try {
            await this.props.update(this.props.student.id, this.state.name, this.state.email, this.state.gpa, this.state.schoolId);
        }
        catch(ex){
            console.log(ex);
            this.setState({ error: ex.response});
        }    
    }
    render(){
        const { name, email, gpa, schoolId, error } = this.state;
        const { onChange, onSave } = this;
        return (
            <form onSubmit = { onSave }>
                <pre>
                    {
                        !!error && JSON.stringify(error, null, 2)
                    }
                </pre>
                Name
                <input name='name' value={ name } onChange = { onChange }/>
                Email
                <input name='email' value={ email } onChange = { onChange }/>
                GPA
                <input name='gpa' value={ gpa } onChange = { onChange }/>
                <select name='schoolId' value={ schoolId } onChange = { onChange }>
                    {/* so this need to be linked with the the actual schools and I need to figure 
                    out how to do the update but one step at a time */}
                    <option value = ''>-- choose a school</option>
                    {/* <option value = '1'>schooly d</option>
                    <option value = '2'>schooly V</option>
                    <option value = '3'>schooly T</option> */}
                    {
                        this.props.schools.map( school => { 
                                return (
                                    <option key={ school.id } value = { school.id }>
                                        { school.name } 
                                    </option>
                                );
                            })
                    }

                </select>
                <button disabled = { !name || !email  }>SAVE</button>
            </form>
        )
    }
}

export default connect(
    (state, otherProps)=> {
        const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
        const schools = state.schools;
        return {
            student, 
            schools
        };
    },
    (dispatch, { history })=> {
        return {
            update: (id, name, email, gpa, schoolId)=> {
                dispatch(updateStudent(id, name, email, gpa, schoolId, history, null));
            }
        }
    }
)(UpdateStudent);
