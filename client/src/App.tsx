import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login'
import Register from './pages/Register'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from './components/ui/sonner'
import HouseConfirmation from './components/HouseConfirmation'
import CommonLayout from './layout/CommonLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Rental from './pages/Rental'
import IsAdmin from './components/auth/AdminRoute'
import RentHouseDetail from './components/RentHouseDetail'
import CreateHouseForm from './components/CreateHouseForm'

const App = () => {
  return (
    <AuthProvider>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Routes>
          <Route path='/' index element={<CommonLayout><Home /></CommonLayout>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/house/:id'
            element={
              <ProtectedRoute>
                <CommonLayout>
                  <HouseConfirmation />
                </CommonLayout>
              </ProtectedRoute>
            }
          />
          <Route path='/booked'
            element={
              <IsAdmin>
                <CommonLayout>
                  <Rental />
                </CommonLayout>
              </IsAdmin>
            }
          />
          <Route path='/booked/:id'
            element={
              <IsAdmin>
                <CommonLayout>
                  <RentHouseDetail />
                </CommonLayout>
              </IsAdmin>
            }
          />
          <Route path='/create-house/'
            element={
              <IsAdmin>
                <CommonLayout>
                  <CreateHouseForm />
                </CommonLayout>
              </IsAdmin>
            }
          />
        </Routes>
        <Toaster />
      </CookiesProvider>
    </AuthProvider>
  )
}

export default App