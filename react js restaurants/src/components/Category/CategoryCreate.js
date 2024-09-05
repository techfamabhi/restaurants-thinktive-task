import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import { Link } from 'react-router-dom';

function CategoryCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        }
    }

    // Validate form inputs
    function validateForm() {
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const data = { name, description }; // Prepare data for submission
            try {
                const resp = await axios.post('http://127.0.0.1:8000/api/categories', data);
                if (resp.status === 201) {
                    console.log('Data Added');
                    toast.success('Category added successfully!');
                    // Reset form fields
                    setName('');
                    setDescription('');
                    // Redirect to the category index page after a short delay
                    setTimeout(() => {
                        navigate('/category');
                    }, 2000); // 2 seconds delay
                } else {
                    toast.error('Error occurred while adding category');
                }
            } catch (error) {
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
    }

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
                            <h2 className="heading1"><span className='color1'>Category</span>Add</h2>
                        </div>

            <form onSubmit={handleSubmit} className='mx-5 col-md-6'>
                <div className="mb-3 ">
                    <label className="form-label" htmlFor="name">Name</label>
                    <div className="input-group input-group-merge">
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            onChange={handleChange}
                            value={name}
                            id="name"
                        />
                        {formErrors.name && (
                            <div className="invalid-feedback">{formErrors.name}</div>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <div className="input-group input-group-merge">
                        <input
                            type="text"
                            name="description"
                            className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                            onChange={handleChange}
                            value={description}
                            id="description"
                        />
                        {formErrors.description && (
                            <div className="invalid-feedback">{formErrors.description}</div>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Send</button>
            </form>
            

            </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CategoryCreate;