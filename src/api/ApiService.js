import axios from 'axios';
import {BASE_URL} from '@env';

const ApiService = {
  createRequest: async (data, token) => {
    try {
      await axios.post(
        `${BASE_URL}/create`,
        {data: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchRequest: async userId => {
    return await axios.get(`${BASE_URL}/user/requests/${userId}`);
  },
  fetchUserRequests: async () => {
    try {
      return await axios.get(`${BASE_URL}/requests`);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        throw new Error(
          'Network error. Please check your internet connection.',
        );
      }
      throw new Error(error.message);
    }
  },
  createResponse: async (requestId, status) => {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  completeRequest: async (requestId, status, data) => {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status: status,
        data: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  readNotification: async notificationId => {
    try {
      await axios.put(`${BASE_URL}/notification/${notificationId}`);
    } catch (error) {}
  },
};

export default ApiService;
