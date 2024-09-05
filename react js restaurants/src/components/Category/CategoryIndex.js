import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import TopNav from '../TopNav';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function CategoryIndex() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Number of records per page
    const [showData, setShowData] = useState([]);

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/categories/');
            setShowData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Delete category
    const deleteData = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const res = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
                if (res.status === 204) {
                    // Update state to remove the deleted category
                    setShowData((prevData) => prevData.filter((category) => category.id !== id));
                    toast.success('Category deleted successfully!');
                } else {
                    toast.error('Failed to delete category');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error('An error occurred while deleting the category');
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
                            <h2 className="heading1"><span className='color1'>Category</span> Dashboard</h2>
                            <b><Link to="/add-category" className="btn button-color">Add Category</Link></b>
                        </div>




                        <main className="container">
                            <section className="row mt-4">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((row) => ( // Use currentItems for pagination
                                            <tr key={row.id}>
                                                <td>{row.name}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <Link className='btn btn-primary btn-sm mx-1' to={`/category-edit/${row.id}`}>Edit</Link>
                                                    <button className='btn btn-danger btn-sm mx-1' onClick={() => deleteData(row.id)}>
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

export default CategoryIndex;