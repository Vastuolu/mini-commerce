import { useState } from "react";
import type { Produk } from "../types";

interface FormTambahProdukProps {
  onTambahProduk: (produk: Produk) => void;
}

function FormTambahProduk({ onTambahProduk }: FormTambahProdukProps) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("Smartphone");
  const [deskripsi, setDeskripsi] = useState("");

  const kategoriList = [
    "Smartphone",
    "Laptop",
    "Tablet",
    "Aksesoris",
    "Audio",
    "Kamera",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nama.trim() || !harga || !deskripsi.trim()) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    const produkBaru: Produk = {
      id: Date.now(),
      nama: nama.trim(),
      harga: Number(harga),
      kategori,
      deskripsi: deskripsi.trim(),
    };

    onTambahProduk(produkBaru);

    setNama("");
    setHarga("");
    setKategori("Smartphone");
    setDeskripsi("");
  };

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-3">Tambah Produk Baru</h2>
      <form
        className="bg-white rounded-md border border-stone-200 shadow-sm p-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nama" className="text-sm font-semibold text-stone-700">
            Nama Produk
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Contoh: Samsung Galaxy S24"
            className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="harga" className="text-sm font-semibold text-stone-700">
            Harga (Rp)
          </label>
          <input
            id="harga"
            type="number"
            placeholder="Contoh: 12500000"
            min="0"
            className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="kategori" className="text-sm font-semibold text-stone-700">
            Kategori
          </label>
          <select
            id="kategori"
            className="px-3 py-2 border border-stone-300 rounded text-sm cursor-pointer hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            {kategoriList.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-2 max-sm:col-span-1">
          <label htmlFor="deskripsi" className="text-sm font-semibold text-stone-700">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            placeholder="Deskripsi singkat produk..."
            rows={3}
            className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1 resize-y"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="col-span-2 max-sm:col-span-1 bg-emerald-800 text-white py-2.5 rounded text-sm font-semibold cursor-pointer hover:bg-emerald-900 active:bg-emerald-950 min-h-[44px] focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-2"
        >
          Tambah Produk
        </button>
      </form>
    </section>
  );
}

export default FormTambahProduk;
