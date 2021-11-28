import React, { Component } from 'react';
import styled from 'styled-components';
import Listing from './ListingComponent.js'
import { Theme } from './theme';
//import { device } from './device';

const Container = styled.div`
  margin: 0 auto 10vh auto;
  width: 90%;
  max-width: 900px;
  color: ${Theme.textDark};
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { listings: [] };

    this.handleClick = this.handleClick.bind(this);
    this.getListings = this.getListings.bind(this);
  }

  componentDidMount() {
    this.getListings();
  }

  handleClick() {
    alert('Clicked!');
  }

  getListings() {
    const url = 'http://localhost:5000'
    fetch(url + '/api/scrapeList')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then((data) => {
          this.setState({
            listings: data.Listings
          }, () => console.log(this.state.listings.length));
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  };

  render() {
    return (
      <Container>
        <h1>Home</h1>
        <button onClick={this.handleClick}>Test</button>
        <h3>Listings</h3>
        <div>
          {this.state.listings.map((listing, i) => {
            return (
              <Listing
                index={i + 1}
                key={i}
                listing={listing}
              />
            );
          })}
        </div>

      </Container>
    );
  }
}

export default Home;
