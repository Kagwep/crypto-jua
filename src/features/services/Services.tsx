// src/components/Services.tsx
import React from 'react';

const Services: React.FC = () => {
  // Placeholder function for handling subscriptions
  const handleSubscribe = (serviceName: string) => {
    console.log(`Subscribed to ${serviceName}`);
    // Here you might interact with a blockchain or update a database
  };

  return (
    <div className="p-4">
      {/* Hero Section */}
      <section className="bg-green-600 text-white text-center p-6 mb-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Crypto Jua Services</h1>
        <p className="mt-2">Stay updated with real-time notifications tailored to your crypto activities.</p>
      </section>

      <h2 className="text-2xl font-bold text-center mb-6">Explore Our Services</h2>
      <div className="space-y-4">
        {[
          {
            name: 'Trade Executions',
            description: 'Receive real-time notifications when your buy or sell orders are executed. Stay ahead of the market with immediate updates directly from decentralized exchanges.'
          },
          {
            name: 'Price Alerts',
            description: 'Set and receive alerts when cryptocurrency prices hit your targeted thresholds. Make informed decisions based on timely, accurate market data.'
          },
          {
            name: 'Liquidity Changes',
            description: 'Get alerted about significant changes in liquidity pools. These notifications help you take advantage of new opportunities and avoid potential pitfalls in liquidity management.'
          }
        ].map(service => (
          <div key={service.name} className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <button
              onClick={() => handleSubscribe(service.name)}
              className="mt-4 md:mt-0 bg-green-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
