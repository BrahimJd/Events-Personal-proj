import React from 'react'
import './View.css'


function View() {
    return (
        <div className='view'>
            <div className='view1'>
                <img className='viewimg' src={'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'} />
                <h2>name full name</h2>
            </div>
            <div className='view-detaille'>
                <h3>Phone Number : 9876543210 </h3>
                <h3>Email : john@example.com</h3>
                <h3>Role: Admin </h3>
                <h4 className='activee'>Active </h4>

            </div>


        </div>
    )
}

export default View