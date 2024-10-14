import React from 'react'
import Navbar from '../components/shared/Navbar'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default CommonLayout