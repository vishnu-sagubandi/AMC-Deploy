import React, {useEffect, useState} from 'react';
import '../../App.css';

export default function Events() {

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
    }).then(jsonRes => setEvents(jsonRes))
  },[])

  return (
    <div className="container">
      {events.map(event => (
      <div>
        <h1>{event.name}</h1>
        
      </div>
      ))}
    </div>
  )
}
