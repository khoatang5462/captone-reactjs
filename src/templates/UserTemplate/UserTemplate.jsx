import React from 'react'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

export const UserTemplate = () => {

  return (
    <div>
      <Header />
      <div className='bg-gray-100'>

        <Outlet />
      </div>
      <Footer />

    </div>
  )
}
