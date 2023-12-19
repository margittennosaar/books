// imports axios - which is similar to fetch in vanilla js
// importing react elements from other files

// the useState hook is used to create a state variable data
// Axios is used within the useEffect hook to fetch data (when the component mounts).
//The fetched data is then stored in the state variable using the setData function.

import {useState} from 'react';
import axios from 'axios';

const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({show: false, message: '', type: ''});
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({show: true, message, type});
    setTimeout(() => {
      setAlert((currentAlert) => ({...currentAlert, show: false}));
    }, 5000);
  };

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

  return {data, alert, loading, get, post, update, remove};
};

export default useAxios;
