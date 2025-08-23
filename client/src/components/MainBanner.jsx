import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative h-[60vh] md:h-auto overflow-hidden'>
      {/* Background Images */}
      <img 
        src={ assets.main_banner_bg } 
        alt="banner" 
        className='w-full hidden md:block object-cover object-center h-full'
      />
      <img 
        src={ assets.main_banner_bg_sm } 
        alt="banner" 
        className='w-full md:hidden object-cover object-top h-full'
      />

      {/* Banner Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start 
        justify-center md:justify-center 
        px-4 md:pl-18 lg:pl-24 pb-6'>
        
        {/* Heading */}
        <h1 className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold 
          text-center md:text-left 
          max-w-[85%] sm:max-w-72 md:max-w-80 lg:max-w-105 
          leading-snug md:leading-tight lg:leading-[3.5rem] mx-auto md:mx-0 mt-6'> {/* 👈 Added mt-6 */}
          Freshness You Can Trust, 
          <br className="sm:hidden"/> 
          Savings You will Love!
        </h1>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-5 font-medium'>
          <Link 
            to={"/products"} 
            className='group flex items-center justify-center gap-2 px-7 py-2.5 
            bg-primary hover:bg-primary-dull transition rounded-lg text-white cursor-pointer 
            text-sm sm:text-base'
          >
            Shop now
            <img className='sm:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
          </Link>

          <Link 
            to={"/products"} 
            className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer 
            text-sm sm:text-base'
          >
            Explore deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
