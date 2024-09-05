import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate hooks
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import { Link } from 'react-router-dom';

function RestaurantsEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category_name, setCategory_name] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [Showdata, setShowdata] = useState([]);

    // Fetch restaurant data
    useEffect(() => {
        fetchRestaurantData();
    }, []);

    // Fetch restaurant data from the API
    const fetchRestaurantData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`);
            setName(res.data.name);
            setCategory_name(res.data.category_name); // Ensure category_name is set
            setDescription(res.data.description);
            setLocation(res.data.location);
            setPhone(res.data.phone);
            setEmail(res.data.email);
            setWebsite(res.data.website);
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            toast.error('Failed to fetch restaurant data');
        }
    };

    // Validate form inputs
    function validateForm() {
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!category_name) {
            errors.category_name = 'Category name is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }
        if (!location) {
            errors.location = 'Location is required';
        }
        if (!phone) {
            errors.phone = 'Phone is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!website) {
            errors.website = 'Website is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // Update restaurant
    const updateRestaurant = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                name,
                category_name,
                description,
                location,
                phone,
                email,
                website,
            }; // Prepare data for submission
            try {
                // Use PUT method for updating the restaurant
                const res = await axios.put(`http://127.0.0.1:8000/api/restaurants/${id}`, formData);
                if (res.status === 200) {
                    toast.success('Restaurant updated successfully!');
                    setTimeout(() => {
                        navigate('/restaurants');
                    }, 2000); // 2 seconds delay
                } else {
                    toast.error('Error occurred while updating restaurant');
                }
            } catch (error) {
                console.error('Error updating restaurant:', error);
                // Check if the error response has a message
                if (error.response && error.response.data && error.response.data.errors) {
                    // Extract the error messages from the response
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    // Show the first error message in the toast
                    toast.error(errorMessages[0] || 'An error occurred while updating the restaurant');
                } else {
                    toast.error('An error occurred while updating the restaurant');
                }
            }
        }
    };


    function fetchData() {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then((res) => {
                setShowdata(res.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                            <h2 className="heading1"><span className='color1'>Edit</span> Restaurant</h2>
                        </div>
                        <div className="container">
                            <form onSubmit={updateRestaurant}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="Restaurant Name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                    {formErrors.name && (
                                        <div className="invalid-feedback">{formErrors.name}</div>
                                    )}
                                </div>

                              
                            <div className="mb-3">
                                <label className="form-label" htmlFor="category_name">Category</label>
                                <select
                                    className={`form-control ${formErrors.category_name ? 'is-invalid' : ''}`}
                                    name="category_name"
                                    id="category_name"
                                    onChange={(e) => setCategory_name(e.target.value)}
                                    value={category_name}
                                >
                                    <option value="">Select a category</option>
                                    {Showdata.map((row) => (
                                        <option key={row.id} value={row.name}>
                                            {row.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.category_name && (
                                    <div className="invalid-feedback">{formErrors.category_name}</div>
                                )}
                            </div>


                                <div className="mb-3">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                                        id="description"
                                        placeholder="Restaurant Description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                    />
                                    {formErrors.description && (
                                        <div className="invalid-feedback">{formErrors.description}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        className={`form-control ${formErrors.location ? 'is-invalid' : ''}`}
                                        id="location"
                                        onChange={(e) => setLocation(e.target.value)}
                                        value={location}
                                    />
                                    {formErrors.location && (
                                        <div className="invalid-feedback">{formErrors.location}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                        id="phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={phone}
                                    />
                                    {formErrors.phone && (
                                        <div className="invalid-feedback">{formErrors.phone}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                    {formErrors.email && (
                                        <div className="invalid-feedback">{formErrors.email}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="website">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className={`form-control ${formErrors.website ? 'is-invalid' : ''}`}
                                        id="website"
                                        onChange={(e) => setWebsite(e.target.value)}
                                        value={website}
                                    />
                                    {formErrors.website && (
                                        <div className="invalid-feedback">{formErrors.website}</div>
                                    )}
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

export default RestaurantsEdit;