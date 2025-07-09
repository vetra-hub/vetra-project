import axios from "axios";

const API_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1/pelanggan";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation", // penting agar Supabase kembalikan data hasil insert
};

export const pelanggan = {
  // Ambil semua data pelanggan
  async fetchPelanggan() {
    const response = await axios.get(
      `${API_URL}?select=id,nama,email,alamat,segmentasi,total_pembelian,phone,foto_profil`,
      { headers }
    );
    return response.data;
  },

  // Tambah pelanggan baru (pakai array of object)
  async createPelanggan(data) {
    try {
      const response = await axios.post(API_URL, [data], { headers });
      return response.data;
    } catch (error) {
      console.error("Gagal create pelanggan:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update data pelanggan
  async updatePelanggan(id, data) {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Gagal update pelanggan:", error.response?.data || error.message);
      throw error;
    }
  },

  // Hapus data pelanggan
  async deletePelanggan(id) {
    try {
      await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    } catch (error) {
      console.error("Gagal hapus pelanggan:", error.response?.data || error.message);
      throw error;
    }
  },
};
