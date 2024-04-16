import React from 'react'
import MainBg from "../../assets/main.jpg"
import Noti from "../../assets/noti.jpg"

const Landing = () => {
    
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
    <header className="bg-green-600 text-white p-4">
      <h1 className="text-xl">Crypto Jua - Stay Updated</h1>
    </header>
    <main className="p-4">
      {/* Hero section with image placeholder */}
      <section className="text-center bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Stay Informed, Instantly</h2>
        <p>Receive real-time notifications about your crypto transactions without sharing your email.</p>
        {/* Placeholder for hero image */}
        <img src={MainBg} alt="Crypto Jua Hero" className="mx-auto mt-4 w-96 h-50 object-cover rounded-lg" />
      </section>
      
      <section className="mt-6">
        <h2 className="text-lg font-bold">Notification Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Trade Executions</h3>
            <p>Get notifications when your buy or sell orders are executed on decentralized exchanges.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Price Alerts</h3>
            <p>Set alerts for specific cryptocurrencies to make timely trading decisions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Liquidity Changes</h3>
            <p>Receive alerts about significant liquidity pool changes and new opportunities.</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Latest Projects</h2>
        <p>Explore the latest updates, features, and integrations in the Web3 ecosystem.</p>
        {/* Additional placeholder for project updates */}
        <img src={Noti} alt="Latest Projects" className="mx-auto mt-4 w-full md:w-96 h-50 object-cover rounded-lg" />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Data Protection</h2>
        <p>Ensuring your data stays private with cutting-edge blockchain security measures.</p>
      </section>
    </main>
    <footer className="bg-green-600 text-white p-4 text-center">
      © 2024 Crypto Jua. All rights reserved.
    </footer>
  </div>
  )
}

export default Landing