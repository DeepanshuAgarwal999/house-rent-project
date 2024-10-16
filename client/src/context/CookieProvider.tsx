import React from 'react'

const CookieProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookieProvider>{children}</CookieProvider>
    )
}

export default CookieProvider