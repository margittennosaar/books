import { useState } from 'react';
import axios from 'axios';

// baseurl is the a url part of the api. Here we use axios to fetch and post data to api that uses 'jsonplaceholder' to checking the states of current and future data to be set, alert information and loading status.
const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  // alert function to show whether the book  was added successfully or not and with a time limit.
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  // function to make a request to the api from client to server taking parameters of endpoint and payload
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert('Book added successfully', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  const get = async (endpoint) => makeRequest('get', endpoint);
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) => makeRequest('delete', endpoint);


// return the following when a makeReques is made
  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
