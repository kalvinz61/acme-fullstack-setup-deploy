
import React from 'react'
//import axios from 'axios'

const { Component } = React

class UserThingForm extends Component{
    constructor(){
      super();
      this.state = {
        thingId: '',
        userId: ''
      };
    }
    render(){
      const { things, users } = this.props;
      const { thingId, userId } = this.state;
      const onSubmit = (ev)=> {
        ev.preventDefault();
        this.props.createUserThing({ thingId, userId });
      };
      return (
        <section>
          <form onSubmit={ onSubmit }>
            <h2>Create User Thing</h2>
            <select value={ thingId } onChange={ ev => this.setState({ thingId: ev.target.value})}>
              <option value=''>-- choose thing --</option>
              {
                things.map( thing => {
                  return (
                    <option value={ thing.id } key={ thing.id }>
                      { thing.name }
                    </option>
                  );
                })
              }
            </select>
            <select value={ userId } onChange={ ev => this.setState({ userId: ev.target.value})}>
              <option value=''>-- choose user --</option>
              {
                users.map( user => {
                  return (
                    <option value={ user.id } key={ user.id }>
                      { user.name }
                    </option>
                  );
                })
              }
            </select>
            <button>Create</button>
          </form>
        </section>
      );
    };
  }

  export default UserThingForm