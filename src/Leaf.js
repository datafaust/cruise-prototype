import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import classes from './leaf.module.css'

class Leaf extends Component {
    render() {


    let cleanData = [];


 

      this.props.data.map(data=>{
        cleanData.push([data.latitude, data.longitude, 1])
      }) 

      //console.log(this.props.data)

        return (
            <Map center={[40.7510, -73.9688]}
            zoomControl={false} 
            zoom={8}
            className={classes.map}
            //style= {mapStyles}
          >
          {
          cleanData.length > 0 ?
          <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={cleanData} //input state data here i.e. addressPoints
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])}
                radius = {15}
                />
           : <div></div>
          }
                <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url= 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            />
    
    
          </Map>
    
    
        );
    }
}

export default Leaf;