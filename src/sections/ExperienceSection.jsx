import React from 'react'
import TitleHeader from '../components/TitleHeader'
import { Experience } from '../constants'
import GlowCard from '../components/GlowCard'

const ExperienceSection = () => {
  return (
    <section id='experience' className='flex-center section-padding'>
     <div className='w-full h-full md:px-10 px-5'>
     <TitleHeader title="🤝 My Work Experience" sub="🧰 Companies I have worked with." />
      <div className='lg:columns-3 md:columns-2 columns-1 mt-16'>
       {Experience.map((experience) => (
        <GlowCard card={experience}>
         <p className='text-white-50 font-extrabold gap-5'>{experience.companyName} | role: {experience.position} <br /> {experience.mentions}</p>
         <div className='flex items-center gap-3'>
          <div>
           <p className='text-white-50'><b>type:</b> {experience.type}</p>
           <p className='text-white-50'><b>duration:</b> {experience.duration}</p>
           <p className='text-white-50'><b>date:</b> <br />{experience.date}</p>
          </div>   
          <div>
            <p className='text-white-50'>Review:</p>
            <p className='font-bold'>{experience.review}</p>
          </div>
          <div></div>
         </div>   
        </GlowCard>
       ))}
      </div>
     </div>
    </section>
  )
}

export default ExperienceSection