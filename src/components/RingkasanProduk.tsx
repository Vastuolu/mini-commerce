import type { Produk } from "../types";
import { formatRupiah } from "../utils/moneyFormat";

interface RingkasanProdukProps {
  produkList: Produk[];
}

function RingkasanProduk({ produkList }: RingkasanProdukProps) {
  const jumlah = produkList.length;
  const totalHarga = produkList.reduce((acc, p) => acc + p.harga, 0);
  const rataRata = jumlah > 0 ? Math.round(totalHarga / jumlah) : 0;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Ringkasan Katalog</h2>
      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        <div className="bg-white rounded-md border border-stone-200 p-4 text-center">
          <span className="block text-xl font-bold text-emerald-800 mb-0.5">
            {jumlah}
          </span>
          <span className="text-xs text-stone-500">Total Produk</span>
        </div>
        <div className="bg-white rounded-md border border-stone-200 p-4 text-center">
          <span className="block text-xl font-bold text-emerald-800 mb-0.5">
            {formatRupiah(totalHarga)}
          </span>
          <span className="text-xs text-stone-500">Total Nilai</span>
        </div>
        <div className="bg-white rounded-md border border-stone-200 p-4 text-center">
          <span className="block text-xl font-bold text-emerald-800 mb-0.5">
            {formatRupiah(rataRata)}
          </span>
          <span className="text-xs text-stone-500">Rata-rata Harga</span>
        </div>
      </div>
    </section>
  );
}

export default RingkasanProduk;
