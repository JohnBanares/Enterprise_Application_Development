import './css/App.css';
import shoe from './image/shoe.png';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";



function App() {

	const [insertCheck, setInsertCheck] = useState('');
	const [searchCheck, setSearchCheck] = useState('');
	const [deleteCheck, setDeleteCheck] = useState('');
	const [updateCheck, setUpdateCheck] = useState('');


	const [productList, setProductList] = useState([]);
	const [searchVal, setSearchVal] = useState('');

	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [brand, setBrand] = useState('');
	const [price, setPrice] = useState('');

	const [deleteState, setDeleteState] = useState([]);
	const [deleteList, setDeleteList] = useState([]);

	const [editState, setEditState] = useState([]);
	const [currentlyEditing, setcurrentlyEditing] = useState(false);

	const inputRefsName = useRef([]);
	const inputRefsId = useRef([]);
	const inputRefsManufact = useRef([]);
	const inputRefsPrice = useRef([]);

	//store copy of values
	const [inputNameValues, setInputNameValues] = useState([]);
    const [inputIdValues, setInputIdValues] = useState([]);
    const [inputManufaValues, setInputManufaValues] = useState([]);
    const [inputPriceValues, setInputPriceValues] = useState([]);

	//readonly states
	const [readOnlyStateName, setReadOnlyStateName] = useState([]);
    const [readOnlyStateId, setReadOnlyStateId] = useState([]);
    const [readOnlyStateManu, setReadOnlyStateManu] = useState([]);
    const [readOnlyStatePrice, setReadOnlyStatePrice] = useState([]);






	useEffect(() =>{
		setDeleteState(Array(productList.length).fill(false));
		setEditState(Array(productList.length).fill(false));

		inputRefsName.current = Array(productList.length).fill(null);
        inputRefsId.current = Array(productList.length).fill(null);
        inputRefsManufact.current = Array(productList.length).fill(null);
		inputRefsPrice.current = Array(productList.length).fill(null);


		//used for editing store a copy of the value for each field in the input box
		setInputNameValues(productList.map(product => product.name));
        setInputIdValues(productList.map(product => product.id));
        setInputManufaValues(productList.map(product => product.manufacturer));
        setInputPriceValues(productList.map(product => product.price));

		//set readonly to true
		setReadOnlyStateName(Array(productList.length).fill(true));
        setReadOnlyStateId(Array(productList.length).fill(true));
        setReadOnlyStateManu(Array(productList.length).fill(true));
        setReadOnlyStatePrice(Array(productList.length).fill(true));




	}, [productList]);

// -------------------------------------- delete -------------------------------------------------------------
	//keep state of each container being deleted
	const handleDelete = (index, id) => {
        const newClickedState = [...deleteState];

		// set button to true
		if(newClickedState[index] === false){
			newClickedState[index] = true;
			setDeleteState(newClickedState);
			// console.log(newClickedState);

			//add id to a list to delete
			setDeleteList([...deleteList, id]);

			return;
		}
		//set button back to false
		if(newClickedState[index] === true){
			newClickedState[index] = false;
			setDeleteState(newClickedState);
			// console.log(newClickedState);

			//remove id from the list
			setDeleteList(deleteList.filter(itemId => itemId !== id));

			return;
		}
    };

	//handle to delete list of ids
	const handleDeleteSubmit = async() =>{
		console.log("deleting the list of id", deleteList);

		try {
			const response = await axios.delete('http://localhost:3003/api/products/delete-products', {data: {deleteList}});
			setDeleteList([]);
			window.location.reload();
			console.log('success');
			

		} catch (error) {
			console.error('Error inserting product:', error);
			setDeleteList([]);

		}

	}

	//show delete circles and confirm delete button
	const handleDeleteCheck = (condtion) => {
		setDeleteCheck(!condtion);
		setDeleteList([]);
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
		setDeleteCheck(false);
		setUpdateCheck(false);

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
// -------------------------------------- update -------------------------------------------------------------	
	const handleUpdateCheck = (condtion)=>{
		setUpdateCheck(condtion);
		setSearchCheck(false);
	} 

	const handleEdit = async(index, id) =>{
		const newEditState = [...editState];


		//when user clicks cancel edit
		if(newEditState[index] === true){
			newEditState[index] = false;
			setEditState(newEditState);

			const copy1 = inputNameValues[index];
			const copy2 =inputIdValues[index];
			const copy3 = inputManufaValues[index];
			const copy4 = inputPriceValues[index];
			try {
				const response = await axios.put('http://localhost:3003/api/products/update-products', {
					_id: id,
					name: copy1,
					id: copy2,
					manufacturer: copy3,
					price: copy4
				});
		
				console.log('success');
			} catch (error) {
				console.error('Error inserting product:', error);
			}

			//set name back to readonly
			const newEditStates = [...readOnlyStateName];
			newEditStates[index] = true;
			setReadOnlyStateName(newEditStates);

			//set id back to readonly
			const newEditStates2 = [...readOnlyStateId];
			newEditStates2[index] = true;
			setReadOnlyStateId(newEditStates);

			//set manufact back to readonly
			const newEditStates3 = [...readOnlyStateManu];
			newEditStates[index] = true;
			setReadOnlyStateManu(newEditStates);

			//set id back to readonly
			const newEditStates4 = [...readOnlyStatePrice];
			newEditStates2[index] = true;
			setReadOnlyStatePrice(newEditStates);


			// console.log("saving changes to database");
			// console.log(inputNameValues[index]);
			// console.log(inputIdValues[index]);
			// console.log(inputManufaValues[index]);
			// console.log(inputPriceValues[index]);
			// console.log(id);


			return;
		}
		//when user clicks edit
		if(newEditState[index] === false){
			setcurrentlyEditing(true);
			newEditState[index] = true;
			setEditState(newEditState);
			return;
		}

	}

	//focus typing in name input
	const handleEditName = (index) => {
        //allow user input
        const newEditStates = [...readOnlyStateName];
        newEditStates[index] = false;
        setReadOnlyStateName(newEditStates);

        if (!newEditStates[index]) {
            inputRefsName.current[index].focus();
        }
    };

	//focus typing in id input
	const handleEditId = (index) => {
        //allow user input
        const newEditStates = [...readOnlyStateId];
        newEditStates[index] = false;
        setReadOnlyStateId(newEditStates);

        if (!newEditStates[index]) {
            inputRefsId.current[index].focus();
        }
    };

	//focus typing in brand input
	const handleEditManufa = (index) => {
        //allow user input
        const newEditStates = [...readOnlyStateManu];
        newEditStates[index] = false;
        setReadOnlyStateManu(newEditStates);

        if (!newEditStates[index]) {
            inputRefsManufact.current[index].focus();
        }
    };

	//focus typing in price input
	const handleEditPrice = (index) => {
        //allow user input
        const newEditStates = [...readOnlyStatePrice];
        newEditStates[index] = false;
        setReadOnlyStatePrice(newEditStates);

        if (!newEditStates[index]) {
            inputRefsPrice.current[index].focus();
        }
    };

	 // keep tracking of input field rating
	 const handleChangeName = (index, value) => {
        const newInputValues = [...inputNameValues];
        newInputValues[index] = value;
        setInputNameValues(newInputValues);
    };

    // keep tracking of input field desc
    const handleChangeId = (index, value) => {
        const newInputDescValues = [...inputIdValues];
        newInputDescValues[index] = value;
        setInputIdValues(newInputDescValues);
    };
	 // keep tracking of input field rating
	 const handleChangeManufa = (index, value) => {
        const newInputValues = [...inputManufaValues];
        newInputValues[index] = value;
        setInputManufaValues(newInputValues);
    };

    // keep tracking of input field desc
    const handleChangePrice = (index, value) => {
        const newInputDescValues = [...inputPriceValues];
        newInputDescValues[index] = value;
        setInputManufaValues(newInputDescValues);
    };


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
				<button onClick={()=> handleDeleteCheck(deleteCheck)}>
					{deleteCheck ? 'Cancel': 'Delete'}
				</button>
				<button  onClick={()=> handleUpdateCheck(true)}>Update</button>
			</div>

			{/* display delete confirm button and keep count */}
			<div> 
				{deleteCheck &&<button className='selectDelete' onClick={() => handleDeleteSubmit()}>Delete Selected products ({deleteList.length})</button>}
			</div>
		
			{/* ---------------------------------------------show insert container if insert button is clicked ---------------------------------------------*/}
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

			{/* ---------------------------------------------list for search results ---------------------------------------------*/}
			{searchCheck && <div className='search-container'>

				{productList.map((product,index) => (
					<div className='searchItem'key={index}>

						{/* show ability to delete item from list when delete button is clicked */}
						{deleteCheck &&<button 
							className={`deleteButton ${deleteState[index] ? 'clicked' : ''}`}	
							onClick={() => handleDelete(index, product.id)}>
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

			{/* --------------------------------------------- update --------------------------------------------- */}
			{updateCheck && <div className='search-container'>

				{productList.map((product,index) => (
					<div className='searchItem'key={index}>
						<h2 style={{padding: "1rem"}}>Update</h2>

						{/* toggle edit button to cancel or edit */}
						<button className={`editButton ${editState[index] ? 'clicked' : ''}`} onClick={()=>handleEdit(index)}> 
							{editState[index] ? 'Cancel': 'Edit'}
						</button>

						{/* only show edit icone when edit button is pressed */}
						<p>
							Name:
							<input 
								type='text'
								value={inputNameValues[index]} 
								readOnly={readOnlyStateName[index]} 
								ref={(inputElement) => (inputRefsName.current[index] = inputElement)} 
								onChange={(event) => handleChangeName(index, event.target.value)}					
							/> 

							{editState[index] &&
								<CiEdit 
								className='edit-icon'
								onClick={() => handleEditName(index)}
							/>}
						</p>
						<p>
							Id: 
							<input 
								type='text'
								value={inputIdValues[index]} 
								readOnly={readOnlyStateId[index]} 
								ref={(inputElement) => (inputRefsId.current[index] = inputElement)} 
								onChange={(event) => handleChangeId(index, event.target.value)}						
							/>
							{editState[index] &&
								<CiEdit 
								className='edit-icon'
								onClick={() => handleEditId(index)}
								/>}
						</p>
						<p>
							Brand:
							<input 
								type='text'
								value={inputManufaValues[index]} 
								readOnly={readOnlyStateManu[index]}
								ref={(inputElement) => (inputRefsManufact.current[index] = inputElement)} 
								onChange={(event) => handleChangeManufa(index, event.target.value)}						
							/>
							{editState[index] &&
								<CiEdit 
								className='edit-icon'
								onClick={() => handleEditManufa(index)}
								/>}
						</p>
						<p>
							Price: 
							<input 
								type='text'
								value={inputPriceValues[index]} 
								readOnly={readOnlyStatePrice[index]}
								ref={(inputElement) => (inputRefsPrice.current[index] = inputElement)}
								onChange={(event) => handleChangePrice(index, event.target.value)}					
							/>
							{editState[index] &&
								<CiEdit 
								className='edit-icon'
								onClick={() => handleEditPrice(index)}
								/>}
						</p>

						<div className='searchImage'>
							<p>Image:</p>
							<img src={shoe} alt={product.name} />
						</div>

						{/* show save button when editiing */}
						{editState[index] &&
							<button 
								className="editButton" 
								onClick={()=>handleEdit(index, product._id)}
							> 
							Save
							</button>
						}
					</div>
				))}
				<IoIosClose className='close'onClick={()=>handleUpdateCheck(false)}/>
			</div>}

		</div>

	);	
}

export default App;
