import React from 'react'
import './succesBuy.css'
import { Link } from 'react-router-dom'

const index = () => {
    return (
        <div>
            <h1>successful purchase! Thanks a lot!</h1>
            <Link to='/store'>
                <button>Back to store</button>
            </Link>
        </div>
    )
}

export default index
