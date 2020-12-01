import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie
  } from 'recharts';
import classes from './graph.module.css';
 
  
  
  const Graph = ( props ) => {

      return ( 
        <div className={classes.wrapper}> 
         <p className={classes.title}>{props.title}</p>   
        <ResponsiveContainer width = "100%" height={250} >
            {props.graph}
        </ResponsiveContainer>
       </div>
      )
  };
  
  export default Graph;
