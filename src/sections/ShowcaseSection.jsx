import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);
  const project5Ref = useRef(null);
  const project6Ref = useRef(null);

  useGSAP(() => {
    const projects = [
        project1Ref.current, project2Ref.current,
        project3Ref.current, project4Ref.current,
        project5Ref.current, project6Ref.current
      ];
    
    projects.forEach((card, index) => {
        gsap.fromTo(
          card, {
            y: 50, opacity: 0
          }, {
            y: 0, opacity: 1,
            duration: 1, delay: 0.3 * (index + 1),
            scrollTrigger: {
             trigger: card, start: 'top bottom-=100'
            }
          }
        )
      })
   gsap.fromTo(sectionRef.current, {opacity: 0}, {opacity: 1, duration: 1.5})  
  },[gsap]);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
     <div className='w-full'>
      <h2 className='hero-text'>Full Stack Projects</h2>
      <div className='showcaselayout'>
       {/* Left */}
       <div className='first-project-wrapper' ref={project1Ref}>
        <div className='image-wrapper'>
         <img 
           src="/images/project1.png" 
           alt="VedLab" 
           onClick={() => window.open('https://github.com/VEDANTDHAVAN/vedlab', '_blank')}
           style={{ cursor: 'pointer' }}
         />
        </div>
        <div className='text-content'>
         <h2>VedLab – Design smarter, together: a collaborative UI canvas powered by real-time magic.</h2>
         <p className='text-white-50 md:text-xl'>
          It is a a real-time collaborative canvas app inspired by Figma, built using the T3 Stack which includes- Next.js,TypeScript,Tailwind CSS,
          ESLint + Prettier + ShadCN, Fabric.js with Liveblocks for Real-time Collaboration. 
         </p>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/vedlab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <a 
            href="https://vedlab.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#00fcf8] hover:bg-[#0000FF] hover:text-white text-black rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Demo
          </a>
         </div>
        </div>
       </div>
       {/* Right */} 
       <div className='project-list-wrapper overflow-hidden'>
        <div className='project' ref={project2Ref}>
         <div className='image-wrapper bg-[#47e6ff]'>
          <img 
            src="/images/project2.png" 
            alt="Ecommerce Store" 
            onClick={() => window.open('https://github.com/VEDANTDHAVAN/ECOMMERCE_CLOTHING_STORE', '_blank')}
            style={{ cursor: 'pointer' }}
          />
         </div>
         <h2>Fabric Fusion - An E-Commerce Clothing Platform with 3D Shirt model to try different textures and Designs</h2>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/ECOMMERCE_CLOTHING_STORE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
         </div>
        </div>
        <div className='project' ref={project3Ref}>
         <div className='image-wrapper bg-[#fc46ff]'>
          <img 
            src="/images/project3.png" 
            alt="Therapy Booking Platform" 
            onClick={() => window.open('https://github.com/VEDANTDHAVAN/Therapy_Website', '_blank')}
            style={{ cursor: 'pointer' }}
          />
         </div>
         <h2>HealSpace - A Therapy Booking Platform to connect people with their nearby Therapist.</h2>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/Therapy_Website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
         </div>
        </div>
       </div>
      </div>
      <br /> <br />
      <h2 className='hero-text'>Generative AI Projects</h2>
      <div className='showcaselayout'>
       {/* Left */}
       <div className='first-project-wrapper' ref={project1Ref}>
        <div className='image-wrapper'>
         <img 
           src="/images/project7.png" 
           alt="Omnigen" 
           onClick={() => window.open('https://github.com/VEDANTDHAVAN/multimodelai-saas', '_blank')}
           style={{ cursor: 'pointer' }}
         />
        </div>
        <div className='text-content'>
         <h2>⚡️ AI SaaS Platform –For Chat, Image and Code generations using Generative AI </h2>
         <p className='text-white-50 md:text-xl'>
         A full-stack, production-ready AI SaaS platform offering a suite of generative AI tools including Text, Image and Code generation. Built with scalability, performance, and modern design in mind.
         Features include - <br /> ✍️ Text generation using advanced LLMs, 🎨 AI-powered Image generation, 💻 Code generation and formatting, 
         🧾 Razorpay-powered Subscription system, 🔐 Secure Auth with Clerk, 💬 Crisp Chat integration for real-time support, <br />
         ☁️ Cloud storage support (S3 or Cloudinary), 📦 Deployed and production-ready using Vercel. 
         </p>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/multimodelai-saas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <a 
            href="https://multimodelai-saas.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#00fcf8] hover:bg-[#0000FF] hover:text-white text-black rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Demo
          </a>
         </div>
        </div>
       </div>
       {/* Right */} 
       <div className='project-list-wrapper overflow-hidden'>
       </div>
      </div>
      <br /> <br />
      <h2 className='hero-text'>Machine Learning Projects</h2>
      <div className='showcaselayout'>
       {/* Left */}
       <div className='first-project-wrapper' ref={project4Ref}>
        <div className='image-wrapper'>
         <img 
           src="/images/project4.jpg" 
           alt="Consumer_Sentiment_Analysis" 
           onClick={() => window.open('https://github.com/VEDANTDHAVAN/Consumer_Sentiment_Analysis', '_blank')}
           style={{ cursor: 'pointer' }}
         />
        </div>
        <div className='text-content'>
         <h2>Consumer Sentiment Analysis of Amazon Product Reviews</h2>
         <p className='text-white-50 md:text-xl'>
         This project focuses on sentiment analysis using machine learning and natural language processing techniques.
         The goal was to develop a Streamlit app capable of analyzing sentiments in various scenarios, including single-line reviews, multiple reviews from CSV files, and product reviews from Amazon URLs. 
         <br /> Dataset Used: <br />
         The Amazon reviews full score dataset is constructed by randomly taking 6,00,000 training samples and 1,30,000 testing samples for each review score from 1 to 5. In total there are 30,00,000 training samples and 6,50,000 testing samples.
         </p>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/Consumer_Sentiment_Analysis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
         </div>
        </div>
       </div>
       {/* Right */} 
       <div className='project-list-wrapper overflow-hidden'>
        <div className='project' ref={project5Ref}>
         <div className='image-wrapper bg-[#8aff47]'>
          <img 
            src="/images/project5.png" 
            alt="Ecommerce Store" 
            onClick={() => window.open('https://github.com/VEDANTDHAVAN/RAG_CHATBOT', '_blank')}
            style={{ cursor: 'pointer' }}
          />
         </div>
         <h2>ContextAI - A RAG (Retrieval-Augmented Generation) Chatbot built with Next.js and AI SDK</h2>
         <p className='text-white-50 md:text-xl'>
            It is designed to analyze and respond to user queries, including product reviews with deep context awareness.
         </p>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/RAG_CHATBOT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
         </div>
        </div>
        <div className='project' ref={project6Ref}>
         <div className='image-wrapper bg-[#edff4f]'>
          <img 
            src="/images/project6.png" 
            alt="MCP Tool" 
            onClick={() => window.open('https://github.com/VEDANTDHAVAN/MCP_TOOLS', '_blank')}
            style={{ cursor: 'pointer' }}
          />
         </div>
         <h2>MCP (Model Context Protocol) Tools</h2>
         <p>It is a custom app using Model Context Protocol (MCP) and Gemini API to automate social media posts. It lets a chatbot understand natural commands like "Post this on X" and publish directly to Twitter (X).</p>
         <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/VEDANTDHAVAN/MCP_TOOLS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#2A2A2A] hover:bg-[#ffffff] hover:text-black text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>
  )
}

export default ShowcaseSection