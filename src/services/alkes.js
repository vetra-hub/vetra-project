import axios from "axios";

const API_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1/alat_kesehatan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const alkes = {
  async fetchAlkes() {
    const response = await axios.get(
      API_URL + "?select=id,nama_alkes,stok_alkes,harga_alkes,gambar,created_at,kategori,deskripsi",
      { headers }
    );
    return response.data;
  },

  async createAlkes(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateAlkes(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
      headers,
    });
    return response.data;
  },

  async deleteAlkes(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },
};
