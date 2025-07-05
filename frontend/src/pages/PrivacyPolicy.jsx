import React from 'react';
import Title from '../components/Title';

const PrivacyPolicy = () => {
  return (
    <div>
      <div className='text-2xl text-center p-8 border-t'>
        <Title text1={'PRIVACY'} text2={'POLICY'} />
      </div>
      <div className='border px-10 md:px-20 py-10 md:py-20 mx-10 md:mx-20 text-gray-600 shadow-xl rounded-xl '>
        <p>
          At Miy Skin Care, your privacy is our priority. This Privacy Policy
          outlines how we collect, use, store, and protect your personal data
          when you visit our website or make a purchase.
        </p>
        <div className='pt-3'>
          <b className='text-xl'>1. Information We Collect</b>
          <p>
            We may collect and process the following types of personal
            information:
          </p>
          <ul className='px-3'>
            <li>
              <strong>- Contact information:</strong> name, email address, phone
              number
            </li>
            <li>
              <strong>- Delivery information:</strong> shipping address and
              billing details
            </li>
            <li>
              <strong>- Payment details:</strong> securely processed by
              third-party providers (we do not store card data)
            </li>
            <li>
              <strong>- Account information: </strong> login credentials and
              preferences (if you create an account)
            </li>
            <li>
              <strong>- Usage data: </strong> IP address, browser type, pages
              visited, and cookies for analytics
            </li>
          </ul>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>2. How We Use Your Information</b>
          <p>We use your data to:</p>
          <ul className='px-3'>
            <li>- Process and deliver your orders</li>
            <li>- Provide customer service and respond to enquiries</li>
            <li>
              - Send order updates and marketing communications (if opted-in)
            </li>
            <li>- Improve our website, services, and user experience</li>
            <li>- Comply with legal obligations</li>
          </ul>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>3. Sharing Your Information</b>
          <p>
            We do not sell your personal data. However, we may share your
            information with:
          </p>
          <ul className='px-3'>
            <li>
              - Trusted third-party service providers (e.g., payment processors,
              couriers)
            </li>
            <li>- Analytics tools (e.g., Google Analytics)</li>
            <li>- Legal authorities, if required by law</li>
          </ul>
          <p>
            All third parties are GDPR-compliant and contractually bound to
            protect your data.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>4. Cookies</b>
          <p>
            Our website uses cookies to improve your browsing experience and
            collect usage statistics. You can manage your cookie preferences
            through your browser settings.
          </p>
          <p>For more information, see our [Cookie Policy].</p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>5. Data Retention</b>
          <p>
            We retain your personal data only as long as necessary for the
            purposes set out above, or as required by UK law (e.g., tax
            obligations).
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>6. Your Rights</b>
          <p>
            Under the UK General Data Protection Regulation (UK GDPR), you have
            the right to:
          </p>
          <ul className='px-3'>
            <li>- Access the data we hold about you</li>
            <li>- Request correction or deletion of your data</li>
            <li>- Withdraw consent at any time</li>
            <li>- Object to data processing in certain circumstances</li>
          </ul>
          <p>
            To exercise your rights, please contact us at [insert email
            address].
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>7. How We Protect Your Data</b>
          <p>
            We implement industry-standard security measures to protect your
            personal information from unauthorised access, loss, or misuse.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>8. Changes to This Policy</b>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with a revised effective date.
          </p>
        </div>
        <div className='pt-3'>
          <b className='text-xl'>9. Contact Us</b>
          <p>
            If you have any questions about this Privacy Policy or how your data
            is handled, you can contact us at:
          </p>
          <p>📧 Email: [insert your contact email]</p>
          <p>📍 Business Address: [insert company address]</p>
        </div>

        <div className='pt-5'>
          {' '}
          <b>Last Revised: 7 May 2025</b>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
