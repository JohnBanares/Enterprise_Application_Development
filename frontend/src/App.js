import './css/App.css';
import shoe from './image/shoe.png';
import { useEffect } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";

function App() {

	useEffect(() => {
		// Fetch restaurant data from MongoDB
		axios.get(`http://localhost:3003/api/products/`)
		.then(response => {
			// setReviews(response.data);
			console.log(response.data);
		})
		.catch(error => {
			console.error('Error fetching reviews:', error);
		});
		}, []);

	return (
		<div className="home">

			<div className="header">
				<h1>Test the REST Microservice server implmented using Node.js</h1>
				
				<div className='search'>
					<input placeholder="Search"/>
					<CiSearch className='icon-search'/>
				</div>
			</div>	

			<div className="buttons">
				<button>Insert</button>
				<button>Delete</button>
				<button>Update</button>
			</div>
		
			<div className='insertItem'>
					<p>Name:<input/></p>
					<p>Id:<input/></p>
					<p>Manufacturer:<input/></p>	

					<p>Type:<input/></p>
					<p>Price:<input/></p>	
					<p>Description:<input/></p>

					<div className='image'> 
						<p>Image:</p>		
						<img src={shoe}/>	
					</div>
			</div>
		</div>

	);	
}

export default App;
