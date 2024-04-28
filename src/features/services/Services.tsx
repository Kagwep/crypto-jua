// src/components/Services.tsx
import React, {useState} from 'react';
import { ethers } from 'ethers';
import servicesContract from "@/abi/Cryptojua.json"


const contractABI = servicesContract.abi;

const contractAddress = "0xD6595b761aD0F6a0E332F92E29ccd342ee757DB8";

const Services: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState<number>();
  const [protectedAddress, setProtectedAddress] = useState<string>("");
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [hasFailedSubscribed, setHasFailedSubscribed] = useState(false);
  const [isSubscribed, setHasAlreadySubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_INFURA_URL);
  const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  //console.log(contract)

  const getSubscribers = async (serviceId: number): Promise<string[]> => {
    try {
      // Call the getSubscribers function on the contract
      const result:string[] = await contract.getSubscribers(serviceId);
  
      // Log the result
      console.log("Subscribers:", result);

  
      return result;

    } catch (error) {
      console.error("Error fetching subscribers:", error);
      // Handle error as needed
      return [];
    }
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setProtectedAddress(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const encryptedDataAddress = protectedAddress;
    validateAddress(encryptedDataAddress);
    
    if(isValid){
        try{
            // Disable the submit button and show loading state
        setIsLoading(true);
        const serviceId = currentService;
        const subscriber = encryptedDataAddress;

        let isSub: string[] = await getSubscribers(serviceId!);

        let newSub = []

        for (let x = 0; x < isSub.length; x++ ){
            newSub.push(isSub[x])
        }

        const matchingAddress = isSub.find(sub => {
          const lowercaseBackendAddress = sub.toLowerCase();
          if (lowercaseBackendAddress === subscriber.toLowerCase()){
            return true
          }else{
            return false
          }
          });

          

        if (matchingAddress) {


          console.log("dsfds",matchingAddress)

          setHasAlreadySubscribed(true);
          
        } else {
          

          
          const tx = await contract.addSubscriber(serviceId, subscriber);

          // Wait for the transaction to be mined
          await tx.wait();
  
          // Transaction successful, do any further processing if needed
  
          console.log("Subscriber added successfully!");

          setHasSubscribed(true);
        }

        // Call the addSubscriber function on the contract


      } catch (error) {
        console.error("Error adding subscriber:", error);
        // Handle error as needed
        setHasFailedSubscribed(true);
        setIsLoading(false);
      }
    }
    setProtectedAddress('')
    setShowModal(false);
    setIsLoading(false);
    setTimeout(() => {e
      setHasAlreadySubscribed(false);
  }, 2000); // Delay of 2000 milliseconds (2 seconds)
    
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleSubscribe = (serviceId: number) => {
    setCurrentService(serviceId);
    setShowModal(true);
  };

  const validateAddress = (address: string) => {

      let validity = ethers.isAddress(address)
      setIsValid(validity);
      

  };


  return (
    <div className="p-4">
      {/* Hero Section */}
      <section className="bg-green-600 text-white text-center p-6 mb-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Crypto Jua Services</h1>
        <p className="mt-2">Stay updated with real-time notifications tailored to your crypto activities.</p>
      </section>
      {!isValid && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <strong className="font-bold">Invalid Address!</strong>
          <span className="block sm:inline"> Please enter a valid Protected Data address.</span>
        </div>
      )}
      {hasSubscribed && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
          <strong className="font-bold">Subscription Successful!</strong>
        </div>
      )}
      {hasFailedSubscribed && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <strong className="font-bold">oops! something went wrong.</strong>
        </div>
      )}
      {isSubscribed && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative" role="alert">
          <strong className="font-bold">You are already a subscriber!</strong>
        </div>
      )}
      <h2 className="text-2xl font-bold text-center mb-6">Explore Our Services</h2>
      <div className="space-y-4">
        {[
          {
            "id": 7,
            "name": "Price Alerts",
            "description": "Set and receive alerts when cryptocurrency prices hit your targeted thresholds. Make informed decisions based on timely, accurate market data."
          },
          {
            "id": 4,
            "name": "Exchange Rates",
            "description": "Stay updated with the latest exchange rates for cryptocurrencies. Keep track of market dynamics and currency conversion rates in real time."
          },
          {
            "id": 5,
            "name": "Crypto News",
            "description": "Get the latest news and developments in the cryptocurrency world. Stay informed with real-time updates on events impacting the crypto market."
          },
          {
            "id": 6,
            "name": "Airdrops",
            "description": "Receive notifications about upcoming airdrops and claim opportunities. Be the first to know when new tokens are distributed to the community."
          }
        ].map(service => (
          <div key={service.name} className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p>{service.description}</p>
            </div>
            <button
              onClick={() => handleSubscribe(service.id)}
              className="mt-4 md:mt-0 bg-green-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="text-right">
                <button onClick={handleCloseModal} className=" top-2  text-lg font-bold text-red-500">X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-bold my-2">Protected Data Address:</label>
              <input type="text" name="protectedData" value={protectedAddress} onChange={handleInputChange } className="w-full p-2 border border-gray-400 rounded" />
              <button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit' }
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;
