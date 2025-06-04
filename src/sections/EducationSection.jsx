import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { eduCards } from '../constants'
import GlowCard from '../components/GlowCard'

const EducationSection = () => {
  return (
    <section id='education' className='w-full md:mt-40 mt-20 section-padding xl:px-0'> 
     <div className='w-full h-full md:px-20 px-5'>
      <TitleHeader title="From Childhood till Now" sub="🧰 My Education" />
      <div className='mt-32 relative'>
       <div className='relative z-50 xl:space-y-32 space-y-10'>
        {eduCards.map((card) => (
         <div key={card.title} className='exp-card-wrapper'>
          <div className='xl:w-2/6'>
           <GlowCard card={card}>
            <div>
             <img src={card.imgPath} alt={card.title} /> 
            </div>
           </GlowCard>
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>
    </section>
  )
}

export default EducationSection