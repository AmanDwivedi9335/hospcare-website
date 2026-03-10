'use client';

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import heroimg from "../../public/images/aboutus/hero image.png"
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const Herosection = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Defining Safety. Delivering Trust.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 100); 

    return () => clearInterval(timer);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const ladwaVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  const typewriterVariants = {
    hidden: { 
      opacity: 0,
      y: 30 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className='w-full max-w-full mx-auto'>
      <div className='w-full max-w-7xl mx-auto relative '>
        <Image src={heroimg} alt="hero image" className='rounded-3xl w-full h-auto object-cover' priority />

        {/* Text overlay */}
        <div className='absolute inset-0 bg-black/50  rounded-3xl flex flex-col justify-center items-center  md:p-12 lg:p-16 text-center sm:text-left lg:min-h-[400px]'>
          <motion.div 
            className='text-white w-full'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p 
              className='text-xl md:text-3xl font-bold mb-2 sm:mb-4 tracking-wide'
              variants={slideUpVariants}
            >
              ABOUT US
            </motion.p>

            <div className='text-3xl md:text-4xl lg:text-5xl xl:text-[80px] font-bold mb-4 md:mb-6 leading-tight'>
              <motion.span 
                className='block mb-1 md:mb-2 text-transparent' 
                style={{
                  WebkitTextStroke: '2px white',
                  textStroke: '2px white'
                }}
                variants={ladwaVariants}
              >
                LADWA
              </motion.span>
              
              <motion.span 
                className='text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight block'
                variants={typewriterVariants}
              >
                {typewriterText}
                {!isTypingComplete && (
                  <motion.span
                    className="inline-block w-1 h-8 sm:h-12 md:h-16 lg:h-20 xl:h-24 bg-white ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.span>
            </div>

            <motion.p 
              className={`text-xs md:text-xl leading-relaxed text-gray-200 ${outfit.className}`}
              initial="hidden"
              animate={isTypingComplete ? "visible" : "hidden"}
              variants={paragraphVariants}
            >
              LADWA is a pioneer and leader in the Environment, Health, and Safety (EHS) sector, providing high-quality safety products and services across India and global markets. Our name is synonymous with innovation, compliance, and uncompromised quality in road safety, industrial safety, fire protection, and personal protective equipment (PPE).
            </motion.p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Herosection