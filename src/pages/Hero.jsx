import React from "react";
import Button from "../components/common/Button";
import { features } from "../utils/helper";
import FeatureBox from "../components/common/FeatureBox";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  Shield,
  Clock,
  Users,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Medical Records" },
    { number: "5K+", label: "Appointments Booked" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  const benefits = [
    {
      icon: <Clock className="text-blue-600" size={32} />,
      title: "Save Time",
      description: "Book appointments instantly without phone calls or waiting",
    },
    {
      icon: <FileText className="text-blue-600" size={32} />,
      title: "Access Anytime",
      description: "View your medical records and health history 24/7",
    },
    {
      icon: <Shield className="text-blue-600" size={32} />,
      title: "Secure & Private",
      description:
        "Your health data is encrypted and protected with industry standards",
    },
    {
      icon: <Heart className="text-blue-600" size={32} />,
      title: "Stay Healthy",
      description: "Track your health metrics and manage medications easily",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up in minutes with your email and basic information",
    },
    {
      step: "2",
      title: "Add Your Health Info",
      description: "Upload medical records and complete your health profile",
    },
    {
      step: "3",
      title: "Start Managing",
      description: "Book appointments, view records, and track your health",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-50 to-blue-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Manage Your Health
              <span className="text-blue-600"> Easily</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
              Book Appointments, access Medical Records, and stay on top of your
              health - all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                text="Get Started Free"
                onClick={navigateToSignup}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-md transition shadow-lg text-lg"
              />
              <button
                onClick={navigateToLogin}
                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 rounded-md transition shadow-lg text-lg font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform to manage all aspects of your health and
              wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureBox
                heading={feature.heading}
                desc={feature.feature}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose HealthBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the convenience of modern healthcare management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-6 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features Detail Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to take control of your health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle
                  className="text-green-600 shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Easy Appointment Booking
                  </h3>
                  <p className="text-gray-600">
                    Schedule, reschedule, or cancel appointments with just a few
                    clicks. View your upcoming and past appointments all in one
                    place.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle
                  className="text-green-600 shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Digital Medical Records
                  </h3>
                  <p className="text-gray-600">
                    Upload, store, and access all your medical records securely.
                    View lab reports, prescriptions, and imaging results
                    anytime.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle
                  className="text-green-600 shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Complete Health Profile
                  </h3>
                  <p className="text-gray-600">
                    Maintain your health profile with allergies, medications,
                    and personal information. Keep everything up to date.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-blue-200 rounded-lg p-12 text-center">
              <Calendar className="text-blue-600 mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                All Your Health Data
              </h3>
              <p className="text-gray-700">
                In one secure, easy-to-access platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-linear-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are managing their health better with
            HealthBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              text="Get Started Free"
              onClick={navigateToSignup}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md transition shadow-lg text-lg font-semibold"
            />
            <button
              onClick={navigateToLogin}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-md transition text-lg font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
