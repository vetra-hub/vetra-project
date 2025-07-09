import axios from "axios";

const BASE_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
};

export const dashboardAPI = {
  async fetchPelanggan() {
    const res = await axios.get(`${BASE_URL}/pelanggan`, { headers });
    return res.data;
  },
  async fetchObat() {
    const res = await axios.get(`${BASE_URL}/daftar_obat`, { headers });
    return res.data;
  },
  async fetchAlkes() {
    const res = await axios.get(`${BASE_URL}/alat_kesehatan`, { headers });
    return res.data;
  },
  async fetchArtikel() {
    const res = await axios.get(`${BASE_URL}/artikel`, { headers });
    return res.data;
  },
  async fetchFaq() {
    const res = await axios.get(`${BASE_URL}/faq`, { headers });
    return res.data;
  },
};
