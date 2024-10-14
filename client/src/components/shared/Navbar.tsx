import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthProvider'

const Navbar = () => {
    const { user, logOutUser } = useAuth()

    return (
        <nav className='border-b h-20 flex items-center justify-between w-full px-4'>
            <Link to={'/'} className='text-blue-950 font-bold text-2xl'>DreamHouse.com</Link>
            <div className='inline-flex gap-2 items-center'>
                {/* <p className='capitalize'>{user?.name}</p> */}

                {
                    !user ? <div>
                        <Button variant={'link'} className='text-base'><Link to={'/login'}>Login</Link>
                        </Button>

                        <Button variant={'link'} className='text-base'>
                            <Link to={'/register'} className='text-base'>Register</Link>
                        </Button>
                    </div>
                        :
                        <div className='flex items-center gap-4'>
                            {user.role === 'admin' && <div className='flex items-center gap-4'>
                                <Link to={'/create-house'}><Button>create house</Button></Link>
                                <Link to={'/booked'}><Button>Booking houses</Button></Link>
                            </div>
                            }
                            <Button variant={'destructive'} className='text-base' onClick={logOutUser}>Logout</Button></div>
                }
            </div>
        </nav>
    )
}

export default Navbar