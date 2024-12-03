import React, { useState, useEffect } from 'react';
// import ItemList from './component/ItemList';
// import AddItem from './component/AddItem';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import axios from 'axios';
import './App.css';
const App = () => {
const [items, setItems] = useState([]);
useEffect(() => {
fetchItems();
}, []);
const fetchItems = () => {
axios.get('http://localhost:5000/items/')
.then(response => {
setItems(response.data);
})
.catch(error => {
console.log(error);
});
};
return (
<div className="container">
<h1>MERN Stack CRUD App</h1>
<AddItem fetchItems={fetchItems} />
<ItemList items={items} fetchItems={fetchItems} />
</div>
);
};
export default App;