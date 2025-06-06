import React from 'react'
import { words } from '../constants'
import Button from '../components/Button'
import HeroExperience from '../components/HeroModels/HeroExperience'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedCounter from '../components/AnimatedCounter'

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo('.hero-text h1',
      {
        y: 50,
        opacity: 0,     
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.4,
        duration: 2,
        ease: 'power2.inOut',
      }
    )
  })

  return (
    <section id="hero" className="relative overflow-hidden">
     <div className="absolute top-0 left-0 z-10">
      <img src="/images/bg.png" alt="background" />
     </div>
     <div className="hero-layout">
      {/*Left: Hero Content */}
      <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
       <div className="flex flex-col gap-7">
       <p className='text-white-50 md:text-3xl text-[20px] relative z-10 pointer-events-none'>
       Hi, I'm Vedant Dhavan, a 👨‍💻 Software Developer from India.</p>
        <div className='hero-text'>
         <h1>Shaping 
          <span className='slide'>
           <span className='wrapper'>
            {words.map((word) => (
             <span key={word.index} className='flex items-center md:gap-3 gap-1 pb-2'>
              <img src={word.imgPath} alt={word.text} className='xl:size-12 md:size-10 size-7 md:p-2 p-1
              rounded-full bg-white-50'/>
              <span>{word.text}</span>
             </span>
            ))}
           </span>
          </span>
         </h1>
         <h1>into Real World Projects</h1>
         <h1>that Solve Problems</h1>
        </div>
        <Button className="md:w-80 md:h-16 w-60 h-12" id="button" text="See My Work"/>
       </div>
      </header>
      {/*Right: 3D Model */}
      <figure className='cursor-pointer'>
        <div className='hero-3d-layout'>
         <HeroExperience />
        </div>
      </figure>
     </div>
     <AnimatedCounter />
    </section>
  )
}

export default Hero