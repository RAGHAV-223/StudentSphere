import React from 'react';
import "./contact.css"

const ContactPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center">
    <div className="bg-white flex flex-grow items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 p-6 md:p-10 rounded-xl shadow-lg bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold custom_color">Contact Us</h1>
          <p className="mt-4 text-lg md:text-sm text-gray-600">
            We'd love to hear from you! Whether you have a question about anything, our team is ready to answer all your questions.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md space-y-1">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" required className="w-full px-3 py-2 rounded-md bg-[#eae6f5] border-gray-300 placeholder-gray-500 focus:outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-3 py-2 rounded-md bg-[#eae6f5] border-gray-300 placeholder-gray-500 focus:outline-none" placeholder="Your Email" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" rows="4" required className="w-full px-3 py-2 rounded-md bg-[#eae6f5] border-gray-300 placeholder-gray-500 focus:outline-none" placeholder="Your Message"></textarea>
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 submit-btn">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
    </main>
  );
};

export default ContactPage;
