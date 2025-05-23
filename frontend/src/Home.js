import React from 'react'
import Navbar from './components/Dashboard/Navbar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';
import Songs from './Songs';
import SongList from './SongList';
function Home() {
  return (
    <div>
       <Navbar/>
      <Banner/>
      <RowPost/>
      <SongList/>
    </div>
  )
}

export default Home
