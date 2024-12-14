import { useState } from 'react';
import axios from 'axios';

//custom hook to make requests to the server via axios. It takes the URL as an argument and returns an object with data, alert, loading, get, post, update, and remove properties
const useAxios = (baseUrl) => {
  const [data, setData] = useState([]); //data is the response from the server, [] by default 
  const [alert, setAlert] = useState({ show: false, message: '', type: '' }); //alert is an object with show, message, and type properties, initially set to false, empty string, and empty string
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {//function to show an alert with a message and type. Appears for 5 seconds
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  const makeRequest = async (method, endpoint, payload = null) => {//function to make a request to the server. It takes the method, endpoint, and payload as arguments
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
      showAlert('Request successful', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  //all methods:
  const get = async (endpoint) =>
    makeRequest('get', endpoint);
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) =>
    makeRequest('delete', endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
