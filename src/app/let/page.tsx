"use client";

import React from 'react';

export default function LetPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf7] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated SVG House Icon */}
        <div className="mb-8">
          <svg
            width="300"
            height="225"
            viewBox="0 0 200 150"
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* House outline path */}
            <path
              d="M50 100 L50 130 L150 130 L150 100 L100 50 Z M70 130 L70 110 L90 110 L90 130 Z M110 130 L110 110 L130 110 L130 130 Z"
              fill="none"
              stroke="#bfa14a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="house-draw"
              style={{
                strokeDasharray: '400',
                strokeDashoffset: '400',
                animation: 'drawHouse 3s ease-in-out infinite',
              }}
            />
            {/* Roof */}
            <path
              d="M100 50 L50 100 L150 100 Z"
              fill="none"
              stroke="#bfa14a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="roof-draw"
              style={{
                strokeDasharray: '150',
                strokeDashoffset: '150',
                animation: 'drawRoof 3s ease-in-out 0.5s infinite',
              }}
            />
          </svg>
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-800 flex justify-center items-center gap-4">
          <span
            className="opacity-0"
            style={{
              animation: 'slideInFromLeft 1s ease-in-out 2s forwards',
            }}
          >
            COMING
          </span>
          <span
            className="opacity-0"
            style={{
              animation: 'slideInFromRight 1s ease-in-out 2s forwards',
            }}
          >
            SOON
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;re preparing something special for you. Stay tuned!
        </p>
      </div>

      <style jsx>{`
        @keyframes drawHouse {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawRoof {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
