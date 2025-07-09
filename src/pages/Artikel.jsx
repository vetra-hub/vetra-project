import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { article } from "../services/artikel";

const Artikel = () => {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    link_url: "",
    gambar: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const data = await article.fetchArticles();
    setDataArtikel(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, gambar: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await article.updateArticle(editingId, formData);
    } else {
      const newData = {
        ...formData,
        created_at: new Date().toISOString(),
      };
      await article.createArticle(newData);
    }

    setFormData({ judul: "", link_url: "", gambar: "" });
    setEditingId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setFormData({
      judul: item.judul,
      link_url: item.link_url,
      gambar: item.gambar,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await article.deleteArticle(id);
    fetchData();
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Artikel" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ judul: "", link_url: "", gambar: "" });
            setEditingId(null);
          }}
          className="btn bg-[#00d69e] hover:bg-[#00bd8d] text-white"
        >
          {showForm ? "Tutup Form" : "Tambah Artikel"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-3xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-blue-700 mb-4">
              {editingId ? "Edit Artikel" : "Form Tambah Artikel"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Judul Artikel</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Link URL</span>
                </label>
                <input
                  type="url"
                  name="link_url"
                  value={formData.link_url}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Gambar</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="gambar"
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                />
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

      {dataArtikel.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Data Artikel</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Judul</th>
                  <th>Link</th>
                  <th>Gambar</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataArtikel.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.judul}</td>
                    <td>
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        Buka Link
                      </a>
                    </td>
                    <td>
                      {item.gambar && (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>
                        <FiEdit className="text-white" />
                      </button>
                      <button className="btn btn-sm btn-error" onClick={() => handleDelete(item.id)}>
                        <FiTrash2 className="text-white" />
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

export default Artikel;
