import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent } from './store';

class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.student.id ? this.props.student.name : '',
            error: ''
        };
        console.log(this.props.student);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidUpdate(prevProps){
        //mostly get it
        if (!prevProps.student.id && this.props.student.id){
            this.setState({ name: this.props.student.name });
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
            await this.props.update(this.props.student.id, this.state.name);
        }
        catch(ex){
            console.log(ex);
            this.setState({ error: ex.response});
        }    
    }
    render(){
        const { name, error } = this.state;
        const { onChange, onSave } = this;
        return (
            <form onSubmit = { onSave }>
                <pre>
                    {
                        !!error && JSON.stringify(error, null, 2)
                    }
                </pre>
                <input name='name' value={ name } onChange = { onChange }/>
                <button>SAVE</button>
            </form>
        )
    }
}

export default connect(
    (state, otherProps)=> {
        const student = state.students.find(student => student.id === otherProps.match.params.id * 1) || {};
        return {
            student
        };
    },
    (dispatch, { history })=> {
        return {
            update: (id, name)=> {
                dispatch(updateStudent(id, name, history));
            }
        }
    }
)(UpdateStudent);
