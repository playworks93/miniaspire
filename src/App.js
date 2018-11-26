import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentLoans:[],
    };
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users?id=1')
    .then(response => response.json())
    .then(data => {
      this.setState({ currentLoans: data })
    });
  }

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.id]: val});
  };

  onHandleChange = (e, i, value) => {
    this.setState({ term: value});
  };

  addLoan = () => {
    let currentLoansCopy = this.state.currentLoans.slice();
    currentLoansCopy.push(this.state);
    this.setState({
      currentLoans : currentLoansCopy, 
      name: '',
      amount: '',
      term: '',
    });
  };

  deleteLoan = (i) => {
    let currentLoansCopy = this.state.currentLoans.slice();
    currentLoansCopy.splice(i, 1);
    this.setState({
      currentLoans : currentLoansCopy, 
      name: '',
      amount: '',
      term: '',
    });
  };

  render() {
    let displayLoans = this.state.currentLoans.map((info, i) => {
      return (
        <div>
          <Card>
              <CardContent>
                <h3>Name: {info.name}</h3>
                <h1>Amount Left: ${info.amount}</h1>
                <p>Weeks Left: {info.term}</p>
                <br/>
                <RaisedButton
                  id="pay"
                  label="Pay"
                  primary={true}
                  onClick={this.deleteLoan} 
                />
            </CardContent>
          </Card>
          <br/>
          <br/>
        </div>        
      )
    });
  
    return (
      <MuiThemeProvider>
        <React.Fragment>
            <AppBar title="miniAspire" />
            <div>
              <h2>Apply for a loan</h2>
              <TextField
                  id="name"
                  hintText="Name"
                  floatingLabelText="Enter Your Name"
                  value={this.state.name}
                  onChange={this.onTextChange}
              />
              <br/>
              <TextField 
                  id="amount"
                  hintText="Amount"
                  floatingLabelText="Amount Required"
                  value={this.state.amount}
                  onChange={this.onTextChange}
              />
              <br/>
              <SelectField
                  id="term"
                  hintText="Term"
                  floatingLabelText="Term Amount"
                  value={this.state.term}
                  onChange={this.onHandleChange}
              >
                <MenuItem value={4} primaryText="1 month"/>
                <MenuItem value={8} primaryText="2 months"/>
                <MenuItem value={12} primaryText="3 months"/>
              </SelectField>
              <br/>
              <br/>
              <RaisedButton
                  id="submit"
                  label="Get Loan"
                  primary={true}
                  onClick={this.addLoan}
              />
            </div>
            <br/>
            <br/>
            <div>
              {displayLoans}
            </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  };
};

export default App;
