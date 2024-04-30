import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
function About(){
    const [aboutContent, setAboutContent] = useState('');

    useEffect(() => {
      // Fetch data from the server-side route
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
        <div>
            <h1>About this page</h1>
            <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
        </div>
        </>
    )
}

export default About