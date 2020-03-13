import React from 'react';
const { Component } = React;

class ThingForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }
  render() {
    const { name } = this.state;
    const onSubmit = ev => {
      ev.preventDefault();
      this.props.createThing({ name });
    };
    return (
      <section>
        <form onSubmit={onSubmit}>
          <h2>Create Thing</h2>
          <input value={name} onChange={ev => this.setState({ name: ev.target.value })} />
          <button>Create</button>
        </form>
      </section>
    );
  }
}

export default ThingForm;
