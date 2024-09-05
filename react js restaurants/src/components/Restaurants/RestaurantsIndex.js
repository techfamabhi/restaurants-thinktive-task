import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function RestaurantsIndex() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of records per page
    const [showData, setShowData] = useState([]);
    const [categoryShowData, setCategoryShowData] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    // Fetch restaurant data from the API
    const fetchData = async (category = '') => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/restaurants', {
                params: { category_name: category }, // Send category as a query parameter
            });
            setShowData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch restaurants');
        }
    };

    useEffect(() => {
        fetchData(); // Fetch all restaurants on initial load
        fetchCategoryData(); // Fetch categories for the dropdown
    }, []);

    // Fetch category data
    const fetchCategoryData = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/categories');
            setCategoryShowData(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategoryName(selectedCategory);
        fetchData(selectedCategory); // Fetch restaurants based on selected category
    };

    // Delete restaurant
    const deleteData = async (id) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/restaurants/${id}`);
                if (res.status === 204) {
                    setShowData((prevData) => prevData.filter((restaurant) => restaurant.id !== id));
                    toast.success('Restaurant deleted successfully!');
                } else {
                    toast.error('Failed to delete restaurant');
                }
            } catch (error) {
                console.error('Error deleting restaurant:', error);
                toast.error('An error occurred while deleting the restaurant');
            }
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage; // Calculate last item index
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Calculate first item index
    const currentItems = showData.slice(indexOfFirstItem, indexOfLastItem); // Get current items for the page

    const paginate = (pageNumber) => setCurrentPage(pageNumber); // Set current page

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <div className="w-100 vh-100 position-fixed overlay d-none" id="sidebar-overlay" />
                    <div className="col-md-9 col-lg-10 ml-md-auto px-0">
                        <TopNav />
                        <div className="row d-flex justify-content-between align-items-center button-left-right">
                            <h2 className="heading1"><span className='color1'>Restaurants</span> Dashboard</h2>
                            <b><Link to="/add-restaurants" className="btn button-color">Add Restaurants</Link></b>
                        </div>

                        <div className="mb-3 col-md-4 ml-5">
                            <label className="form-label" htmlFor="category_name">Category Filter</label>
                            <select
                                className='form-control'
                                name="category_name"
                                id="category_name"
                                onChange={handleCategoryChange}
                                value={categoryName}
                            >
                                <option value="">Select a category</option>
                                {categoryShowData.map((row) => (
                                    <option key={row.id} value={row.name}>
                                        {row.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <main className="container">
                            <section className="row mt-4">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category Name</th>
                                            <th>Description</th>
                                            <th>Location</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Website</th>
                                            <th>Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.name}</td>
                                                <td>{row.category_name}</td>
                                                <td>{row.description}</td>
                                                <td>{row.location}</td>
                                                <td>{row.phone}</td>
                                                <td>{row.email}</td>
                                                <td>{row.website}</td>
                                                <td>
                                                    <Link className='btn btn-primary btn-sm mx-1 my-1' to={`/restaurants-edit/${row.id}`}>Edit</Link>
                                                    <button className='btn btn-danger btn-sm mx-1 my-1' onClick={() => deleteData(row.id)}>
                                                        <i className="bx bx-trash me-1"></i> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                            <div className="row mt-4">
                                <div className="col-sm-6">
                                    <b>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, showData.length)} of {showData.length} entries</b>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="pagination justify-content-end">
                                        {Array(Math.ceil(showData.length / itemsPerPage)).fill().map((_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantsIndex;