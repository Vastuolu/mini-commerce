import { useState } from "react";
import Header from "./components/Header";
import RingkasanProduk from "./components/RingkasanProduk";
import FormTambahProduk from "./components/FormTambahProduk";
import DaftarProduk from "./components/DaftarProduk";
import type { Produk } from "./types";

const dataProdukAwal: Produk[] = [
  {
    id: 1,
    nama: "Samsung Galaxy S24 Ultra",
    harga: 19999000,
    kategori: "Smartphone",
    deskripsi: "Flagship Samsung dengan kamera 200MP dan S Pen built-in.",
  },
  {
    id: 2,
    nama: "MacBook Air M3",
    harga: 18499000,
    kategori: "Laptop",
    deskripsi: "Laptop tipis bertenaga chip Apple M3 dengan baterai 18 jam.",
  },
  {
    id: 3,
    nama: "Sony WH-1000XM5",
    harga: 4299000,
    kategori: "Audio",
    deskripsi:
      "Headphone wireless premium dengan noise cancelling terbaik di kelasnya.",
  },
  {
    id: 4,
    nama: "iPad Pro M4 11 inci",
    harga: 17999000,
    kategori: "Tablet",
    deskripsi: "Tablet profesional dengan layar OLED tandem dan chip M4.",
  },
  {
    id: 5,
    nama: "Logitech MX Master 3S",
    harga: 1499000,
    kategori: "Aksesoris",
    deskripsi:
      "Mouse ergonomis dengan scroll MagSpeed dan koneksi multi-device.",
  },
];

function App() {
  const [produkList, setProdukList] = useState<Produk[]>(dataProdukAwal);

  const handleTambahProduk = (produkBaru: Produk) => {
    setProdukList([...produkList, produkBaru]);
  };

  const handleHapusProduk = (id: number) => {
    setProdukList(produkList.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Header jumlahProduk={produkList.length} />
      <main className="w-full px-6 py-8 flex-1">
        <RingkasanProduk produkList={produkList} />
        <FormTambahProduk onTambahProduk={handleTambahProduk} />
        <DaftarProduk produkList={produkList} onHapus={handleHapusProduk} />
      </main>
    </div>
  );
}

export default App;
