import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center p-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='px-10 text-gray-600 text-xl leading-relaxed'>
        <div className='flex flex-col sm:block'>
          <img
            className='w-full sm:w-[250px] lg:w-[300px] sm:float-left sm:mr-6 sm:mb-4 rounded-xl shadow-xl'
            src={assets.about_img}
            alt='Smiling woman with glowing skin — Miy skincare lifestyle photo'
          />
          <div>
            <p>
              <span className='niconne-regular text-4xl  text-red-start block m-4'>
                MY Skin Care
              </span>
              Born in Britain, made for every skin — we craft luxury skincare
              that doesn’t just sit on your shelf, it transforms your ritual.
            </p>
            <div>
              <p className='italic font-semibold mb-2'>
                Every product we create is:
              </p>
              <ul className='text-gray-600 text-xl'>
                <li>✨ Vegan Friendly, Cruelty Free</li>
                <li>✨ Smelt unreal, Unisex</li>
                <li>✨ Rich in natural ingredients</li>
                <li>✨ Affordable yet luxurious</li>
                <li>✨ Housed in gorgeous packaging</li>
              </ul>
            </div>
          </div>

          <p className='pt-2'>
            We created our line with a clear vision — to craft high-performance,
            beautifully packaged products that feel indulgent, smell incredible,
            and are accessible to everyone. Our formulas are designed to suit
            all skin types, so whether you’re treating yourself or your clients,
            you can trust in skincare that works and feels extraordinary.
          </p>
        </div>
      </div>

      <div className='clear-left '>
        <p className='text-gray-600 text-xl mb-6 px-10'>
          From the nourishing textures to the unforgettable scents, each item in
          our range is made to elevate your skincare routine — while staying
          kind to your skin, your wallet, and the planet. We believe confidence
          begins with feeling good in your skin. With us, you can walk in that
          confidence every day.
        </p>
      </div>

      <div className='px-10'>
        <div className='lg:flex lg:flex-row lg:items-center gap-16'>
          <div className=' text-xl text-gray-600 leading-relaxed'>
            <div className='relative'>
              <img
                src={assets.hero_img2}
                alt='Face of girl'
                className='w-full sm:w-[300px] lg:w-[450px] sm:float-right sm:ml-6 sm:mb-4 rounded-xl shadow-xl'
              />
              <p>
                <strong className='italic text-gray-700'>
                  It's Where Pure Meets Powerful.
                </strong>{' '}
                Have you ever felt let down by skincare that promises more than
                it gives? In a world full of harsh chemicals and
                one-size-fits-all routines, your skin, body, and hair deserve
                more than the basics. The real issue? Products that only work on
                the surface — leaving your skin stressed, your glow faded, and
                your confidence shaken.
              </p>

              <p>
                <strong className='italic text-gray-700'>
                  You Deserve Better.
                </strong>{' '}
                We believe skincare should feel like a ritual, not a routine.
                You deserve care that’s both indulgent and effective. Think
                textures that melt into your skin, calming natural scents, and
                ingredients that truly make a difference — every single day.
                That’s what MY Skin Care delivers.
              </p>

              <p>
                <strong className='italic text-gray-700'>
                  Welcome to MY Skin Care.
                </strong>{' '}
                Thoughtfully formulated for your face, body, and hair — powered
                by nature, perfected by science. Each product blends
                high-performance actives with clean ingredients and a touch of
                elegance, turning everyday care into a self-love ritual. Your
                glow-up starts here. Because when you feel good in your skin,
                everything changes.
              </p>

              <p>
                <strong className='italic text-gray-700'>
                  A Brand You Can Fall in Love With.
                </strong>{' '}
                MY Skin Care is a premium, conscious beauty brand. We create
                luxurious, clean essentials for those who believe in treating
                their skin — and themselves — with care and intention.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='text-xl pt-10 pb-2 px-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <p className='text-xl text-gray-600 px-10'>
        Our mission is simple: to provide results-driven products that are
        affordable, vegan, cruelty-free, and made to suit all skin types. From
        the packaging to the ingredients, every detail has been carefully
        crafted to ensure you feel confident in your skin. With naturally
        powerful ingredients, unforgettable scents, and unisex formulas that
        truly deliver, we’re here to raise your skincare expectations — and then
        exceed them.
      </p>

      <div className='flex flex-col md:flex-row gap-3 text-xl m-10 items-stretch'>
        <div className='flex-1 border px-5 md:px-8 py-4 sm:py-8 flex flex-col gap-5 shadow-xl rounded-xl'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            We meticulously select and test every product to ensure it meets the
            highest standards of performance, safety, and care — because your
            skin deserves nothing less.
          </p>
        </div>
        <div className='flex-1 border px-5 md:px-8 py-4 sm:py-8 flex flex-col gap-5 shadow-xl rounded-xl'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            With our user-friendly website and seamless ordering process,
            finding your perfect skincare match has never been easier.
          </p>
        </div>
        <div className='flex-1 border px-5 md:px-8 py-4 sm:py-8 flex flex-col gap-5 shadow-xl rounded-xl'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our dedicated support team is here to guide, support, and answer
            every question — because great skincare starts with great people.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
