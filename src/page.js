import React from 'react';
import points from "./points.js";
import MarkerGenerator from "./markerGenerator.js";

export default class page extends React.Component{
  /**selectedStart Function*/
  selectedStart = (point) => {
    console.log("START POINT\n"
              + "Latitude: " + point.latitude + "\n"
              + "Longitude: " + point.longitude + "\n"
              + "Time: " + point.time);
  }

  /**selectedEnd Function*/
  selectedEnd = (point) => {
    console.log("END POINT\n"
              + "Latitude: " + point.latitude + "\n"
              + "Longitude: " + point.longitude + "\n"
              + "Time: " + point.time);
  }


  render(){
    return(
      <MarkerGenerator points = {points}
        onSelectStartPoint = {(point) => {this.selectedStart(point)}}
        onSelectEndPoint = {this.selectedEnd}/>
    )
  }
}
