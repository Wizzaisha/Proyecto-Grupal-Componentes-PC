import React from 'react'
import './succesBuy.css'
import { Link } from 'react-router-dom'

const index = () => {
    return (
        <div className="container-fluid">
            <div className='successContainer'>
                <h2>Successfull purchase! Thanks a lot!</h2>
                <Link to='/store'>
                    <button className='btn btn-success'>Back to store</button>
                </Link>
            </div>
        </div>
    )
}

export default index
