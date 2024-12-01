function Footer() {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Explore Ride Mechanics</h2>
            <p className="text-sm text-gray-200">Explore Ride Mechanics is dedicated to providing reliable and top-notch car rental, tourism, and roadside assistance services. Our mission is to make your journeys smooth, safe, and memorable.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/carList" className="text-sm text-gray-200 hover:text-white">
                  Car Rental
                </a>
              </li>
              <li>
                <a href="/getpackageList" className="text-sm text-gray-200 hover:text-white">
                  Tourism Packages
                </a>
              </li>
              <li>
                <a href="/roadside" className="text-sm text-gray-200 hover:text-white">
                  Roadside Assistance
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-200 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm text-gray-200">
              <strong>Email:</strong> support@exploreride.com
            </p>
            <p className="text-sm text-gray-200">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-sm text-gray-200">
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-gray-200 hover:text-white" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-200 hover:text-white" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-200 hover:text-white" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-gray-200 hover:text-white" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <h1 className="text-sm font-semibold">© 2024 Explore Ride Mechanics. All rights reserved.</h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
