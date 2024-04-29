import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic form validation
        if (!values.name.trim() || !values.email.trim() || !values.phone.trim()) {
            setError('All fields are required');
            return;
        }

        axios.post('http://localhost:3000/users', values)
            .then(res => {
                console.log(res);
                // Additional logic if needed
                navigate('/');
            })
            .catch(err => {
                // Handle error, e.g., display an error message
                console.log(err);
                setError('Failed to add user');
            });
    }

    return (
        <div className='w-75 rounded bg-white border shadow p-4'>
            <h1>Add a User</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='name'>Name:</label>
                    <input type="text" name='name' className='form-control' placeholder='Enter Name' onChange={e => setValues({ ...values, name: e.target.value })}></input>
                </div>
                <div className='mb-2'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' className='form-control' placeholder='Enter email' onChange={e => setValues({ ...values, email: e.target.value })}></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>Phone:</label>
                    <input type='text' name='phone' className='form-control' placeholder='Enter your phone' onChange={e => setValues({ ...values, phone: e.target.value })}></input>
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>
    );
}

export default Create;
