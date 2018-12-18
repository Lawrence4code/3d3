import React, { Component } from 'react';
import database from '../firebase/firebase';
import '../../node_modules/materialize-css/dist/js/materialize';
// import './ExpenseVisualizerGraph';

class ExpenseVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      expenseText: '',
      cost: '',
      error: ''
    };
  }

  onFormSubmit(e) {
    const { expenseText, cost, error } = this.state;

    e.preventDefault();
    console.log('form submitted');

    const item = {
      expenseText,
      cost
    };

    if (expenseText && cost) {
      database
        .collection('expenses')
        .add(item)
        .then(() => {
          this.setState(() => {
            return {
              expenseText: '',
              cost: '',
              error: ''
            };
          });
        });
    } else if (expenseText && !cost) {
      this.setState(() => {
        return { error: 'Cost of item is required' };
      });
    } else if (cost && !expenseText) {
      this.setState(() => {
        return { error: 'Name of expense is required.' };
      });
    } else {
      this.setState(() => {
        return { error: 'Name and Cost of item is required.' };
      });
    }
  }

  onTextChange(e) {
    const expenseText = e.target.value;
    this.setState(() => {
      return { expenseText };
    });
  }

  onCostChange(e) {
    const cost = parseInt(e.target.value);
    this.setState(() => {
      return { cost };
    });
  }

  render() {
    console.log(this.state);
    const { expenseText, cost, error } = this.state;

    return (
      <div className="indigo">
        <header className="indigo darken-1 section">
          <h2 className="center white-text">Expense Visualizer</h2>
          <p className="flow-text grey-text center text-lighten-2">
            Monthly Expense Tracker
          </p>
        </header>
        <div className="container section">
          <div className="row">
            <div className="col s12 m6">
              <form
                onSubmit={e => this.onFormSubmit(e)}
                className="card z-depth-0"
              >
                <div className="card-content">
                  <span className="card-title indigo-text"> Add Expense: </span>
                  <div className="input-field">
                    <input
                      type="text"
                      id="name"
                      value={expenseText}
                      onChange={e => this.onTextChange(e)}
                    />
                    <label htmlFor="name"> Expense Name: </label>
                  </div>
                  <div className="input-field">
                    <input
                      type="number"
                      id="cost"
                      value={cost}
                      onChange={e => this.onCostChange(e)}
                    />
                    <label htmlFor="cost"> Expense Cost ($): </label>
                  </div>
                  <div className="input-field center">
                    <button className="btn pink white-text">Add Expense</button>
                  </div>
                  <div className="input-field center">
                    {error && <p> {error}</p>}
                  </div>
                </div>
              </form>
            </div>
            <div className="col s12 m5 push-m1">
              <div className="canvas" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenseVisualizer;
