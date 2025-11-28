import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-600">About Us</h3>
          <p className="text-sm leading-relaxed">
            HealthBridge is your trusted platform to manage appointments, access
            medical records, and stay on top of your health securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-600">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {/* Corrected Links */}
            <li>
              <a href="#" className="hover:text-blue-500">
                Appointments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Medical Records
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Our Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-600">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            {/* Corrected Contact Info Links */}
            <li>
              Email:{" "}
              <a
                href="mailto:support@healthbridge.com"
                className="hover:text-blue-500"
              >
                support@healthbridge.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-blue-500">
                +1 (234) 567-890
              </a>
            </li>
            <li>Address: 123 Health St, Wellness City</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 mt-8 border-t pt-4">
        © 2025 HealthBridge | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
}

export default Footer;
