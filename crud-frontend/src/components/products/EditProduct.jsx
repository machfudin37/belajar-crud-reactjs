import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = response.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        name,
        description,
        price: parseFloat(price),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1 className='mb-4'>Edit Product</h1>
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
          Update
        </button>
        <button type='button' className='btn btn-secondary ms-2' onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
