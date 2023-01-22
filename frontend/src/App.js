import React, { Component } from 'react';
import Modal from './components/Modal';
// import './App.css';

const todoItems = [
  {
    id: 1,
    title: "Test",
    description: "Test",
    completed: true,
  },
  {
    id: 2,
    title: "Test2",
    description: "Test2",
    completed: false,
  },
  {
    id: 3,
    title: "New Todo",
    description: "✅ Blog Post\r\n✅ Edit Tutorial Video",
    completed: true,
  },
  {
    id: 4,
    title: "Room",
    description: "❌ clean the room",
    completed: false,
  },
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: todoItems,
      modal: false,
      activeItem: {title: "", description: "", completed: false,},
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal});
  };

  handelSubmit = (item) => {
    this.toggle();
    alert("save" + JSON.stringify(item));
  };

  handelDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true});
    }

    return this.setState({ viewCompleted: false});
  };

  renderTabList = () => {
    return (
      <div className="nav nav-pills">
        <span 
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}>
            Complete
        </span>
        <span 
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}>
            Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center">
          <span 
            className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
            title={item.description}>
              {item.title}
          </span>
          <span>
            <button className="btn btn-info mr-2" onClick={() => this.editItem(item)}>Edit</button>
            <button className="btn btn-danger mr-2" onClick={() => this.handleDelete(item)}>Delete</button>
          </span>
        </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-success" onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal 
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;