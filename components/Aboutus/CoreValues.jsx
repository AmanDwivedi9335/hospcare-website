'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google'


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


const CoreValues = () => {
  const values = [
    {
      number: "1",
      title: "Quality First",
      description: "Consistently delivering products that meet or exceed global standards"
    },
    {
      number: "2", 
      title: "Reliability",
      description: "Proven performance under real-world conditions"
    },
    {
      number: "3",
      title: "Innovation", 
      description: "Embracing technology to redefine safety"
    },
    {
      number: "4",
      title: "Customer-Centric",
      description: "Tailored solutions that prioritize safety needs"
    },
    {
      number: "5",
      title: "Integrity",
      description: "Ethical practices and transparent communication"
    },
    {
      number: "6",
      title: "Global Vision",
      description: "Scaling Indian safety innovations to the world stage"
    }
  ];

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

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 60,
      scale: 0.8
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: index * 0.15
      }
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: (index) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + (index * 0.15),
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };

  return (
    <div className={`${ outfit.className} min-h-screen md:p-8 p-4 relative overflow-hidden`} id="values">
      <div className="absolute inset-0 md:flex items-center hidden justify-center">
        <div className="w-full h-full bg-gradient-to-b from-[#009D84] to-white rounded-full opacity-30"></div>
      </div>
      <div className="absolute inset-0 md:flex hidden items-center justify-center">
        <div className="w-[80%] h-[80%] bg-gradient-to-b from-[#009D84] border-6 border-white to-white rounded-full opacity-40"></div>
      </div>
      
      <div className="relative z-10 md:mt-15 mt-5 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h1 className="md:text-5xl text-3xl font-bold text-black mb-4">Core Brand Values</h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {values.map((value, index) => (
            <motion.div 
              key={index}
              className="md:bg-white/50 bg-white/50 rounded-2xl p-6 shadow-lg border-2 border-[#A7DED5] hover:shadow-xl transition-shadow duration-300"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="mb-4"
                custom={index}
                variants={numberVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-5xl font-bold text-black">{value.number}</span>
              </motion.div>
              <motion.h3 
                className="text-xl lg:text-[32px] font-bold text-black mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4 + (index * 0.15), duration: 0.5 }}
              >
                {value.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-sm lg:text-[18px] font-light leading-tight"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5 + (index * 0.15), duration: 0.5 }}
              >
                {value.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CoreValues;