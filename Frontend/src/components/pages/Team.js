
import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../Teams.css';
import Aos from 'aos';
import 'aos/dist/aos.css';


export default function Teams() {

  const [teams, setTeams] = useState([{
    
    name: '', 
    department: '',
    degree: '',
    year: '',
    por: '',
    photo: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    portfolio: ''


  }])

  useEffect(() => {
    fetch('http://localhost:8080/teams')
    .then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setTeams(jsonRes))
  },[])

  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);

  const DisplayStyle=(elem)=>{
    if (elem===null || elem===''|| elem===undefined){
      return ('none');
    }
    else{
      return('inline-block');
    }
  }

  let a = teams.sort(function (a, b) {
  return  a.por-b.por||a.year-b.year;
});

  return (
    <>
    <div className="team-section">
      <div className="title" data-aos='zoom-in'>
        <h1>Our Team</h1>
        <div className="underline">
        </div>
      </div>
      <figure data-aos='zoom-in'>
       <blockquote cite="https://quotefancy.com/quote/1384103/Eddie-Rickenbacker-Aviation-is-proof-that-given-the-will-we-have-the-capacity-to-achieve">
        <p>Aviation is proof that given the will, we have the capacity to achieve the impossible.</p>
       </blockquote>
       <figcaption>—Eddie Rickenbacker</figcaption>
      </figure>
      <div className="team-wrapper">
        {a.map(team => (
          <div className="team-container" data-aos='flip-left' data-aos-duration='2000' data-aos-easing='ease-out-cubic'>
              <div className="images">
                <div className='banner-img'></div>
              <img src={team.photo} alt={team.name} className='profile-img' />
              </div>
              <div className="info">
                  <h1 className="membName">{team.name}</h1>
                  <span className='position'>{team.profession}</span>
                  <p className="description">{team.department}, {team.year}</p>
              </div>
              <div className='team-social-icons'>
                <ul>
                <li className="icon" style={{display:DisplayStyle(team.facebook)}}><a href={team.facebook} target="_blank"><i className='fab fa-facebook-f'/></a></li>
                <li className="icon" style={{display:DisplayStyle(team.linkedin)}}><a href={team.linkedin} target="_blank"><i className='fab fa-linkedin-in' target="_blank"/></a></li>
                <li className="icon" style={{display:DisplayStyle(team.instagram)}}><a href={team.instagram} target="_blank"><i className='fab fa-instagram' target="_blank"/></a></li>
                <li className="icon" style={{display:DisplayStyle(team.portfolio)}}><a href={team.portfolio} target="_blank"><i className='fa fa-briefcase' target="_blank"/></a></li>
                </ul>
              </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
