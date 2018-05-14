import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './markerGenerator.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'leaflet/dist/leaflet.css';

const Range = Slider.Range;

export default class markerGenerator extends React.Component{
  /**Default Constructor*/
  constructor(){
    super();
    this.state = {
      startIndex: 0,
      endIndex: 1,
    };
  }

  /**clickedMarker Function*/
  clickedMarker = (point, index, component) => {
    //Checking which button is clicked
    if(component === "start"){
      //Setting select start point
      //this.props.onSelectStartPoint(point);

      //Setting state
      this.setState({startIndex: index});
    }else if(component === "end"){
      //Setting select end point
      //this.props.onSelectEndPoint(point);

      //Setting state
      this.setState({endIndex: index});
    }else{
      //Setting state
      this.setState({
        startIndex: 1,
        endIndex: this.props.points.length
      });
    }
  }

  /**sliderUpdated Function*/
  sliderUpdated = (value) => {
    //Setting select start point
    //this.props.onSelectStartPoint(this.props.points[value[0]]);

    //Setting select end point
    //this.props.onSelectEndPoint(this.props.points[value[1]]);

    //Setting state
    this.setState({
      startIndex: value[0],
      endIndex: value[1]
    });
  }

  /**loadMarkers Function*/
  loadMarkers = () => {
    //Declaring fields
    var points = this.props.points;
    var pos = 0;
    var markers = [];
    var iconType;
    var type = 0;

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

        //Setting type
        type = 1;
      }else if(this.state.endIndex === i){
        //Changing to red
        iconType = L.icon({
          iconUrl: require('./red-icon.png'),
          iconSize: new L.Point(15,30)
        });

        //Setting type
        type = 2;
      }else{
        //Changing to blue
        iconType = L.icon({
          iconUrl: require('./blue-icon.png'),
          iconSize: new L.Point(15,30)
        });

        if(this.state.endIndex < i){
          //Setting type
          type = 3;
        }else if(this.state.startIndex > i){
          //Setting type
          type = 4;
        }else{
          //Setting type
          type = 5;
        }
      }

      //Checking type
      if(type === 1){
        //Creating new marker
        markers.push(
          <Marker position = {pos} key = {i} icon = {iconType}>
            <Popup>
              <span>
                Latitude: {points[i].latitude} <br />
                Longitude: {points[i].longitude} <br />
                Time: {points[i].time} <br />
                <div className = "center">
                  <input type = "button" disabled value = "Start" onClick = {() => {this.clickedMarker(points[i], i, "start")}}/>
                  <input type = "button" disabled value = "End" onClick = {() => {this.clickedMarker(points[i], i, "end")}}/>
                </div>
              </span>
            </Popup>
          </Marker>
        )
      }else if(type === 2){
        //Creating new marker
        markers.push(
          <Marker position = {pos} key = {i} icon = {iconType}>
            <Popup>
              <span>
                Latitude: {points[i].latitude} <br />
                Longitude: {points[i].longitude} <br />
                Time: {points[i].time} <br />
                <div className = "center">
                  <input type = "button" disabled value = "Start" onClick = {() => {this.clickedMarker(points[i], i, "start")}}/>
                  <input type = "button" disabled value = "End" onClick = {() => {this.clickedMarker(points[i], i, "end")}}/>
                </div>
              </span>
            </Popup>
          </Marker>
        )
      }else if(type === 3){
        //Creating new marker
        markers.push(
          <Marker position = {pos} key = {i} icon = {iconType}>
            <Popup>
              <span>
                Latitude: {points[i].latitude} <br />
                Longitude: {points[i].longitude} <br />
                Time: {points[i].time} <br />
                <div className = "center">
                  <input type = "button" disabled value = "Start" onClick = {() => {this.clickedMarker(points[i], i, "start")}}/>
                  <input type = "button" value = "End" onClick = {() => {this.clickedMarker(points[i], i, "end")}}/>
                </div>
              </span>
            </Popup>
          </Marker>
        )
      }else if(type === 4){
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
                  <input type = "button" disabled value = "End" onClick = {() => {this.clickedMarker(points[i], i, "end")}}/>
                </div>
              </span>
            </Popup>
          </Marker>
        )
      }else{
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
                  <Range
                    step = {1}
                    value = {[this.state.startIndex, this.state.endIndex]}
                    id = "slider1"
                    min = {0}
                    max = {this.props.points.length - 1}
                    allowCross = {false}
                    pushable
                    trackStyle = {[
                      {backgroundColor: "blue"}
                    ]}
                    handleStyle = {[
                      {backgroundColor: "green"},
                      {backgroundColor: "red"}
                    ]}
                    railStyle = {{
                      backgroundColor: "black"
                    }}
                    onChange = {this.sliderUpdated}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
