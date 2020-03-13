import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UserThingForm from '../Components/UserThingForm';
import { UserForm } from '../Components/UserForm';
import ThingForm from '../Components/ThingForm';
import Things from '../Components/Things';
import Users from '../Components/Users';

const { Component } = React;

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      things: [],
      userThings: []
    };
  }
  componentDidMount() {
    Promise.all([axios.get('/api/users'), axios.get('/api/things'), axios.get('/api/user_things')])
      .then(responses => responses.map(response => response.data))
      .then(([users, things, userThings]) => {
        this.setState({ users, things, userThings });
      })
      .catch(ex => this.setState({ error: ex.response.data.message }));
  }
  render() {
    const createUserThing = async userThing => {
      try {
        const created = (await axios.post('/api/user_things', userThing)).data;
        this.setState({ userThings: [...this.state.userThings, created], error: '' });
      } catch (ex) {
        this.setState({ error: ex.response.data.message });
      }
    };
    const createThing = async thing => {
      try {
        const created = (await axios.post('/api/things', thing)).data;
        this.setState({ things: [...this.state.things, created], error: '' });
      } catch (ex) {
        this.setState({ error: ex.response.data.message });
      }
    };

    const createUser = async user => {
      try {
        const created = (await axios.post('/api/users', user)).data;
        this.setState({ users: [...this.state.users, created], error: '' });
      } catch (ex) {
        this.setState({ error: ex.response.data.message });
      }
    };

    const destroyUserThing = async userThingToDestroy => {
      await axios.delete(`/api/user_things/${userThingToDestroy.id}`);
      this.setState({
        userThings: userThings.filter(userThing => userThing.id !== userThingToDestroy.id),
        error: ''
      });
    };

    const destroyUser = async userToDestroy => {
      try {
        await axios.delete(`/api/users/${userToDestroy.id}`);
        this.setState({ users: users.filter(user => user.id !== userToDestroy.id), error: '' });
      } catch (ex) {
        this.setState({ error: ex.response.data.message });
      }
    };
    const destroyThing = async thingToDestroy => {
      try {
        await axios.delete(`/api/things/${thingToDestroy.id}`);
        this.setState({
          things: things.filter(thing => thing.id !== thingToDestroy.id),
          error: ''
        });
      } catch (ex) {
        this.setState({ error: ex.response.data.message });
      }
    };
    const { things, users, userThings, error } = this.state;
    return (
      <div>
        <h1>Acme Ownership</h1>
        {!!error && <div className="error">{error}</div>}
        <div className="forms">
          <UserForm createUser={createUser} />
          <ThingForm createThing={createThing} />
          <UserThingForm users={users} things={things} createUserThing={createUserThing} />
        </div>
        <div className="lists">
          <Users
            users={users}
            things={things}
            userThings={userThings}
            destroyUserThing={destroyUserThing}
            destroyUser={destroyUser}
          />
          <Things
            users={users}
            things={things}
            userThings={userThings}
            destroyUserThing={destroyUserThing}
            destroyThing={destroyThing}
          />
        </div>
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
