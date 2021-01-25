import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../App.css';
// import projects from './data.js';
import '../project-detail.css';

export default function ProjectDetails({match}) {
  
  
  const [item,setItem] =useState({
    id: '',
    title: '',
    type: '',
    imageUrl: '',
    description: '',
    longDescription:'',
    sanitizedHtml:'',
  });

  const [projects, setProjects] = useState([
    {
      id: '',
      title: "",
      type: "",
      imageUrl: "",
      description: "",
      longDescription: "",
      userId: "",
      sanitizedHtml: "",
    },
  ]);
  

  const ID = match.params.productid
    console.log(ID);


  useEffect(()=>{

     fetch("http://localhost:8080/"+ID)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setProjects(jsonRes));

    },[]);

    

  useEffect(() => {

    fetchItem();
    console.log(match.params.productid);
  },[])

  console.log(projects)

  const fetchItem=()=>{
    const projectItem =projects.map((project)=>{
      

      console.log(project._id);

    console.log(match.params.productid);

      
      return (project._id==match.params.productid)});
    setItem(projectItem);
    // console.log(projectItem.title);
  }
  
  return (
    <section className='section cocktail-section'>
        <Link to='/projects' className='back-btn'>
          Back Home
        </Link>
        <div className="projectDetail-card"> 
        <div className='section-title'>
          <h2>{projects.title}</h2>
          <div className="underline"></div>
        </div>
        <div className='project'>
          <img src={projects.imageUrl} alt={projects.title}></img>
          <div className='project-info1'>
            {/* <p>
              <span className='project-data'>Title :</span> {projects.title}
            </p>
            <p className='Category'>
              <span className='project-data'>Category :</span> {projects.type}
            </p>
            <p>
              <span className='project-data'>Project-Link :</span> <a href="#">Click here</a>
            </p> */}
            {/* <p>
              <span className='project-data'>Description :</span> {projects.description}
            </p> */}
            
             <div className='desc' dangerouslySetInnerHTML={{ __html: projects.sanitizedHtml }}>
    
          </div> 
            
           
          
          </div>
        </div>
        </div>
      </section>
)
}
