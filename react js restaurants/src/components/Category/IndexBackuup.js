import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function CategoryIndex() {
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
                    setShowData(showData.filter((category) => category.id !== id)); // Update state
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

    return (
        <React.Fragment>
            <ToastContainer />
            <div className="card">
                <div className="d-flex justify-content-end mt-5 mx-5">
                    <Link to='/add-category'>
                        <button type="button" className="btn btn-primary">ADD</button>
                    </Link>
                </div>
                <h5 className="card-header">Category Table</h5>
                <div className="card-body">
                    <div className="table-responsive text-nowrap">
                        <table className="table table-bordered" style={{ marginBottom: "100px" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td>
                                            <Link className='btn btn-primary' to={`/cateringEdit/${row.id}`}>Edit</Link>
                                            <button className='btn btn-danger' onClick={() => deleteData(row.id)}>
                                                <i className="bx bx-trash me-1"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CategoryIndex;