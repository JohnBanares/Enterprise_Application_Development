import './css/App.css';
import shoe from './image/shoe.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";


function App() {

	const [insertCheck, setInsertCheck] = useState('');
	const [searchCheck, setSearchCheck] = useState('');
	const [productList, setProductList] = useState([]);

	const [searchVal, setSearchVal] = useState('');

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
	
	//when insert button is clicked show insert container 
	// and ensure search container is gone
	const handleInsertCheck = (condtion)=>{
		setInsertCheck(condtion);
		setSearchCheck(false);
	} 

	const handleSearchCheck = (condtion)=>{
		setSearchCheck(condtion);
	} 

	// update search val
	const handleValChange = (event) => {
		setSearchVal(event.target.value);
	}

	// action when search button is clicked
	const handleSearch = () => {
		console.log("Search term:", searchVal);
		setSearchCheck(true);
	}
	
	// execute search when enter key is pressed when typing 
	// and ensure insert container is gone 
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
			setInsertCheck(false);

			axios.get(`http://localhost:3003/api/products/get-specific-products/${searchVal}`)
			.then(response => {
				console.log("returning search results", response.data);			
			})
			.catch(error => {
				console.error('Error fetching reviews:', error);
			});
			  


		}
	}


	return (
		<div className="home">

			<div className="header">
				<h1>Test the REST Microservice server implmented using Node.js</h1>
				
				{/* search */}
				<div className='search'>
					<input placeholder="Search" onChange={handleValChange} onKeyDown={handleKeyPress}/>
					<CiSearch className='icon-search'/>
				</div>

			</div>	

			{/* CRUD opetations */}
			<div className="buttons">
				<button onClick={()=> handleInsertCheck(true)}>Insert</button>
				<button>Delete</button>
				<button>Update</button>
			</div>
		
			{/* show insert container if insert button is clicked */}
			{insertCheck && <div className='insertItem'>
					<h3>Insert</h3>
					<p>Name:<input/></p>
					<p>Id:<input/></p>
					<p>Brand:<input/></p>	

					{/* <p>Type:<input/></p> */}
					<p>Price:<input/></p>	
					{/* <p>Description:<input/></p> */}

					<div className='image'> 
						<p>Image:</p>		
						<img src={shoe}/>	
					</div>
					<IoIosClose className='close'onClick={()=>handleInsertCheck(false)}/>

			</div>}

			{searchCheck && <div className='insertItem'>
					<h3>Search Results</h3>
					<p>Name:<input readOnly='true'/></p>
					<p>Id:<input/></p>
					<p>Brand:<input/></p>	

					{/* <p>Type:<input/></p> */}
					<p>Price:<input/></p>	
					{/* <p>Description:<input/></p> */}

					<div className='image'> 
						<p>Image:</p>		
						<img src={shoe}/>	
					</div>
					<IoIosClose className='close'onClick={()=>handleSearchCheck(false)}/>
			</div>}
		

		</div>

	);	
}

export default App;
