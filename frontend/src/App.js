import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3001/items");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addItem = async () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/add", { name, description });
      setName("");
      setDescription("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      {/* New Header for Testing */}
      <h1 className="text-success">Hello, welcome to the CRUD Application!</h1>

      {/* Card Section */}
      <div className="card p-4 shadow-sm text-center" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-primary">CRUD Application</h2>

        {/* Input Fields */}
        <input 
          type="text" 
          className="form-control my-2" 
          placeholder="Enter Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          className="form-control my-2" 
          placeholder="Enter Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />

        {/* Add Item Button */}
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-primary mt-2"
            style={{ width: "120px", maxWidth: "100%" }} 
            onClick={addItem}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Items List Section */}
      <div className="mt-4 text-center" style={{ maxWidth: "450px", width: "100%" }}>
        <h4 className="text-muted">Items List</h4>
        <ul className="list-group">
          {data.length > 0 ? (
            data.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name} - {item.description}</span>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p className="text-muted">No items available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
