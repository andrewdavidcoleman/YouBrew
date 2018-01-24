import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import axios from "axios";
var sessionStorage = require('web-storage')().sessionStorage;

class SignIn extends Component {

    state = {
      email: "",
      password: "",
      submitted: false,
      error:"",
      errorType:"",

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            var self = this;
            return axios.post("/api/user/signin", ({
                    email: this.state.email.trim(),
                    password: this.state.password,
                })).then(function(response) {
                    console.log(response);
                    sessionStorage.set("access_token", response.data.token);
                    console.log("acces stored");
                    if (response.data.user.isAdmin === true) {
                        sessionStorage.set("admin_token", response.data.user.isAdmin);
                        console.log("admin stored");
                    };
                    self.setState({ email: "", password: "", submitted: true, error: "You are logged in!", errorType: "success" });



                })

                .catch(function(error) {
                    console.log(error.request.response);
                    self.setState({error:error.request.response});
                    self.setState({errorType:"danger"})
                });




            // API.signIn({
            //   email: this.state.email,
            //   password: this.state.password,
            // }).catch(err => console.log("this is the err " + err))

        };


    };

    


    render() {
        console.log(this.state);
        return (
      <Container fluid>
        <Row>
        <Col size="md-3">
        </Col>
          <Col size="md-6">
            <h1>Welcome to YouBrew!</h1>
            <p>This is an application that helps commercial beer crafters to overview their stock and also brews in progress. Our app is the link between the brewer and the sales force and will help you with the following tasks.</p>
            <form>

              <Input
              type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password (required)"
              />

<div>
              <FormBtn
              className="btn btn-success submit"
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}>
                Submit User
              </FormBtn>

              <div className="col-md-1">  </div>
          {this.state.errorType === "danger" ? (<div className="floatR alert alert-danger col-md-8 text-center">{this.state.error}</div>) : (<div />)}
          {this.state.errorType === "success" ? (<div className="floatR alert alert-success col-md-8 text-center">{this.state.error}</div>) : (<div />)}      
</div>

            </form>

          </Col>
<Col size="md-3">
        </Col>
        </Row>
      </Container>
    )

  }
}

export default SignIn;
