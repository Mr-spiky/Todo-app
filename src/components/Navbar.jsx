import React from 'react'

const Navbar = () => {
  
  return (
    <nav className='bg-violet-900 m-auto flex justify-between items-center  text-white py2
    shadow-lg'>
        <div className='text-xl font-bold mx-8'>
          iTodo
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
