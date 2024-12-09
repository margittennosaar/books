import { useState } from "react";
import axios from "axios";

/**
 * A custom React hook for handling HTTP requests using Axios.
 * Provides utilities for GET, POST, PUT, and DELETE requests,
 * with state management for data, loading, and alert notifications.
 *
 * @param {string} baseUrl - The base URL for all HTTP requests.
 * @returns {object} An object containing the data, alert state, loading state,
 *                   and methods for HTTP requests (get, post, update, remove).
 */
const useAxios = (baseUrl) => {
  // State to store the response data from API requests.
  const [data, setData] = useState(null);

  // State to manage alert notifications (visibility, message, type).
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // State to track whether a request is currently in progress.
  const [loading, setLoading] = useState(false);

  /**
   * Displays an alert message with a specified type (e.g., success, error).
   * Automatically hides the alert after 5 seconds.
   *
   * @param {string} message - The message to display in the alert.
   * @param {string} type - The type of alert ('success' or 'error').
   */
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  /**
   * A helper function to make an HTTP request using Axios.
   * Handles common logic for showing alerts and updating states.
   *
   * @param {string} method - The HTTP method (get, post, put, delete).
   * @param {string} endpoint - The API endpoint to append to the base URL.
   * @param {object|null} payload - The request payload (for POST or PUT requests).
   */
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true); // Indicate that the request is in progress.
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data); // Update the state with the response data.
      showAlert("Request completed successfully", "success");
    } catch (err) {
      // Handle errors and display an alert with the error message.
      showAlert(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false); // Reset the loading state.
    }
  };

  /**
   * Performs a GET request to the specified API endpoint.
   *
   * @param {string} endpoint - The API endpoint to fetch data from.
   */
  const get = async (endpoint) => makeRequest("get", endpoint);

  /**
   * Performs a POST request to the specified API endpoint with a payload.
   *
   * @param {string} endpoint - The API endpoint to send data to.
   * @param {object} payload - The data to include in the request body.
   */
  const post = async (endpoint, payload) =>
    makeRequest("post", endpoint, payload);

  /**
   * Performs a PUT request to the specified API endpoint with a payload.
   *
   * @param {string} endpoint - The API endpoint to update data at.
   * @param {object} payload - The data to include in the request body.
   */
  const update = async (endpoint, payload) =>
    makeRequest("put", endpoint, payload);

  /**
   * Performs a DELETE request to the specified API endpoint.
   *
   * @param {string} endpoint - The API endpoint to delete data from.
   */
  const remove = async (endpoint) => makeRequest("delete", endpoint);

  // Return the state variables and HTTP methods for external use.
  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
