import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import ReactTable from 'react-table';
import { RequestBtn } from "../components/Buttons";
import "react-table/react-table.css";
import { ReactTableDefaults } from 'react-table'
var sessionStorage = require('web-storage')().sessionStorage;


class Request extends Component {

  render() {
    return (
      <Container fluid id="requestform">
		<Container id="requestcontainer">
		<h1><img id="logo" src="assets/images/requestlogo.png" />Request</h1>
        <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Name</label>
          <input type="name" className="form-control" id="userName" placeholder="Florian Hutter" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Beer Name</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Amount</label>
          <input type="amount" className="form-control" id="amountInput" placeholder="10 Barrels" />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea className="form-control" id="requestNotes" rows={6} defaultValue={""} />

           <RequestBtn className="requestbutton" id="mail" >Send Request</RequestBtn>
        </div>
      </form>
	  </Container>
      </Container>
    )
  }
}

export default Request;
