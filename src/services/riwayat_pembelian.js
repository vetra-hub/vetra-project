// src/services/riwayat_pembelian.js
import axios from "axios";

const API_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1/riwayat_pembelian";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const riwayat_pembelian = {
  async fetchRiwayatPembelian() {
    const response = await axios.get(API_URL + "?select=*", { headers });
    return response.data;
  },

  async createRiwayatPembelian(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateRiwayatPembelian(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  async deleteRiwayatPembelian(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },
};
