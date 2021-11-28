import React from 'react';
import styled from 'styled-components';
//import { Theme } from './theme';
//import { device } from './device';

const Property = styled.div`
  border: 2px gray 
`;

const Listing = (props) => {

  const getInfo = (listing) => {
    // 1233 Westbank Expressway, Harvey, Louisiana, 70058, on 
    // v  ^  in between these ^  v
    //described property to wit:

    var beginRegx = new RegExp('1233 Westbank Expressway, Harvey, Louisiana, 70058, on ', 'g');
    var endRegx = new RegExp('the following described property to wit', 'g');
    beginRegx.test(listing);
    endRegx.test(listing);
    var begin = beginRegx.lastIndex;
    var locBegin = endRegx.lastIndex;
    var end = listing.search(endRegx);
    var dateString = listing.slice(begin, end);

    // Get Auction Month, Day, Year
    var monthRegex = /^([\w-]+)/;
    var month = dateString.match(monthRegex)[0];
    var dayRegex = /[0-9]+/g;
    var day = dateString.match(dayRegex)[0];
    var year = dateString.match(dayRegex)[1];
    // Get Auction Time
    var timeBegin = dateString.search(/(?<=at )\d/);
    var time = dateString.slice(timeBegin)

    // Get Property Location
    var locEndRegx = new RegExp(/This.+sale/, 'i');
    var locEnd = listing.search(locEndRegx);
    var location = listing.slice(locBegin, locEnd);

    return {
      month: month,
      day: day,
      year: year,
      time: time,
      location: location,
    }
  }


  const propertyInfo = getInfo(props.listing);

  return (
    <div>
      <p>{props.index}</p>
      <Property>
        <div>
          {propertyInfo.month + ' ' + propertyInfo.day + ', ' + propertyInfo.year}
        </div>
        <div>
          {propertyInfo.time}
        </div>
        <div>
          {propertyInfo.location}
        </div>
        {/* <div>
          {props.listing}
        </div> */}
      </Property>
    </div>
  )
}

export default Listing;