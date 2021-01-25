import React, {useEffect, useState} from 'react';
import './Section-1.css';

export  function UEvents() {


  let newDate = new Date()
let dt = newDate.getDate();
let mnth = newDate.getMonth() + 1;
let yr = newDate.getFullYear();

  const [events, setEvents] = useState([{

    name: '',
    date: '',
    month: '',
    year: '',
    day: '',
    time: '',
    venue: ''
  }])

  useEffect(() => {
    fetch('http://localhost:8080/events')
    .then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then((jsonRes) => {
      setEvents(jsonRes)})
  },[])

// events.filter(event => event.year == yr );



 let b = events.sort(function (a, b) {
  return  b.year - a.year || b.month - a.month|| b.date - a.date|| b.time - a.time;
});
b.reverse();

  let a = events.sort(function (a, b) {
  return  a.year - b.year || a.month - b.month|| a.date - b.date|| a.time - b.time;
});




  // events.sort(sortByProperty("month"));

  // events.sort(sortByProperty("date"));





  return (
    <div className="container" id="aboutus" >
      <div className="row">
          <div className="col-7 col-s-12">
            <div className="col">
              <h2 className="title" > About Us </h2>
            </div>
            <div className=' col col-12'>
                <p style={{fontFamily:"FF Tisa"}}>For most people, the sky is the limit. For us, the sky is our home.”
      The Aero-modelling Club at IIT BHU, Varanasi since its inception has expanded exponentially with the introduction of innovative technologies, be it the IC engine planes, the autonomous drones or other awesome flying models. We fabricate, fix, and fly to satiate our passion. Our phenomenal stunts will readily capture your attention towards our hobby of aeromodelling - to fabricate a splendid flying machine of your own and soar high in the sky.</p>

            </div>

            <div  className="img">
      <img src="https://cdn.pixabay.com/photo/2016/07/29/10/41/vector-1552354__340.png" alt="" height="110px" width="150px"/>
       </div>

          </div>
          <div className="col col-5 col-s-12 ">
            <div className='col'>
               <h2 className="title1">Upcoming Events</h2>

               <div className="event">
                 {a.filter(event => (event.year == yr && event.month >= mnth && event.date >= dt) ).map(event => (
                  <ul>
                    <li className="inline">

                        <div className="time col-l-2">

                          <h5> {event.date}/{event.month}</h5>
                        </div>
                        <div className="details">
                          <div className="name col-l-7">
                            <h3>{event.name}</h3>
                            <i className="fas fa-clock"> {event.time}</i>
                          </div>
                          <div className="join col-l-3">
                            <a href="#">Join</a>
                          </div>
                        </div>
                    </li>

                  </ul>
                ))}
               </div>
            </div>



          </div>
          <div className="col col-5 col-s-12 ">
            <div className='col'>
               <h2 className="title1">Past Events</h2>

               <div className="event">
                 {b.filter(event => (event.year <= yr && event.month <= mnth && event.date < dt ) ).map(event => (
                  <ul>
                    <li className="inline">

                        <div className="time col-l-2">

                          <h5>{event.date}/{event.month}</h5>
                        </div>
                        <div className="details past">
                          <div className="name col-l-7">
                            <h3>{event.name}</h3>
                            <i className="fas fa-clock"> {event.time}</i>
                          </div>
                          <div className="join col-l-3" >
                            <a href="#"><i id="play" class="fas fa-play fa-80px"  ></i></a>
                          </div>
                        </div>
                    </li>

                  </ul>
                ))}
               </div>
            </div>



          </div>
        </div>
      </div>

  );
}


// export  function PEvents() {


//   let newDate = new Date()
// let dt = newDate.getDate();
// let mnth = newDate.getMonth() + 1;
// let yr = newDate.getFullYear();

//   const [events, setEvents] = useState([{

//     name: '',
//     date: '',
//     month: '',
//     year: '',
//     day: '',
//     time: '',
//     venue: ''
//   }])

//   useEffect(() => {
//     fetch('http://localhost:8080/events')
//     .then(res => {
//       if(res.ok) {
//         return res.json()
//       }
//     }).then(jsonRes => setEvents(jsonRes))
//   })





//   return (
//     <div className="container">









//                    <div className="col-4 ">
//             <div className='col col-s-6'>
//                <h3>Past Events</h3>
//                  {events.map(event => (
//                <div className="event">
//                   <ul>
//                     <li className="inline">
//                         <div className="time col-l-2">
//                           <h3> {event.date} <br/><span>{event.month} </span></h3>
//                         </div>
//                         <div className="details">
//                           <div className="name col-l-7">
//                             <h3>{event.name}</h3>
//                             <i className="fas fa-clock"> {event.time}</i>
//                           </div>
//                           <div className="join col-l-3">
//                             <a href="#">Join</a>
//                           </div>
//                         </div>
//                     </li>

//                   </ul>
//                </div>
//             ))}
//             </div>
//             </div>







//         </div>

//   );
// }
