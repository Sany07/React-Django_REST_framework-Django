import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  url = 'http://127.0.0.1:8000/api/';

  async componentDidMount() {
    this.Data();
    console.log('fe');

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

    axios.post(this.url, {
      title : this.state.submitData.title,
      body : this.state.submitData.body,
    })
    .then((res)=> {
    
    if (res.data.title !== ''){

      this.componentDidMount();
      this.setState({
        submitData:{
          title:'',
          body:''
        } 
    })}
  })
    .catch(function (error) {
      console.log(error);
    });
  }

  DeleteItem(tt){
    console.log(this.state.todos.id);
  }

  render() {


    return (
      <div className='App'>
        <ul>
        {this.state.todos.map(todo => (
          <div key={todo.id}>
 
            <li>{todo.title} <button id={todo.id} onSubmit={this.DeleteItem}>Delete</button>
            <p>{todo.body}</p>
            </li>
          </div>
        ))}
          </ul>

        <form onSubmit={this.mySubmitHandler}>
          <input type="text" name="title" placeholder="title" value={ this.state.submitData.title } onChange={this.myChangeHandler}></input>
          <br></br>
          <br></br>
          <textarea name="body" placeholder="description" value={this.state.submitData.body} onChange={this.myChangeHandler}></textarea>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  }
}
export default App;