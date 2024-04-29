import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <h1> List of Users</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'><Link to="/create" className='btn btn-success'> ADD +</Link></div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th> {/* Added column for actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>
                                        <div className='btn-group'>
                                            <Link to={'/read/${d.id}'} className='btn btn-sm btn-info me-2'>Read</Link>
                                            <button className='btn btn-sm btn-primary me-2'>Edit</button>
                                            <button className='btn btn-sm btn-danger'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
