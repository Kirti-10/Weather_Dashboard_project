import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  { name: 'Weather Forecast', path: '/weather', icon: '🌤️' },
  { name: 'Feedback', path: '/feedback', icon: '📝' },
]

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://w0.peakpx.com/wallpaper/856/288/HD-wallpaper-sunset-over-the-field-rural-quality-sunlight-farming-dusk-crop-yellow-sunset-agricultural-graphy-green-nature-field.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-300">
          Welcome to Weather Forecast Dashboard
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-200">
        Check your forecast today and stay ready for whatever the weather has in store!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center backdrop-filter backdrop-blur-sm floating"
            >
              <span className="text-5xl mb-4">{feature.icon}</span>
              <h2 className="text-xl font-semibold">{feature.name}</h2>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}