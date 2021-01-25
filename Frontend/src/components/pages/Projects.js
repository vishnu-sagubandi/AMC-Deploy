import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import '../project.css';
// import projects from './data';


export default function Projects() {



  const [projects, setProjects] = useState([
    {
      title: "",
      type: "",
      imageUrl: "",
      description: "",
      longDescription: "",
      userId: "",
      sanitizedHtml: "",
    },
  ]);
  



  useEffect(() => {
    fetch("http://localhost:8080/projects")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setProjects(jsonRes));
  },[]);


const alltypes = ['all', ...new Set(projects.map((item) => item.type))];
 console.log(alltypes);
  
  const [menuprojects, setMenuprojects] = useState(projects);
  const [types, settypes] = useState(alltypes);
  

  const filterprojects = (type) => {
    if (type === 'all') {
      setMenuprojects(projects);
      return;
    }
   
    const newprojects = projects.filter((project) => project.type === type);
    setMenuprojects(newprojects);
  };

   console.log(types);
    const Types = ({ types, filterprojects }) => {
      // console.log(types);
    return (



      <div className="btn-container" onLoad={() => filterprojects('all')}>


        {alltypes.map((type) => {
          
          return (
            
            <button
              type="button"
              className="filter-btn btn-default"
              onClick={() => filterprojects(type)}
              
            >
              {type}
            </button>
          );
        })}
      </div>
    );
  };

  

  const Menu = ({ projects }) => {
  return (
    <div className="project-section-center">

    
    
      {projects.map(menuproject => {
        const {_id,title, imageUrl, description } = menuproject;
        
        return (
          <article className="menu-project">
            <img src={imageUrl} alt={title} className="photo" />
            <div className="project-info">
              <header>
                <h4>{title}</h4>
              </header>
              <p className="project-text">{description}</p>
              <Link to={'/'+_id} id='ExtraBtn'><a  className='Extra-btn' >Read more</a></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

  return (
    <div className="container">
      <div className="projects-title">
          <h2>our projects</h2>
          <div className="project-underline"></div>
        </div>
      <Types types={types} filterprojects={filterprojects} />
      <Menu projects={menuprojects} />
    </div>
  )
}
