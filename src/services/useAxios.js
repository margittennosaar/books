import { useState } from 'react';
import axios from 'axios';

// useAxios function is a custom hook that is used to make requests to the server.
const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  // showAlert function is used to set the alert state and show the alert message for 5 seconds.
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  // makeRequest function is used to make requests to the server and set the data state, in case of error it will show the error message in the alert state.
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
  // get function is used to make a get request to the server.
  const get = async (endpoint) => makeRequest('get', endpoint);
  // post function is used to make a post request to the server.
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  // update function is used to make a put request to the server.
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  // remove function is used to make a delete request to the server.
  const remove = async (endpoint) => makeRequest('delete', endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
