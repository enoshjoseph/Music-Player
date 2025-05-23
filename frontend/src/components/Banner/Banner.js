import React, { useEffect } from 'react'
import './Banner.css';

function Banner() {
    useEffect(()=>{

    },[])

  return (
    <div className='banner'>
        <div className='content'>
            <h1 className='title'>Jai Ho</h1>
            <div className='banner_buttons'>
                <button className='button'> Play </button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type</h1>
        </div>
        <div className='fade'></div>
      
    </div>
  )
}

export default Banner
