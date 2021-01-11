import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

class CreateStudent extends Component{
    //there is a better way to just get schools but this works...
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            gpa: '',
            schoolId: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    async onSave(ev){
       
        ev.preventDefault();
        try {
            //not sure if this is the only way to deal with a null value but it seems to 
            //work so we will stick with it :)
            console.log(this.state);
            if (this.state.gpa === '') {
                this.state.gpa = null;
            }
            if (this.state.schoolId === '') {
                this.state.schoolId = null;
            }
            console.log('no school')
            await this.props.create(this.state.name, this.state.email, this.state.gpa, null);
        }
        catch(ex){
            // this.setState({ error: ex.response.data.error.errors[0].message });
            this.setState({ error: ex.response.data });
        }    
    }
    render(){
        //console.log(this.props.schools);
        const { name, email, gpa, error, schoolId } = this.state;
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
                    <option value = ''>-- choose a school</option>
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
    state => state,
    (dispatch, { history })=> {

        return {
            create: (name, email, gpa, schoolId) => dispatch(createStudent(name, email, gpa, schoolId, history))
        }
    }
)(CreateStudent);