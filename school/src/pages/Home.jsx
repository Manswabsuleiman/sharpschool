import React from 'react'
import Homepage from '../Components/Homepage'
import Layout from '../Components/Layout'
import Info from '../Components/Info'
import FacilitiesInfo from '../Components/Facilities'
import Gallery from '../Components/Gallery'
import Instructors from '../Components/Instructors'
import Results from '../Components/Results'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import AI from '../Components/AI'

const Home = () => {
  return (
    <div>
      <Homepage/>
      <Layout/>
      <Info/>
      <FacilitiesInfo/>
      <Gallery/>
      <Instructors/>
      <Results/>
      <Banner/>
      <Footer/>
      <AI/>
      
   </div>
  )
}

export default Home