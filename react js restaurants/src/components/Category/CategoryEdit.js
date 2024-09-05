import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate hooks
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import { Link } from 'react-router-dom';

function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Fetch category data
    useEffect(() => {
        fetchCategoryData();
    }, []);

    // Validate form inputs
    function validateForm() {
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // Fetch category data from the API
    const fetchCategoryData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
            setName(res.data.name);
            setDescription(res.data.description);
        } catch (error) {
            console.error('Error fetching category data:', error);
            toast.error('Failed to fetch category data');
        }
    };

    // Update category
    const updateCategory = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                name,
                description,
            };
            try {
                // Use PUT method for updating the category
                const res = await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, formData);
                if (res.status === 200) {
                    toast.success('Category updated successfully!');
                     setTimeout(() => {
                        navigate('/category');
                    }, 2000); 
                } else {
                    toast.error('Error occurred while updating category');
                }
            }catch (error) {
                console.error('Error adding category:', error);
                // Check if the error response has a message
                if (error.response && error.response.data && error.response.data.errors) {
                    // Extract the error messages from the response
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    // Show the first error message in the toast
                    toast.error(errorMessages[0] || 'An error occurred while adding the category');
                } else {
                    toast.error('An error occurred while adding the category');
                }
            }
        }
    };

    return (
        <React.Fragment>
            <ToastContainer />


            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" />
                    <div className="col-md-9 col-lg-10 ml-md-auto px-0">
                        <TopNav />
                        <div className="row d-flex justify-content-between align-items-center button-left-right">
                            <h2 className="heading1"><span className='color1'>Edit</span>Category</h2>
                        </div>
                            <div class="container">
                                
                           
           
                                       <form onSubmit={updateCategory}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="Category Name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                    {formErrors.name && (
                                        <div className="invalid-feedback">{formErrors.name}</div>
                                    )}
                                </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Category Description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                            </div>

                            <button type="submit" className="btn btn-info">Update</button>
                        </form>
                        </div>
          
                        </div>
                </div>
            </div>
   
        </React.Fragment>
    );
}

export default CategoryEdit;