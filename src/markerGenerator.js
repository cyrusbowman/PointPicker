import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './markerGenerator.css';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class markerGenerator extends React.Component{
  /**Default Constructor*/
  constructor(){
    super();
    this.state = {
      startIndex: -1,
      endIndex: -1,
    };
  }

  /**update Function*/
  update = (val) => {
    console.log(val.valueNow);
  }

  /**clickedMarker Function*/
  clickedMarker = (point, index, component) => {
    //Checking which button is clicked
    if(component === "start"){
      //Setting select start point
      //this.props.onSelectStartPoint(point);

      //Setting state
      this.setState({startIndex: index});
    }else{
      //Setting select end point
      //this.props.onSelectEndPoint(point);

      //Setting state
      this.setState({endIndex: index});
    }
  }

  /**loadMarkers Function*/
  loadMarkers = () => {
    //Declaring fields
    var points = this.props.points;
    var pos = 0;
    var markers = [];
    var iconType;

    //Looping through points
    for(let i = 0; i < points.length; i++){
      //Getting position
      pos = [points[i].latitude, points[i].longitude];

      //Checking start/end index
      if(this.state.startIndex === i){
        //Changing to green
        iconType = L.icon({
          iconUrl: require('./green-icon.png'),
          iconSize: new L.Point(15,30)
        });
      }else if(this.state.endIndex === i){
        //Changing to red
        iconType = L.icon({
          iconUrl: require('./red-icon.png'),
          iconSize: new L.Point(15,30)
        });
      }else{
        //Changing to blue
        iconType = L.icon({
          iconUrl: require('./blue-icon.png'),
          iconSize: new L.Point(15,30)
        });
      }

      //Creating new marker
      markers.push(
        <Marker position = {pos} key = {i} icon = {iconType}>
          <Popup>
            <span>
              Latitude: {points[i].latitude} <br />
              Longitude: {points[i].longitude} <br />
              Time: {points[i].time} <br />
              <div className = "center">
                <input type = "button" value = "Start" onClick = {() => {this.clickedMarker(points[i], i, "start")}}/>
                <input type = "button" value = "End" onClick = {() => {this.clickedMarker(points[i], i, "end")}}/>
              </div>
            </span>
          </Popup>
        </Marker>
      )
    }
    //Returning marker array
     return markers;
  }

  /**Rendering Webpage*/
  render(){
    //Getting center position
    const pos = [this.props.points[0].latitude, this.props.points[0].longitude]

    //Displaying webpage
    return(
      <div>
        <div>
          <Map center = {pos} zoom = {13}>
            <TileLayer
              attribution = "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            {this.loadMarkers()}
          </Map>
        </div>
        <div className = "center">
          <br />
          <table border = "1px solid black" align = "center" width = "80%">
            <tbody>
              <tr>
                <td>
                  <Slider
                    step = {1}
                    defaultValue = {1}
                    id = "slider1"
                    min = {1}
                    max = {this.props.points.length}
                    trackStyle = {{
                      backgroundColor: "red"
                    }}
                    railStyle = {{
                      backgroundColor: "green"
                    }}
                    onChange = {() => {this.update(document.getElementById("slider1"))}}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
