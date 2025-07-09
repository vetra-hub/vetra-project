import axios from "axios";

// Konfigurasi Supabase
const API_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1/testimoni";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // Agar Supabase merespons data yang dikirim balik
};

export const testimoni = {
  // Ambil semua testimoni
  async fetchTestimoni() {
    try {
      const response = await axios.get(
        `${API_URL}?select=id,pelanggan_id,quote,created_at,is_approved,rating`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch Testimoni Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Tambah testimoni baru
  async createTestimoni(data) {
    try {
      const response = await axios.post(API_URL, [data], { headers });
      return response.data;
    } catch (error) {
      console.error("Create Testimoni Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update testimoni berdasarkan ID
  async updateTestimoni(id, data) {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Update Testimoni Error:", error.response?.data || error.message);
      throw error;
    }
  },

  // Hapus testimoni berdasarkan ID
  async deleteTestimoni(id) {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch (error) {
      console.error("Delete Testimoni Error:", error.response?.data || error.message);
      throw error;
    }
  },
};
