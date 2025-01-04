import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-800 h-72">
        <div className="inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 opacity-90"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-lg text-white/90">
              Let's discuss your project and see how we can work together to bring your ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 ">
        <div className="grid lg:grid-cols-3 gap-12 -mt-24">
          {/* Contact Info Cards */}
          <div className="h-full flex flex-col space-y-10 lg:col-span-1">

            {/* Email Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex-1 flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex justify-center items-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                    <h3 className="font-semibold">Email</h3>
                    <a
                    href="mailto:your.email@example.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                    your.email@example.com
                    </a>
                </div>
            </div>


            {/* Phone Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex-1">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+1234567890" className="text-green-600 dark:text-green-400 hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex-1">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-purple-600 dark:text-purple-400">
                    Your City, Country
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex-1">
              <h3 className="font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                <form className="flex flex-col h-full">
                  <div className="space-y-6 flex-1">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full min-h-[12rem] px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-8 pt-0">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.292292615509614!3d48.85837007928745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1647543510221!5m2!1sen!2sfr"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;