import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { EditBtn , AddRecipeBtn , AddUserBtn , AddBatchBtn } from "../components/Buttons";
// import NewRecipeModalContent from "../components/Modal";
import ReactTable from 'react-table';
import Modal from 'react-modal';
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import Switch from 'react-toggle-switch';
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";
var sessionStorage = require('web-storage')().sessionStorage;

// this is a react-table feature that allows us to override some defaults
Object.assign(ReactTableDefaults, {
  defaultPageSize: 5,
  minRows: 3,
  // etc...
});

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(77,68,41,0.57)'
  },
  content : {
    top               : '40%',
    left              : '50%',
    right             : 'auto',
    bottom            : 'auto',
    marginRight       : '-50%',
    transform         : 'translate(-50%, -50%)',
	backgroundColor   : 'rgba(255,230,153,1.00)',
	borderRadius      : '10px',
  }
};

const bodyStyle = {
  backgroundColor: "rgb(52,12,13)"
}

class Admin extends Component {

  state = {
    users: [],
    name: "",
    email: "",
    isAdmin: false,
    password: "",
    error: "",
    modalIsOpen: false,
    editModalOpen: false,
    userModalOpen: false,
    batchModalOpen: false,
    recipeModalOpen: false
  };


   handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email && this.state.password && this.state.name) {
          console.log("making new user");
            var self = this;
            return axios.post("/api/user/signup", ({
                    name: this.state.name.trim(),
                    email: this.state.email.trim(),
                    password: this.state.password,
                    isAdmin: this.state.isAdmin
                })).then(function(response) {
                    console.log(response.request); 
                    self.setState({ name: "", email: "", password: "", isAdmin: "", error: "" });

                    


                })

                .catch(function(error) {
                    console.log(error.request.response);
                    self.setState({error:error.request.response});
                });




        //     API.newUser({
  
        //       name: this.state.name,
        //       email: this.state.email,
        //       password: this.state.password,
        //       isAdmin: this.state.isAdmin,

        //     }).catch(err => console.log(err))

        };


    };

  componentWillMount() {
    this.loadUsers();
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res => {
        this.setState({ users: res.data });
        console.log("user response...");
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };


  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.openUserModal = this.openUserModal.bind(this);
    this.openBatchModal = this.openBatchModal.bind(this);
    this.openRecipeModal = this.openRecipeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  openEditModal(obj) {
    this.setState({
      name: obj.name,
      email: obj.email,
      administrator: obj.administrator,
      editModalOpen: true,
      batchModalOpen: false,
      recipeModalOpen: false,
      userModalOpen: false,
    });
    this.openModal();
  };

  openUserModal() {
    this.setState({
      userModalOpen: true,
      editModalOpen: false,
      batchModalOpen: false,
      recipeModalOpen: false
    });
    this.openModal();
  };

  openBatchModal() {
    this.setState({
        batchModalOpen: true,
        editModalOpen: false,
        recipeModalOpen: false,
        userModalOpen: false
      });
    this.openModal();
  };

  openRecipeModal() {
    this.setState({
      recipeModalOpen: true,
      editModalOpen: false,
      batchModalOpen: false,
      userModalOpen: false
    });
    this.openModal();
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false, name:"", email:"", password: "", isAdmin: false, error:""});
    this.forceUpdate();
  }



  render() {
    const users = this.state.users;
    return (



      <Container>

        <Row>
          <Col size="md-10">
            <h1>Access Control</h1>
            <ReactTable className="-striped -highlight"
              data={users}
              columns={[{
                Header: "Name",
                accessor: "name",
				        maxWidth: 210,
              },
              {
                Header: "Email",
                accessor: "email"
              },
              {
                id: 'isThisAnAdmin',
                Header: "Administrator",
                accessor: d => JSON.stringify(d.isAdmin),
				        maxWidth: 100,
              },
              {
                Header: "Options",
                accessor: "options",
				        maxWidth: 60,
                Cell: row => (
                  <div>
                    <EditBtn onClick={() => this.openEditModal(row.original)}>Edit</EditBtn>
                  </div>
                ),
              }]}
            />
          </Col>
        </Row>

        <AddBatchBtn onClick={this.openBatchModal}>Add new batch</AddBatchBtn>
        <AddRecipeBtn onClick={this.openRecipeModal}>Add new recipe</AddRecipeBtn>
        <AddUserBtn onClick={this.openUserModal}>Add new user</AddUserBtn>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
        {this.state.editModalOpen ?
          <div>
            <h2>Edit a user</h2>
            <p>Name:
              <input onChange={this.handleInputChange} size="50" name="editName" id="editName" value={this.state.name}/>
            </p>
            <p>Email:
              <input onChange={this.handleInputChange} size="50" name="editEmail" id="editEmail" value={this.state.email}/>
            </p>
            <p>
              <input onChange={this.handleInputChange} type="checkbox" name="isAdmin" id="isAdmin" value={this.state.isAdmin}/>
               &zwnj; &zwnj; Give administrative privileges
            </p>
            <button onClick={this.closeModal}>Add user</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          : this.state.userModalOpen ?
          <div>
            <h2>Add a new user</h2>

              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <Input
              type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
            <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />
              <p>
              <input type="checkbox" name="isAdmin" value={this.state.isAdmin} onChange={this.handleInputChange} onClick={console.log(this.state)}/>
              Give admin privileges?
              </p>
              <div className="form-group">
              <FormBtn
              className="cancel btn btn-danger"
                onClick={this.closeModal}>
                Close
              </FormBtn>
            <FormBtn
            className="submit btn btn-success"
                disabled={!(this.state.email && this.state.password && this.state.password)}
                onClick={this.handleFormSubmit}>
                Add New User
              </FormBtn>
            </div>
            <br/>
            <br/>
          {this.state.error != "" ? (<div className="alert alert-danger">{this.state.error}</div>) : (<div />)}              

          </div>

          : this.state.batchModalOpen ?
          <div>
            <h2>Start a batch</h2>
            <p>Select a beer to brew:
              <select>
                <option value="beer1">Beer1</option>
                <option value="beer2">Beer2</option>
                <option value="beer3">Beer3</option>
                <option value="beer4">Beer4</option>
              </select>
            </p>
            <p>Volume(barrel):
              <input name="volume" id="volume"/>
            </p>
            <button onClick={this.closeModal}>Brew</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          : this.state.recipeModalOpen ?
          <div>
            <h2>New Recipe</h2>
            <form>
              <p>Name:
                <input name="beerName" id="beerName"/>
              </p>
              <br />
              <p>Style:
                <input name="style" id="style"/>
              </p>
              <br />
              <p>ABV:
                <input name="abv" id="abv"/>
              </p>
              <br />
              <p>Description:
                <textarea call="form-control" name="description" id="description" rows="3"/>
              </p>
              <br />
              <p>Brew Time(weeks):
                <input name="time" id="time"/>
              </p>
              <br />
              <p>Production:
                <input name="production" id="production"/>
              </p>
              <br />
              <p>Notes:
                <input name="notes" id="notes"/>
              </p>
              <br />
            </form>

            <button onClick={this.closeModal}>Add Recipe</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
          :
          console.log("nah")
        }
        </Modal>
      </Container>
    )
  }
}

export default Admin;
