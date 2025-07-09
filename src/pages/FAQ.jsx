import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { faq } from "../services/faq";

const FAQ = () => {
  const [dataFaq, setDataFaq] = useState([]);
  const [formData, setFormData] = useState({ pertanyaan: "", jawaban: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await faq.fetchFaq();
      setDataFaq(data);
    } catch (error) {
      console.error("Gagal mengambil data FAQ:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await faq.updateFaq(editingId, formData);
      } else {
        const newData = {
          ...formData,
          created_at: new Date().toISOString(),
        };
        await faq.createFaq(newData);
      }
      setFormData({ pertanyaan: "", jawaban: "" });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data FAQ:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ pertanyaan: item.pertanyaan, jawaban: item.jawaban });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await faq.deleteFaq(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus FAQ:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="FAQ" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({ pertanyaan: "", jawaban: "" });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className={`btn ${showForm ? "btn-error" : "btn-success"} text-white`}
        >
          {showForm ? (
            <>
              <FiX className="mr-2" /> Tutup Form
            </>
          ) : (
            <>
              <FiPlus className="mr-2" /> Tambah Data
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-3xl bg-white shadow-xl mx-auto mb-6 animate-fade-in">
          <div className="card-body">
            <h2 className="card-title justify-center text-blue-700 mb-4">
              {editingId ? "Edit FAQ" : "Form Tambah FAQ"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Pertanyaan</span>
                </label>
                <input
                  type="text"
                  name="pertanyaan"
                  value={formData.pertanyaan}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Jawaban</span>
                </label>
                <textarea
                  name="jawaban"
                  value={formData.jawaban}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="card-actions justify-center mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  {editingId ? "Simpan Perubahan" : "Tambah Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {dataFaq.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Data FAQ</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow animate-fade-in">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Pertanyaan</th>
                  <th>Jawaban</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataFaq.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="font-medium">{item.pertanyaan}</td>
                    <td className="whitespace-pre-line text-sm text-gray-700">
                      {item.jawaban}
                    </td>
                    <td className="text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => handleEdit(item)}
                      >
                        <FiEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FiTrash2 className="mr-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FAQ;
