import React from 'react';
import points from "./points.js";
import MarkerGenerator from "./markerGenerator.js";

export default class page extends React.Component{
  /**selectedStart Function*/
  selectedStart = (point) => {
    var latitude = point.latitude;
    alert(latitude);
  }

  /**selectedEnd Function*/
  selectedEnd = (point) => {
    var longitude = point.longitude;
    alert(longitude);
  }


  render(){
    return(
      <MarkerGenerator points = {points}
        onSelectStartPoint = {(point) => {this.selectedStart(point)}}
        onSelectEndPoint = {this.selectedEnd}/>
    )
  }
}
