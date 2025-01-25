import React from "react";

const Footer = () => {
    return (
        <footer className="bg-orange-500 dark:bg-orange-600 text-gray-900 dark:text-white transition-colors duration-200 py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm md:text-base">
                    &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
                </p>
                <p className="text-xs md:text-sm mt-1">
                    Built with me.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
