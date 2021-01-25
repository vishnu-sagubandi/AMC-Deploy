
import React, {useEffect, useState} from 'react';
// import '../../App.css';
import './Timeline.css'
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {ReactComponent as Trophy} from './Trophy.svg'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Achievements() {

  const [achievements, setAchievements] = useState([{
    
    name: '', 
    month: '',
    year: '', 
    description: ''
    


  }])

  

  useEffect(() => {
    fetch('http://localhost:8080/achievements')
    .then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setAchievements(jsonRes))
  },[])

  useEffect(()=>{
    Aos.init({duration:1200})
  },[])

  let achievementicon={background: "gold"}


  return (
    <div className="container">
    <div className='achievement'>
      <h2 className='ah' data-aos='flip-right'
      style={{
        display:"flex",
        justifyContent:"center",
        color:"black",
        textDecoration:"underline",
        letterSpacing:"2px"
        // fontFamily:"quicksand"
      }}>Achievements</h2>
      <VerticalTimeline
      animate={false}
      >
      <div data-aos='flip-left'>
      {achievements.map(achievement => (
          <VerticalTimelineElement
          key={achievement.name}
          date={achievement.month+' / '+achievement.year}
          dateClassName="date"
          iconStyle={achievementicon}
          icon={<Trophy />}
          >
            <h3  className='vertical-timeline-element-title ah1'>
              {achievement.name}
            </h3>
            <p className='vertical-timeline-element-subtitle'>
              {achievement.description}
            </p>
        </VerticalTimelineElement>
      ))}
      </div>
      </VerticalTimeline>
    </div>
  </div>
  )
}

export default Achievements

// export  function Events() {

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
//       {events.map(event => (
//       <div>
//         <h1>{event.name}</h1>
        
//       </div>
//       ))}
//     </div>
//   )
// }
