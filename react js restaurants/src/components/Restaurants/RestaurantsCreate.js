import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import { Link } from 'react-router-dom';

function RestaurantsCreate() {
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

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'category_name':
                setCategory_name(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'website':
                setWebsite(value);
                break;
            default:
                break;
        }
    }

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

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            const data = {
                name,
                category_name,
                description,
                location,
                phone,
                email,
                website,
            }; // Prepare data for submission
            try {
                const resp = await axios.post('http://127.0.0.1:8000/api/restaurants', data);
                if (resp.status === 201) {
                    console.log('Data Added');
                    toast.success('Restaurant added successfully!');
                    // Reset form fields
                    setName('');
                    setCategory_name('');
                    setDescription('');
                    setLocation('');
                    setPhone('');
                    setEmail('');
                    setWebsite('');
                    // Redirect to the restaurants index page after a short delay
                    setTimeout(() => {
                        navigate('/restaurants');
                    }, 2000); // 2 seconds delay
                } else {
                    toast.error('Error occurred while adding restaurant');
                }
            } catch (error) {
                console.error('Error adding restaurant:', error);
                // Check if the error response has a message
                if (error.response && error.response.data && error.response.data.errors) {
                    // Extract the error messages from the response
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    // Show the first error message in the toast
                    toast.error(errorMessages[0] || 'An error occurred while adding the restaurant');
                } else {
                    toast.error('An error occurred while adding the restaurant');
                }
            }
        }
    }


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
                            <h2 className="heading1"><span className='color1'>Restaurants</span> Add</h2>
                        </div>

                        <form onSubmit={handleSubmit} className='mx-5 col-md-6'>
                            <div className="mb-3">
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

                            <div className="mb-3">
                                <label className="form-label" htmlFor="location">Location</label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        name="location"
                                        className={`form-control ${formErrors.location ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        value={location}
                                        id="location"
                                    />
                                    {formErrors.location && (
                                        <div className="invalid-feedback">{formErrors.location}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="phone">Phone</label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        name="phone"
                                        className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        value={phone}
                                        id="phone"
                                    />
                                    {formErrors.phone && (
                                        <div className="invalid-feedback">{formErrors.phone}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        name="email"
                                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        value={email}
                                        id="email"
                                    />
                                    {formErrors.email && (
                                        <div className="invalid-feedback">{formErrors.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="website">Website</label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        name="website"
                                        className={`form-control ${formErrors.website ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        value={website}
                                        id="website"
                                    />
                                    {formErrors.website && (
                                        <div className="invalid-feedback">{formErrors.website}</div>
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

export default RestaurantsCreate;