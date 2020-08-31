import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  url = 'http://127.0.0.1:8000/api/';

  async componentDidMount() {
    this.Data();

  }
  Data = async () => {
    try {

      await axios.get(this.url)
        .then(res => {
          this.setState({ todos: res.data });
        })
    } catch (error) {
      console.log(error);
    }

  }


  state = {
    todos: [],
    submitData: {
      title: '',
      body: ''
    }
  };

  myChangeHandler = (event) => {
    const value = event.target.value;
    this.setState(
      {
        submitData: {
          ...this.state.submitData,
          [event.target.name]: value

        }
      }
    );
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

  }

  render() {


    return (
      <div className='App'>
        {this.state.todos.map(todo => (
          <div key={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.body}</p>
          </div>

        ))}
        <form onSubmit={this.mySubmitHandler}>
          <input type="text" name="title" placeholder="title" onChange={this.myChangeHandler}></input>
          <br></br>
          <br></br>
          <textarea name="body" placeholder="description" onChange={this.myChangeHandler}></textarea>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  }
}
export default App;