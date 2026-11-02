import KartuProduk from "./KartuProduk";
import type { Produk } from "../types";

interface DaftarProdukProps {
  produkList: Produk[];
  onHapus: (id: number) => void;
}

function DaftarProduk({ produkList, onHapus }: DaftarProdukProps) {
  if (produkList.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Daftar Produk</h2>
        <div className="bg-white rounded-md border border-stone-200 py-10 px-5 text-center">
          <p className="text-stone-500 mb-1">Belum ada data Produk</p>
          <p className="text-sm text-stone-400">
            Gunakan form di atas untuk menambahkan produk pertama Anda.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Daftar Produk</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 max-sm:grid-cols-1">
        {produkList.map((produk) => (
          <KartuProduk key={produk.id} produk={produk} onHapus={onHapus} />
        ))}
      </div>
    </section>
  );
}

export default DaftarProduk;
