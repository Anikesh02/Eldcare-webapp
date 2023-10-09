import React from 'react';

const Contact = () => {
  return (
    <section className="bg-blue-100 py-10">
      <div className="container mx-auto max-w-screen-md px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-lg font-light text-center mb-12">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">Your Email</label>
            <input type="email" id="email" placeholder="example@gmail.com" className="w-full p-2 rounded border border-gray-300 placeholder-gray-400" />
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold mb-1 text-gray-700">Subject</label>
            <input type="text" id="subject" placeholder="Let us know how we can help you" className="w-full p-2 rounded border border-gray-300 placeholder-gray-400" />
          </div>

          <div className="col-span-2">
            <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Your Message</label>
            <textarea rows={5} type="text" id="message" placeholder="Leave a comment..." className="w-full p-2 rounded border border-gray-300 placeholder-gray-400"></textarea>
          </div>
          <button type="submit" className="btn w-auto py-2 px-6 rounded bg-blue-500 text-white hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
