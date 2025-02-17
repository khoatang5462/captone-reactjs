import React from 'react'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

export const UserTemplate = (props) => {
  const { children } = props
  return (
    <div>
      <Header/>
          {children}
        <Outlet/>
        <Footer/>

    </div>
  )
}
