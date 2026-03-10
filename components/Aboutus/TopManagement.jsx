"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Linkedin } from 'lucide-react';
import { motion } from 'framer-motion'
import sunil from "../../public/images/aboutus/sunil1.jpg"
import sumithra from "../../public/images/aboutus/sumithra2.png"
import deepak from "../../public/images/aboutus/Deepak.png"
import Hemant from "../../public/images/aboutus/Hemant.png"
import Kunal from "../../public/images/aboutus/Kunal.png"
import Megha from "../../public/images/aboutus/Megha.png"
import nilmani from "../../public/images/aboutus/nilmani.png"
import Pradeep from "../../public/images/aboutus/Pradeep.png"
import Zaki from "../../public/images/aboutus/zaki.png"
import Suresh from "../../public/images/aboutus/Suresh.png"
import Image from 'next/image';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
    variable:"--font-outfit",
    subsets:["latin"]

})

const TopManagement = () => {
    const [isTopManagementVisible, setIsTopManagementVisible] = useState(false)
    const [animatedTopManagement, setAnimatedTopManagement] = useState(new Set())
    const topManagementRef = useRef(null)

    const topManagementData = [
        {
            id: 1,
            name: "Sunil Ladwa",
            position: "Director - Business Development",
            image: sunil,
            linkedIn: "#"
        },
        {
            id: 2,
            name: "Sumithra Ladwa",
            position: "Director - Admin & HR",
            image: sumithra,
            linkedIn: "#"
        }
    ];

    const teamData = [
        
        {
            id: 1,
            name: "Deepak",
            position: "Manager - Operations",
            image: deepak,
            linkedIn: "#"
        },
        {
            id: 2 ,
            name: "Megha",
            position: "Manager - Tech Sync",
            image: Megha,
            linkedIn: "#"
        },
        {
            id: 3 ,
            name: "Suresh",
            position: "Manager - Corporate Sales",
            image: Suresh,
            linkedIn: "#"
        },
        
        
        {
            id: 4,
            name: "Hemant",
            position: "Assistant Manager - Projects",
            image: Hemant,
            linkedIn: "#"
        },
        {
            id: 5 ,
            name: "Nityananada",
            position: "Assistant Manager - Sales",
            image: nilmani,
            linkedIn: "#"
        },
        {
            id: 6 ,
            name: "Pradeep",
            position: "Assistant Manager - Operations",
            image: Pradeep,
            linkedIn: "#"
        },
        {
            id: 7 ,
            name: "Zaki",
            position: "Assistant Manager - Inside Sales",
            image: Zaki,
            linkedIn: "#"
        },
        {
            id: 8 ,
            name: "Kunal",
            position: "Team Lead - Communication",
            image: Kunal,
            linkedIn: "#"
        },
    ];
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsTopManagementVisible(true)
                    }
                })
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        )

        if (topManagementRef.current) {
            observer.observe(topManagementRef.current)
        }

        return () => {
            if (topManagementRef.current) {
                observer.unobserve(topManagementRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (isTopManagementVisible) {
            setTimeout(() => {
                setAnimatedTopManagement(prev => new Set([...prev, 'title']))
            }, 100)

            topManagementData.forEach((_, index) => {
                setTimeout(() => {
                    setAnimatedTopManagement(prev => new Set([...prev, index]))
                }, 300 + (index * 200))
            })
        }
    }, [isTopManagementVisible])

    const TeamCard = ({ member, isTopManagement = false, index = 0 }) => {
        const isAnimated = animatedTopManagement.has(index)
        
        const cardVariants = {
            hidden: { 
                opacity: 0, 
                scale: 0,
                rotate: 0
            },
            visible: { 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    duration: 0.6
                }
            }
        }

        const CardWrapper = isTopManagement ? motion.div : 'div'
        const cardProps = isTopManagement ? {
            variants: cardVariants,
            initial: "hidden",
            animate: isAnimated ? "visible" : "hidden",
            className: "relative group"
        } : {
            className: "relative group"
        }

        return (
            <CardWrapper {...cardProps}>
                <div className={`bg-[#D7FFF8] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${outfit.className}`}>
                    <div className="flex space-x-2 mb-6">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Image
                                src={member.image}
                                alt={member.name}
                                className="lg:w-[20vw] lg:h-[43vh] w-[50vw]  rounded-full object-cover border-[12px] border-[#097362]/30 shadow-md filter grayscale"
                            />
                        </div>
                    </div>
                </div>
                <div className='my-7'>
                    <div className="flex justify-center mb-4">
                        <a
                            href={member.linkedIn}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Linkedin size={16} />
                        </a>
                    </div>
                    <div className="text-center">
                        <h3 className="text-gray-800 font-bold md:text-2xl text-xl mb-2">{member.name}</h3>
                        <p className="text-[#097362] md:text-xl text-sm font-medium  leading-relaxed">{member.position}</p>
                    </div>
                </div>
            </CardWrapper>
        )
    };

    return (
        <div className=" py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16" ref={topManagementRef}>
                    <motion.h2 
                        className="md:text-5xl text-3xl font-bold text-gray-800 text-center mb-12"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: animatedTopManagement.has('title') ? 1 : 0,
                            scale: animatedTopManagement.has('title') ? 1 : 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            duration: 0.6
                        }}
                    >
                        Top Management
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {topManagementData.map((member, index) => (
                            <TeamCard 
                                key={member.id} 
                                member={member} 
                                isTopManagement={true} 
                                index={index}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="md:text-5xl text-3xl font-bold text-gray-800 text-center mb-12">
                        Our Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {teamData.map((member) => (
                            <TeamCard key={member.id} member={member} />
                        ))}
                    </div>

                    {/* <div className="text-center">
                        <button onClick={() => {navigate.push('/contact-us')}} className="bg-gradient-to-b from-[#097362] to-[#0FA78E] cursor-pointer hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
                            See all team members
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default TopManagement;