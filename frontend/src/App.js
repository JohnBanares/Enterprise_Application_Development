import './css/App.css';
import shoe from './image/shoe.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";


function App() {

	const [insertCheck, setInsertCheck] = useState('');
	const [searchCheck, setSearchCheck] = useState('');
	const [deleteCheck, setDeleteCheck] = useState('');

	const [productList, setProductList] = useState([]);
	const [searchVal, setSearchVal] = useState('');

	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState('');

	const [deleteState, setDeleteState] = useState([]);

	useEffect(() =>{
		setDeleteState(Array(productList.length).fill(false));
	}, [productList]);

// -------------------------------------- delete -------------------------------------------------------------
	//keep state of each container being deleted
	const handleDelete = (index) => {
        const newClickedState = [...deleteState];

		// toggle state of button
		if(newClickedState[index] === false){
			newClickedState[index] = true;
			setDeleteState(newClickedState);
			console.log(newClickedState);
			return;
		}
		if(newClickedState[index] === true){
			newClickedState[index] = false;
			setDeleteState(newClickedState);
			console.log(newClickedState);
			return;
		}
    };

	const handleDeleteCheck = (condtion) => {
		setDeleteCheck(condtion);
	}


// -------------------------------------- Insert -------------------------------------------------------------	
	//when insert button is clicked show insert container 
	// and ensure search container is gone
	const handleInsertCheck = (condtion)=>{
		setInsertCheck(condtion);
		setSearchCheck(false);


		//if closing insert container then reset input values
		if(condtion === false){
			setBrand('');
			setId('');
			setName('');
			setPrice('');
		}
	} 

	// update search val
	const handleValChange = (event) => {
		setSearchVal(event.target.value);
	}

	//handle submit insert
	const handleSubmit = async(event) => {
		event.preventDefault();
	
		console.log(name, id, brand, price);

		const manufacturer = brand;

		try {
			const response = await axios.post('http://localhost:3003/api/products/insert-product', {
				name: name,
				id: id,
				manufacturer: manufacturer,
				price: price
			});
	
			console.log('success');
			setBrand('');
			setId('');
			setName('');
			setPrice('');
		} catch (error) {
			console.error('Error inserting product:', error);
		}
	}


// -------------------------------------- Search -------------------------------------------------------------	
	const handleSearchCheck = (condtion)=>{
		setSearchCheck(condtion);

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
				setProductList(response.data);	
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
				<button onClick={()=> handleDeleteCheck(true)}>Delete</button>
				<button>Update</button>
			</div>
		
			{/* show insert container if insert button is clicked */}
			{insertCheck && <div className='insertItem'>
					<form onSubmit={handleSubmit}>
						<p>Name:<input value={name} onChange = {(event) => setName(event.target.value)}/></p>
						<p>Id:<input value={id} onChange = {(event) => setId(event.target.value)}/></p>
						<p>Brand:<input value={brand} onChange = {(event) => setBrand(event.target.value)}/></p>	
						<p>Price:<input value={price} onChange = {(event) => setPrice(event.target.value)}/></p>	
						<button type='submit'>Insert new product</button>
					</form>


					<div className='image'> 
						<p>Image:</p>		
						<img src={shoe}/>	
					</div>
					<IoIosClose className='close'onClick={()=>handleInsertCheck(false)}/>

			</div>}

			{/* list for search results */}
			{searchCheck && <div className='search-container'>

				{productList.map((product,index) => (
					<div className='searchItem'key={index}>

						{/* show ability to delete item from list when delete button is clicked */}
						{deleteCheck &&<button 
							className={`deleteButton ${deleteState[index] ? 'clicked' : ''}`}	
							onClick={() => handleDelete(index)}>
						</button>}

						<h2 style={{padding: "1rem"}}>search results</h2>

						<p>Name: <input value={product.name} readOnly={true} /></p>
						<p>Id: <input value={product.id} readOnly={true} /></p>
						<p>Brand: <input value={product.manufacturer} readOnly={true} /></p>
						<p>Price: <input value={product.price} readOnly={true} /></p>
						<div className='searchImage'>
							<p>Image:</p>
							<img src={shoe} alt={product.name} />
						</div>
					</div>
				))}
				<IoIosClose className='close'onClick={()=>handleSearchCheck(false)}/>
			</div>}

		</div>

	);	
}

export default App;
