import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'admin' | 'user' }) => {
    const [cookies] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies || !cookies.user) {
            navigate('/login')
        }
    }, [cookies, cookies.user])

    if (cookies && cookies.user) {
        return <>{children}</>
    }
    return null;
}

export default ProtectedRoute