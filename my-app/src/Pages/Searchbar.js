import React, { useState } from 'react';
import axios from 'axios';
import "./Searchbar.css";
import Popup from "./Popup"
import * as $ from 'jquery';


const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [succesfulAdd, setSuccesfulAdd] = useState(false);



  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(  `http://localhost:8080/search?code=${query}`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        //const dataMap = data.map((d) => <li key={d.crs_code}>{d.crs_code}</li>);
        const dataMap = data.map((d) => 
        <div class="card" >
          <div class="card-body">
            <h5 class="card-title" key={d.crs_title}>{d.crs_title}: {d.crs_code}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <button type="button" class="btn btn-sm btn-primary" onClick={createFunction(d.crs_code)}>Add This Class</button>
            <Popup query={d.crs_code}></Popup>
          </ul>
          <script type="text/javascript">
            document.getElementById('mydiv').style.visibility='visible';
          </script>
        </div>);
        setResponse(dataMap);
      })
      .catch((error) => {
        setError('Failed to retrieve search results.');
      });
  };

  const createFunction = (course_code) => {
    const currentCourse = course_code;
    const handleAdd = (event) => {
      event.preventDefault();
      axios.get(  `http://localhost:8080/addCourse?code=${currentCourse}`)
        .then((response) => {
          console.log(response);
          window.scrollTo(0, 0);
          const data = response.data;
          setSuccesfulAdd(data)
          if (data === 3) {
            closePopup();
            console.log("Add class ran")
            document.getElementById("addCourseSuccess").style.display="inline";

          } else if(data===0){
            closePopup();
            console.log("Add class ran, but died")
            document.getElementById("addCourseFail").style.display="inline";
          }else if(data===1){
            closePopup();
            console.log("Course overlap error")
            document.getElementById("addCourseFailOverlap").style.display="inline";
          }else if (data===2){
            closePopup();
            console.log("Credits maxxed error")
            document.getElementById("addCourseFailCredit").style.display="inline";
          }else if(data===4){
            closePopup();
            console.log("Already have course")
            document.getElementById("addCourseFailAlready").style.display="inline";
          }
        })
        .catch((error) => {
          document.getElementById("addCourseFail").style.display="inline";

          console.log("Add class failed")
        });
    }
    return handleAdd;
  };

  const createRemove = (course_code) => {
    const currentCode = course_code;
    const handleRemove = (event) => {
      event.preventDefault();
      axios.get(`http://localhost:8080/removeCourse?code=${currentCode}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data === true) {
            console.log("Removed Course Succesfully");
            document.getElementById("removeCourseSuccess").style.display="inline";
          } else {
            console.log("Remove Course ran but returned False");
            document.getElementById("removeCourseFail").style.display="inline";

          }
        })
        .catch((error) => {
          console.log("Remove Course failed")
          document.getElementById("removeCourseFail").style.display="inline";

        })
    }
  
    return handleRemove;
  };

  return (
    <div>
      <div class="alert alert-success" id="addCourseSuccess" role="alert">
            Succesfully addded course
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
      <div class="alert alert-success" id="removeCourseSuccess" role="alert">
            Succesfully removed course
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div> 
            <div class="alert alert-danger" id="addCourseFail" role="alert">
            Failed to add course
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
        <div class="alert alert-danger" id="addCourseFailOverlap" role="alert">
            Failed to add course due to existing schedule overlaps
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
        <div class="alert alert-danger" id="addCourseFailCredit" role="alert">
            Failed to add course due to the 18 credit limit
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
        <div class="alert alert-warning" id="addCourseFailAlready" role="alert">
            Course already added
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
        <div class="alert alert-danger" id="removeCourseFail" role="alert">
            Failed to remove course
              <button type="button" class="close" data-dismiss="alert" onClick={closePopup} aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
        </div>
      <form onSubmit={handleSearch}>
        {error && <div className="error">{error}</div>}
        <div class="input-group input-group-lg">
  <div class="input-group-prepend">  </div>
  <input type="text" class="form-control" aria-label="Large" placeholder="Search by course code, course title, time, day" aria-describedby="inputGroup-sizing-sm" value={query} onChange={(event) => setQuery(event.target.value)}/>
</div>
      </form>

      {response && <dir className="response" style={{padding: 10}}>{response}</dir>}
    </div>
      
  );
};

const closePopup = ()=>{
 document.getElementById("addCourseSuccess").style.display="none";
 document.getElementById("removeCourseSuccess").style.display="none";
 document.getElementById("addCourseFail").style.display="none";
 document.getElementById("removeCourseFail").style.display="none";
 document.getElementById("addCourseFailCredit").style.display="none";
 document.getElementById("addCourseFailOverlap").style.display="none";
 document.getElementById("addCourseFailAlready").style.display="none";



}



//  const createFunction = (course_code) => {
//   const currentCourse = course_code;
//   const handleAdd = (event) => {
//     event.preventDefault();
//     axios.get(  `http://localhost:8080/addCourse?code=${currentCourse}`)
//       .then((response) => {
//         console.log(response);
//         const data = response.data;
//         if (data === true) {
//           document.getElementById("myPopup").style.display="inline";
//           console.log("Add class ran")
//         } else {
//           console.log("Add class ran, but died")
//         }
//       })
//       .catch((error) => {
//         console.log("Add class failed")
//       });
//   }
//   return handleAdd;
// }

export default Searchbar;