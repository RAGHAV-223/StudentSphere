import React from 'react';
import "./about.css"

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 p-10 rounded-xl shadow-lg bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text_top">About StudentSphere</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to StudentSphere, your go-to platform for collaboration, connection, and growth. Our mission is to provide students with the tools they need to connect with peers, collaborate on projects, and thrive in their academic and extracurricular endeavors.
          </p>
        </div>
        <div className="mt-8">
          {/* <h2 className="text-2xl font-semibold text-gray-700">Our Goals</h2> */}
          <div className="divider divider-primary">Our Goals</div>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Facilitate seamless communication and collaboration among students.</li>
            <li>Provide a platform for project management and team coordination.</li>
            <li>Create a supportive community for academic and personal growth.</li>
          </ul>
        </div>
        <div className="mt-8">
          {/* <h2 className="text-2xl font-semibold text-gray-700">Features</h2> */}
          <div className="divider divider-secondary">Features</div>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Discussion forums for various subjects and interests.</li>
            <li>Project spaces for team collaboration and management.</li>
            <li>User profiles to showcase skills, interests, and achievements.</li>
            <li>Real-time chat for quick communication.</li>
            <li>Resource sharing and document management.</li>
          </ul>
        </div>
        <div className="mt-8">
          {/* <h2 className="text-2xl font-semibold text-gray-700">Our Vision</h2> */}
          <div className="divider divider-info">Our Vision</div>
          <p className="mt-4 text-gray-600">
            At StudentSphere, we envision a world where students are empowered to achieve their full potential through collaboration and community support. By providing a comprehensive platform tailored to student needs, we aim to foster an environment of innovation, learning, and mutual growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
