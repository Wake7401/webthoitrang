import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'

function Layout({ children }) {
    return (
        <div style={{backgroundColor:"#ccc"}}>
            <div className='container' style={{backgroundColor:"#fff"}}>
                <NavBar />
                <Notify />
                <Modal />
                {children}
            </div>
        </div>
    )
}

export default Layout