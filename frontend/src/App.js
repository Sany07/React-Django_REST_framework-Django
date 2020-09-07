import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { fetchData } from './api'
import { Button } from '@material-ui/core';

class App extends Component {
  state = {
    todos: [],
    submitData: {
      title: '',
      body: ''
    },
    update: false,
  };

  url = 'http://127.0.0.1:8000/api/';

  async componentDidMount() {
    const fetchdata = await fetchData();
    this.setState({ todos: fetchdata });
  }
  // Data = async () => {
  //   try {

  //     await axios.get(this.url)
  //       .then(res => {
  //         this.setState({ todos: res.data });
  //       })
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

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

  mySubmitHandler = (e) => {
    e.preventDefault();
    const url = `${this.url}todos/`
    axios.post(url, {
      title: this.state.submitData.title,
      body: this.state.submitData.body,
    })
      .then((res) => {

        if (res.data.title !== '') {

          this.componentDidMount();
          this.setState({
            submitData: {
              title: '',
              body: ''
            }
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteItem(todo) {
    const deleteURL = `${this.url}todo/${todo.id}/`
    axios.delete(deleteURL)
      .then(response => {
        if (response.status === 204) {

          this.componentDidMount();

        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  updateItem(todo) {
    console.log(this.state);
    this.setState({
      update: true,
      submitData: todo

    })
    console.log(this.state);

  }

  myUpdateHandler = (e) => {
    e.preventDefault();
    const updateURL = `${this.url}todo/${this.state.submitData.id}/`
    axios.put(updateURL, {
      title: this.state.submitData.title,
      body: this.state.submitData.body,
    })
      .then(response => {
        if (response.status === 200) {

          this.componentDidMount();
          this.setState({
            submitData: {
              title: '',
              body: ''
            },
            update: false
          })

        }
      })
      .catch(error => {
        console.log(error);
      });

  }


  render() {


    return (
      <div className='App'>
        <ul>
          {this.state.todos.map(todo => (
            <div key={todo.id}>

              <li>
                {todo.title}
                <Button color="primary" id={todo.id} onClick={() => this.deleteItem(todo)}>Delete</Button>
                <Button color="primary" id={todo.id} onClick={() => this.updateItem(todo)}>Edit</Button>
                <p>{todo.body}</p>
              </li>
            </div>
          ))}
        </ul>

        {this.state.update === true ?
          <form onSubmit={this.myUpdateHandler}>
            <h1>Update Item</h1>
            <input type="text" name="title" placeholder="title" value={this.state.submitData.title} onChange={this.myChangeHandler}></input>
            <br></br>
            <br></br>
            <textarea name="body" placeholder="description" value={this.state.submitData.body} onChange={this.myChangeHandler}></textarea>
            <br></br>
            <br></br>
            <input type="submit" value="Update" />
          </form>
          :
          <form onSubmit={this.mySubmitHandler}>
            <input type="text" name="title" placeholder="title" value={this.state.submitData.title} onChange={this.myChangeHandler}></input>
            <br></br>
            <br></br>
            <textarea name="body" placeholder="description" value={this.state.submitData.body} onChange={this.myChangeHandler}></textarea>
            <br></br>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>

    );
  }
}
export default App;