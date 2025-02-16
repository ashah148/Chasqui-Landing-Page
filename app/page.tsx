'use client';
import Image from "next/image";
//import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('http://localhost:8000/api/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setStatus('success');
        setEmail('');
        // Optionally hide the form after successful submission
        setTimeout(() => setShowEmailForm(false), 2000);
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error(error); 
      setMessage('Unable to connect to the server. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/chasquiWhite.svg"
          alt="Chasqui logo"
          width={70}
          height={15}
          priority
          className="absolute top-4 left-4"
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mt-[-200px]">
          <h2 className="mb-20 text-custom-size">
            Networking can be hard.
          </h2>
          <div className="text-xl ml-2"> Let&apos;s make it easier. </div>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        {!showEmailForm ? (
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={() => setShowEmailForm(true)}
            >
              Sign up now
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:bg-gray-400"
              >
                {status === 'loading' ? 'Signing up...' : 'Submit'}
              </button>
              {message && (
                <p className={`text-center ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
