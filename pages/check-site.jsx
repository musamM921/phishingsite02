import axios from "axios";
import React, { useState } from "react";
import Popup from "../components/Popup/Popup";

const CheckSite = () => {
  const [domain, setDomain] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const checkSiteSafety = async () => {
    try {
      const response = await axios.get(`/api/checksite?domain=${domain}`);
      const siteStatus = response.data;

      if (siteStatus?.safe) {
        setPopupMessage('This site is safe to enter');
      } else {
        setPopupMessage('This site is not safe to enter');
      }

      setShowPopup(true);
    } catch (error) {
      console.error("Error checking site safety:", error);
      setPopupMessage('Unknown');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Phishalayzer</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain to analyze</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type domain to check"
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>

          </div>
          <button type="button" className={`inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-primary-800`}
            onClick={checkSiteSafety}
          >
            Check URL
          </button>
          {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
        </form>
      </div>
    </section>
  );
}

export default CheckSite;


