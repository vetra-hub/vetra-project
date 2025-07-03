import axios from 'axios';

const API_URL = "https://fyaxzdmlnubbwspnlrvp.supabase.co/rest/v1/Penjualan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5YXh6ZG1sbnViYndzcG5scnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Njg1MjQsImV4cCI6MjA2NTQ0NDUyNH0.tNcfZYkpUK40gfCaEPZ1I-P7SXd1qiUq1q6JF-s5TIU";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const penjualanAPI = {
  async fetchPenjualan() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createPenjualan(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deletePenjualan(noStruk) {
    const url = `${API_URL}?noStruk=eq.${noStruk}`;
    const response = await axios.delete(url, { headers });
    return response.data;
  }
};
