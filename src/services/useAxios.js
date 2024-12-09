import { useState } from "react";
import axios from "axios";

const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
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
