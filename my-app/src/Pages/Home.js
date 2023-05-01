import React, {Fragment} from 'react';
import Schedule from './Schedule'

export default function Home(){
    return (
        <Fragment>
           <h1>Home</h1>
           <p>Welcom to our App! This page is currently WIP. To add courses, select search in top right.
           </p>
           <Schedule />
        </Fragment>
        
      )
}