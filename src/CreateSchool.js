import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSchool } from './store';

class CreateSchool extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            address: '',
            description: '',
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
            await this.props.create(this.state.name, this.state.address, this.state.description);
        }
        catch(ex){
            this.setState({ error: ex.response.data.error.errors[0].message });
        }    
    }
    render(){
        const { name, error, address, description } = this.state;
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
                Address
                <input name='address' value={ address } onChange = { onChange }/>
                Description
                <input name='description' value={ description } onChange = { onChange }/>
                <button disabled = { !name }>SAVE</button>
            </form>
        )
    }
}

export default connect(
    null,
    (dispatch, { history })=> {
        return {
            create: (name, address, description)=> dispatch(createSchool(name, address, description, history))
        }
    }
)(CreateSchool);