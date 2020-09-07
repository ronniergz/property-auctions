import React, { Component } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const TableRow = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 3px 10px;
  border: 1px solid #999999;
`;

class Equity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      price: '',
      eps: '',
      futPe: '',
      growth: '',
      mos: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
    this.getMos = this.getMos.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return { symbol: props.symbol.toUpperCase(), futPe: props.futPe, growth: props.growth };
  }

  componentDidMount() {
    this.getData();
  }

  getMos() {
    // calculates margin of safety and updates state object
    let x = 1 + parseFloat(this.state.growth) / 100;
    let futEps = this.state.eps * Math.pow(x, 10);
    let futPe = this.state.futPe;
    let Mos = ((this.state.price / ((futEps * futPe) / 4)) * 100).toFixed(2); //;
    console.log(Mos);
    this.setState({ mos: Mos });
  }

  getData() {
    // request current scraped data from server
    fetch('http://192.168.1.81:5000/api/scrape?symbol=' + this.state.symbol)
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then((data) => {
          this.setState({
            price: data.Price,
            eps: data.EPS,
          });
          this.getMos();
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.state.symbol}</TableCell>
        <TableCell>{this.state.price}</TableCell>
        <TableCell>{this.state.futPe}</TableCell>
        <TableCell>{this.state.eps}</TableCell>
        <TableCell>{this.state.growth}%</TableCell>
        <TableCell>{this.state.mos}%</TableCell>
        <TableCell>
          <Button onClick={this.props.edit}>Edit</Button>
        </TableCell>
      </TableRow>


    );
  }
}

export default Equity;
