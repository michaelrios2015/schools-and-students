import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSchool } from './store';

class UpdateSchool extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.school.id ? this.props.school.name : '',
            error: ''
        };
        console.log(this.props.school);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentDidUpdate(prevProps){
        //mostly get it
        if (!prevProps.school.id && this.props.school.id){
            this.setState({ name: this.props.school.name });
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
            await this.props.update(this.props.school.id, this.state.name);
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
                <button disabled = { !name }>SAVE</button>
            </form>
        )
    }
}

export default connect(
    (state, otherProps)=> {
        const school = state.schools.find(school => school.id === otherProps.match.params.id * 1) || {};
        return {
            school
        };
    },
    (dispatch, { history })=> {
        return {
            update: (id, name)=> {
                dispatch(updateSchool(id, name, history));
            }
        }
    }
)(UpdateSchool);
