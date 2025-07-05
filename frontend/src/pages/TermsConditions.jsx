import React from 'react';
import Title from '../components/Title';

const TermsConditions = () => {
  return (
    <div>
      <div className='text-2xl text-center p-8 border-t'>
        <Title text1={'TERMS &'} text2={'CONDITIONS'} />
      </div>
      <div className='border px-10 md:px-20 py-10 md:py-20 mx-10 md:mx-20 text-gray-600 shadow-xl rounded-xl '>
        <p>
          Welcome to Miy Skin Care. By accessing and using our website, you
          agree to comply with and be bound by the following Terms and
          Conditions. Please read them carefully before using our services.
        </p>
        <div className='pt-3'>
          <b className='text-xl'>1. About Us</b>
          <p>
            This website is operated by Miy Skin Care, a UK-based company
            offering luxury, vegan, cruelty-free skincare products. If you have
            any questions, please contact us at [email].
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>2. Use of Website</b>

          <ul className='px-3'>
            <li>- You must be at least 18 years old to make a purchase.</li>
            <li>
              - You agree not to misuse the site, including hacking, spamming,
              or transmitting malicious content.
            </li>
            <li>
              - We reserve the right to modify or withdraw our website (or any
              part of it) without notice.
            </li>
          </ul>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>3. Products & Descriptions</b>
          <p>
            We strive to ensure all product descriptions, images, and prices are
            accurate. However, we do not guarantee that all information is
            error-free. If a product you order is not as described, your sole
            remedy is to return it in unused condition.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>4. Orders & Payments</b>
          <ul className='px-3'>
            <li>- Orders are subject to availability and acceptance.</li>
            <li>- Prices are shown in GBP and include applicable UK taxes.</li>
            <li>-We accept secure online payments via [stripe, razorpay].</li>
            <li>
              - Once an order is placed, you will receive a confirmation email.
              This is not a contract of sale until your order is shipped.
            </li>
          </ul>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>5. Delivery</b>
          <p>
            We deliver to the UK and select international destinations.
            Estimated delivery times are provided at checkout but are not
            guaranteed. We are not liable for delays beyond our control.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>6. Returns & Refunds</b>
          <p>
            You have the right to cancel your order within 14 days under the UK
            Consumer Contracts Regulations. Products must be unused, unopened,
            and returned in original packaging.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>7. Intellectual Property</b>
          <p>
            All content on this site — including logos, text, images, and
            designs — is the intellectual property of Miy Skin Care and may not
            be used without our prior written permission.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>8. Limitation of Liability</b>
          <p>
            We are not liable for any loss or damage arising from your use of
            the website or from any products purchased, except where required by
            UK law.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>9. Governing Law</b>
          <p>
            These Terms & Conditions are governed by and construed in accordance
            with the laws of England and Wales. Any disputes will be resolved in
            the UK courts.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>10. Contact</b>
          <p>If you have any questions about these terms, please contact:</p>
          <p>📧 Email: [insert your contact email]</p>
          <p>📍 Address: [insert business address]</p>
        </div>

        <div className='pt-5'>
          {' '}
          <b>Last Revised: 7 May 2025</b>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
