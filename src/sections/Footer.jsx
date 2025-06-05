import React from 'react'
import { socialImgs } from '../constants'

const Footer = () => {
  return (
    <footer className='footer'>
     <div className='footer-container'>
      <div className='flex flex-col justify-center items-center md:items-start'>
       <a href="https://github.com/VEDANTDHAVAN/vedantdhavanresume">visit repo</a>
      </div>
      <div className='socials'>
       {socialImgs.map((img) => (
        <a href={img.url} target='_blank' key={img.url}>
         <img src={img.imgPath} alt={img.name} />
        </a>
       ))}
      </div>
      <div className='flex flex-col justify-center'>
       <p className='text-center md:text-end'>
        * {new Date().getFullYear()} Vedant Atul Dhavan. All Rights Reserved.
       </p>
      </div>
     </div>
    </footer>
  )
}

export default Footer