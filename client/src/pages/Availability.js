import "./pages.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { OrderBtn, EditBtn } from "../components/Buttons";
import { Select, SelectItem } from "../components/Select";
import ReactTable from 'react-table';
import Modal from 'react-modal';
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table';
import { Input, TextArea, FormBtn } from "../components/Form";
var moment = require('moment');
var sessionStorage = require('web-storage')().sessionStorage;


// this is a react-table feature that allows us to override some defaults
Object.assign(ReactTableDefaults, {
  defaultPageSize: 5,
  minRows: 3,
  // etc...
});

// ============react-modal styles=================
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
    width             : '500px',
    top               : '50%',
    left              : '50%',
    right             : 'auto',
    bottom            : 'auto',
    marginRight       : '-50%',
    transform         : 'translate(-50%, -50%)',
  	backgroundColor   : 'rgba(255,255,255,1.00)',
  	borderRadius      : '10px',
  }
};

// ===================================================

class Availability extends Component {

  state = {
    recipes: [],
    batches: [],
    customers: [],
    modalIsOpen: false
  };

  componentWillMount() {
    this.loadRecipes();
    this.loadBatches();
    this.loadCustomers();
  }

  componentDidMount() {
    this.loadRecipes();
    this.loadBatches();
    this.loadCustomers();
  }

  loadRecipes = () => {
    API.getRecipes()
      .then(res => {
        this.setState({ recipes: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  loadBatches = () => {
    API.getBatches()
      .then(res => {
        this.setState({ batches: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  loadCustomers = () => {
    API.getCustomers()
      .then(res => {
        this.setState({ customers: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  constructor() {
    super();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal(obj) {
    this.setState({
      modalIsOpen: true,
      _id: obj._id,
      name: obj.name,
      availVol: obj.availVol,
    });
  };


  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  handleFormSubmit = event => {
    const id = document.getElementById("id").value;
    const orderSize = document.getElementById("orderSize").value;
    const invUpdate = this.returnNeg(orderSize);

    event.preventDefault();

    // Update available volume in the Recipe collection
    API.updateRecipeVol(id, invUpdate)
      // Refresh the Inventory and InProcess tables
      .then(res => this.loadRecipes())
      .then(res => this.loadBatches())
      .catch(err => console.log(err));;

    this.closeModal();
  }

  // Converts order amount to the negative value to
  // subtract from the available volume in the database
  // using the mongodb $inc operator
  returnNeg = num => {
    num = Math.abs(num);
    num = -num;
    return num;
  }

  batchReady(obj) {
    API.updateRecipeVolByName(obj.name, obj.totalVol, obj._id)
      .then(res => this.loadRecipes())
      .then(API.deleteBatch(obj._id))
        .then(res => this.loadBatches())
      .catch(err => console.log(err))
  }
  // Calculates the percentage of time passed from
  // two dates.
  // getProgress = (startDate, endDate) => {
  //   let totalTime = endDate - startDate;
  //   let timePassed = Date.now() - startDate;
  //   console.log("TIME PASSED>>>>>>>" + timePassed);
  //   return (timePassed / totalTime) * 100 + "%";
  // }

  // =============================================

  render() {
    const recipes = this.state.recipes;
    const batches = this.state.batches;
    const customers = this.state.customers;
    return (
      <Container>
        <Row>
          <Col size="md-14">
            <h1><img id="logo" src="assets/images/inventorylogo.png" />Inventory</h1>
            <ReactTable className="table-style -striped -highlight"
              data={recipes}
              columns={[
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Style",
                accessor: "style",
                maxWidth: 200,

              },
              {
                Header: "ABV",
                accessor: "abv",
                maxWidth: 70,
              },
              {
                Header: "Barrels",
                accessor: "availVol",
                maxWidth: 70,
              },
              {
                Header: "Options",
                accessor: "options",
	              maxWidth: 80,
                Cell: row => (
                  <div>
                    <OrderBtn onClick={() => this.openModal(row.original)}>Order</OrderBtn>
                  </div>
                ),
              }]}
            />
          </Col>
        </Row>
        <Row>
          <Col size="md-14">
            <h1><img id="logo" src="assets/images/inprocess.png" />In process</h1>
            <ReactTable className="table-style -striped -highlight"
              data={batches}
              columns={[
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Style",
                accessor: "style",
                maxWidth: 200,
              },
              {
                Header: "Barrels",
                accessor: "totalVol",
                maxWidth: 70,
              },
			        {
                Header: "Progress",
                accessor: "progressBar",
				        maxWidth: 200,
                Cell: row => (
                                <div
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#dadada',
                                    borderRadius: '2px'
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "75%",
                                      height: '100%',
                                      backgroundColor: '#85cc00',
                                      borderRadius: '2px',
                                      transition: 'all .2s ease-out'
                                    }}
                                  />
                                </div>
                              )
              },
              {
                Header: "Ready by",
                accessor: "endDate",
                maxWidth: 150,
                Cell: row => (moment(row.value).format('MMMM Do YYYY'))
              },
              {
                Header: "Options",
                accessor: "options",
	              maxWidth: 80,
                Cell: row => (
                  <div>
                    <OrderBtn
                      id="orderDone"
                      onClick={() => this.batchReady(row.original)}
                    >
                      Ready
                    </OrderBtn>
                  </div>
                ),
              }]}
            />
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="order"
        >
          <h2>{this.state.name}</h2>

          <p>Available Barrels: <span>{this.state.availVol}</span></p>

          <form>
            <p>Customer: </p>
            <Select>
              {this.state.customers.map(customer => (
                <SelectItem key={customer._id}>
                  {customer.busName}
                </SelectItem>
              ))}
            </Select>
            <br />
            <p>Barrels Ordered:
              <input name="orderSize" id="orderSize"/>
            </p>
            <br />
            <input type="hidden" id="id" name="id" value={this.state._id}/>
          </form>

          <FormBtn
            className="cancel btn btn-primary"
            onClick={this.closeModal}>
            Cancel
          </FormBtn>
          <FormBtn
            className="cancel btn btn-primary"
            onClick={this.handleFormSubmit}>
            Submit
          </FormBtn>

        </Modal>

      </Container>
    )
  }
}

export default Availability;
