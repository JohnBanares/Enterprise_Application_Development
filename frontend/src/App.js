import Home from './pages/Home'
import About from './pages/About'

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

	return (     
		<div> 
			<BrowserRouter>
			<div className='pages'>
			<Routes>
				<Route path="/about" element={<About />} />
				<Route path="/" element={<Home />} />

			</Routes>
			</div>
			</BrowserRouter>
	  </div>
	);	
}

export default App;
