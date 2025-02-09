import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'  

const GenerateBtn = () => {

   const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => { 
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
      
  }
  return (
    <motion.div className='pb-16 text-center'
      initial={{opacity: 0.2, y: 100}}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
          <h1 className='text-2xl md:text lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic, try now!</h1>
          <button onClick={onClickHandler} className='inline-flex items-center gap-2 px-12 py-3 bg-stone-900 text-white rounded-full m-auto  hover:scale-105 transition-all duration-500 '>
              Generate Images  
              <img src={assets.star_group} className='h-6' />
          </button>
    </motion.div>
  )
}

export default GenerateBtn
