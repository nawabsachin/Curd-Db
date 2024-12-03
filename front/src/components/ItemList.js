import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ItemList = () => {
const [items, setItems] = useState([]);
const [editingItem, setEditingItem] = useState(null);
const [newName, setNewName] = useState('');
const [newDescription, setNewDescription] = useState('');
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
const deleteItem = (id) => {
axios.delete(`http://localhost:5000/items/${id}`)
.then(response => {
fetchItems();
})
.catch(error => {
console.log(error);
});
};
const editItem = (item) => {
setEditingItem(item);
setNewName(item.name);
setNewDescription(item.description);
};
const updateItem = (id) => {
axios.put(`http://localhost:5000/items/update/${id}`, {
name: newName,
description: newDescription
}).then(response => {
fetchItems();
setEditingItem(null);
}).catch(error => {
console.log(error);
});
};
return (
<div>
<h3>Items List</h3>
<ul>
{items.map(item => (
<li key={item._id}>
{editingItem && editingItem._id ===
item._id ? (
<div>
<input
type="text"
value={newName}
onChange={(e) =>
setNewName(e.target.value)}
/>
<input
type="text"
value={newDescription}
onChange={(e) =>
setNewDescription(e.target.value)}
/>
<button className="edit"
onClick={() => updateItem(item._id)}>Update</button>
<button onClick={() =>
setEditingItem(null)}>Cancel</button>
</div>
) : (
<div>
{item.name}: {item.description}
<button className="delete"
onClick={() => deleteItem(item._id)}>Delete</button>
<button className="edit"
onClick={() => editItem(item)}>Edit</button>
</div>
)}
</li>
))}
</ul>
</div>
);
};
export default ItemList;