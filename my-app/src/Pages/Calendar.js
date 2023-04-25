import React, {Fragment, useState} from 'react';
import Searchbar from './Searchbar';

// import { getMonth } from './util';
// import CalendarHeader from './CalendarHeader';
// import Month from './Month';
// import Sidebar from './Sidebar';


export default function Calendar(){
  // console.table(getMonth(3))
  // const [currentMonth, setCurrentMonth] = useState(getMonth())
  return (
    <Fragment>
       <h1>Calendar</h1>
       <Searchbar />
    </Fragment>
    // <React.Fragment>
    //   <div className="h-screen flex flex-columns">
    //     <CalendarHeader />
    //     <div className="flex flex-1">
    //       <Sidebar />
    //       <Month month= {currentMonth}/>
    //     </div>
    //   </div>
    // </React.Fragment>
  
  )

}