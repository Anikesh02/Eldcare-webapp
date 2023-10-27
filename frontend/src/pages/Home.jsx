import React from 'react'
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import featureImg from '../assets/images/feature-img.png'
import videoIcon from '../assets/images/video-icon.png'
import avatarIcon from '../assets/images/avatar-icon.png'
import faqImg from '../assets/images/faq-img.png'
import { Link } from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../components/About/About'

import { useEffect } from 'react'
import { useUser } from '../UserContext'
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import ContactApp from '../ContactApp'




const Home = () => {

  const { user, updateUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        updateUser({ uid, name: displayName, photoURL, email });
      } else {
        updateUser(null);
      }
    });
    return () => unsubscribe();
  }, [updateUser]);

  // console.log(user);
  // console.log(user?.name);


  return (
    <>
      <ContactApp/>
      {/* <section className='hero__section pt-[60px] 2xl:h-[800px]'>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            
            <div>
              <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px]'>Hello, {user?.name? user.name : 'User'}.</h1>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px]'>We help elders live a healthy, longer life.</h1>
                <p className='text__para'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat cumque sint ad? Nemo facere voluptate cumque beatae? Officiis blanditiis ratione ab natus omnis culpa maxime odit quasi nulla.
                </p>
                <Link to='/appointment'><button className='btn'>Request an Appointment</button></Link>
  
              </div>

          
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>30+</h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Services</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>15+</h2>
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Clinic Location</p>
                </div>
                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>100%</h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                  <p className='text__para'>Elder's Satisfaction</p>
                </div>
              </div>



            </div>
            

          <div className="flex gap-[30px] justify-end">
            <div>
              <img className='w-full' src={heroImg01} alt="" />
            </div>
            <div className='mt-[30px]'>
              <img  src={heroImg02} alt="" className='w-full mb-[30px]' />
              <img  src={heroImg03} alt="" className='w-full'/>
             

            </div>
          </div>

          </div>
        </div>
      </section> */}
            {/* Hero Content end*/}
            

     

     


      

      
  </>
  )
} 

export default Home