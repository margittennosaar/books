import { useState } from 'react';
import axios from 'axios';

// Custom hook to handle Axios requests
const useAxios = (baseUrl) => {
  // State to store the response data
  const [data, setData] = useState(null);
  // State to manage alert messages
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to show alert messages
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000); // Hide alert after 5 seconds
  };

  // Function to make an Axios request
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload); // Make the request
      setData(response.data); // Set the response data
      showAlert('Request successful', 'success'); // Show success alert
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error'); // Show error alert
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  // Function to make a GET request
  const get = async (endpoint) => makeRequest('get', endpoint);
  // Function to make a POST request
  const post = async (endpoint, payload) => makeRequest('post', endpoint, payload);
  // Function to make a PUT request
  const update = async (endpoint, payload) => makeRequest('put', endpoint, payload);
  // Function to make a DELETE request
  const remove = async (endpoint) => makeRequest('delete', endpoint);

  // Return the state and request functions
  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
