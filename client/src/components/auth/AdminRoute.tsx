import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
    const [cookies] = useCookies(['user'])
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies || !cookies.user || !cookies.user.isAdmin) {
            navigate('/')
        }
    }, [cookies, cookies.user])

    if (cookies && cookies.user && cookies.user.isAdmin) {
        return <>{children}</>
    }
    return null;
}

export default IsAdmin