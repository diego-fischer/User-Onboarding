import './App.css';
import Form from './components/Form'
import {SavedUsers} from './components/SavedUsers'
import React, { useState } from 'react'



function App() {
	const [users, setUsers]= useState([])
  return (
    <React.Fragment>
			<Form users={users} setUsers={setUsers}/>
			<SavedUsers/>
		</React.Fragment>
  );
}

export default App;
