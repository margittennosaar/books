import { useState } from "react";
import axios from "axios";

const useAxios = (baseUrl) => {
  const [data, setData] = useState(
    []
  ); /* previously it was null  and i gave it empty array and those data from json file comes here. and i can take data from here in books.jsx, for that we have use map to get individual data */

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert("Book added successfully", "success");
    } catch (err) {
      showAlert(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const get = async (endpoint) => makeRequest("get", endpoint);
  const post = async (endpoint, payload) =>
    makeRequest("post", endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest("put", endpoint, payload);
  const remove = async (endpoint) => makeRequest("delete", endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
