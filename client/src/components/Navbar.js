import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        
        <nav className="nav-extended blue">
            <div className="nav-wrapper black">
                
            <Link to="/" className="brand-logo center">HOW TO COOK?</Link>
            </div>
            <div className="nav-content ">
                <ul className="tabs tabs-transparent">
                    <li className="tab btn"><Link to='/'>Home</Link></li>
                    <li className="tab btn" ><Link to='/fav'>Favourite</Link></li>
                    <li className="tab btn"><Link to='/documentation'>Documentation</Link></li>
            </ul>
            </div>
        
    </nav>
    )
}

export default Navbar
