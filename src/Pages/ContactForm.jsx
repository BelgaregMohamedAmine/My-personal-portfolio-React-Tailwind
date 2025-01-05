import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';


const ContactPage = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Hero Section */}
      <div className="h-72 bg-[url('./assets/contactCover.webp')] bg-center bg-cover bg-no-repeat">
        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-center  ">
          <div className="max-w-5xl ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 transition-all">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white transition-all [text-shadow:_0_4px_8px_#ff999f] ">
              Let's discuss your project and see how we can work together to bring your ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-4 -mt-24">

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-4">

            {/* Info Cards Container - maintains consistent height across breakpoints */}
            <div className="grid grid-cols-1 gap-4 sm:contents lg:grid">
              
              {/* Email Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex items-center min-h-[5rem] transition-all hover:shadow-xl">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full flex justify-center items-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">Email</h3>
                  <a
                    href="mailto:belgaregmohamedamine@outlook.fr"
                    className="text-blue-600 dark:text-blue-400 hover:underline  block text-xs sm:text-sm break-all"
                  >
                    belgaregmohamedamine@outlook.fr
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex items-center min-h-[5rem] transition-all hover:shadow-xl">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full flex justify-center items-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">Phone</h3>
                  <a
                    href="tel:+21656490416"
                    className="text-green-600 dark:text-green-400 hover:underline text-xs sm:text-sm"
                  >
                    + (216) 56 490 416
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex items-center min-h-[5rem] transition-all hover:shadow-xl">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full flex justify-center items-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">Location</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm">
                    Tunisia, Beja
                  </p>
                </div>
              </div>

             {/* Social Links */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex items-center min-h-[5rem] transition-all hover:shadow-xl">
                <div className="flex justify-between w-full mx-4 ">
                  {[
                    { icon: Github, href: "https://github.com/BelgaregMohamedAmine" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-amine-belgareg-bi-analyst/" },
                    { icon: Twitter, href: "https://x.com/MohamedAmi87477" },
                    { icon: Instagram, href: "https://www.instagram.com/belgareg.mohamed.amine/" },
                    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100087518705181" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all group"
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

  
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {/* Form content unchanged */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Send Me a Message</h2>

                <form className="space-y-6" action="https://formspree.io/f/mldrbqlj" method="post">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2" >
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
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
                         name="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2" >
                         Phone Number (with Area Code)
                      </label>

                      <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+216 56 490 416"
                      />
      
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2" >Project Domain</label>
                        <select
                        id="projectDomain"
                        name="projectDomain"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="business intelligence">Business Intelligence</option>
                          <option value="data analyst">Data Analyst</option>
                          <option value="web development">Web Development</option>
                          <option value="other">Other</option>
                        </select>
                     </div>
    
                  </div>


                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="aspect-w-16 aspect-h-9 h-60 sm:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d17039.34280113019!2d9.235828299999996!3d36.4031271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2stn!4v1735938649669!5m2!1sen!2stn"
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