import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Piechart from './components/PieChart';
import Donutchart from './components/DonutChart';
import ExpenseVisualizer from './components/ExpenseVisualizer';

const JSX = (
  <div>
    <App />
    <Piechart />
    <Donutchart />
    <ExpenseVisualizer />
  </div>
);

ReactDOM.render(JSX, document.getElementById('app'));
