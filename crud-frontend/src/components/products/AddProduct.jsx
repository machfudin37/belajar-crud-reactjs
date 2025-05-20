import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        name,
        description,
        price: parseFloat(price),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1 className='mb-4'>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Price</label>
          <input type='number' step='0.01' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <button type='button' className='btn btn-secondary ms-2' onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
