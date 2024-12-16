import { useState } from 'react';
import axios from 'axios';

const useAxios = (baseUrl) => {  //define a function useAxios and passing the parameter baseUrl
  const [data, setData] = useState(null); //used useState to set the data
  const [alert, setAlert] = useState({ show: false, message: '', type: '' }); //used useState to set the alert
  const [loading, setLoading] = useState(false); //used useState to set the loading state
 
  const showAlert = (message, type) => {  //define a function to show the alert
    setAlert({ show: true, message, type }); //set the alert
    setTimeout(() => { //set the timeout for the alert
      setAlert((currentAlert) => ({ ...currentAlert, show: false })); 
    }, 5000);
  };

  const makeRequest = async (method, endpoint, payload = null) => { //define a function to make a request
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload); //used axios to make a request
      setData(response.data); //set the data
      showAlert('Book added successfully', 'success'); // showing a message if the book is added successfully
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error'); //showing an error message if something went wrong
    } finally { //finally block to set the loading state to false
      setLoading(false);
    }
  };
  const get = async (endpoint) => makeRequest('get', endpoint); //define a function to get the data
  const post = async (endpoint, payload) => //define a function to post the data
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) => //define a function to update the data
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) => makeRequest('delete', endpoint); //define a function to remove the data

  return { data, alert, loading, get, post, update, remove }; //return the data, alert, loading, get, post, update, remove
};

export default useAxios;
