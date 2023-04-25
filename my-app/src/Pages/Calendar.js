import React, {Fragment, useState} from 'react';
import Searchbar from './Searchbar';
import CalendarFormat from './CalendarFormat';



export default function Calendar(){
  return (
    <Fragment>
       <h1>Calendar</h1>
       <Searchbar />
       <CalendarFormat />
    </Fragment>
  
  )

}