import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/About.css';


 
function About(){
    const [aboutContent, setAboutContent] = useState('');

    useEffect(() => {
      // grab html data from html file stored on the backend and generate contents into div
      axios.get(`http://localhost:3003/about`)
        .then(response => {
          setAboutContent(response.data);
        })
        .catch(error => {
          console.error('Error fetching about page content:', error);
        });
    }, []);

   
    return(
        <>
        <div className='aboutHome'>
            <h1>About this page</h1>
            <Link className='back'  to="/">Back Home</Link>
            {/* generate content fetched */}
            <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
        </div>
        </>
    )
}

export default About