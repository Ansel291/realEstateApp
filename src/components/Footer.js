import React from 'react'

const Footer = () => {
  const thisYear = new Date().getFullYear()
  //console.log(thisYear)

  return (
    <footer className='bg-black py-8 text-center text-white'>
      <div className='container mx-auto'>
        Copyright {thisYear}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
