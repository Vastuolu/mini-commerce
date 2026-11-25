import type { Produk } from "../types";
import { formatRupiah } from "../utils/moneyFormat";

interface KartuProdukProps {
  produk: Produk;
  onUbah: (produk: Produk) => void;
  onHapus: (id: number) => void;
}

function KartuProduk({ produk, onUbah, onHapus }: KartuProdukProps) {

  return (
    <article className="bg-white rounded-md border border-stone-200 p-4 flex flex-col hover:border-stone-400">
      <div className="mb-2">
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm">
          {produk.kategori}
        </span>
      </div>
      <h3 className="text-sm font-bold text-stone-900 mb-1">{produk.nama}</h3>
      <p className="text-sm text-stone-500 flex-1 mb-3">{produk.deskripsi}</p>
      <div className="flex justify-between items-center border-t border-stone-100 pt-3">
        <span className="text-sm font-bold text-emerald-800">
          {formatRupiah(produk.harga)}
        </span>
        <div className="flex gap-2">
          <button
            className="border border-emerald-700 text-emerald-800 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer hover:bg-emerald-800 hover:text-white active:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
            onClick={() => onUbah(produk)}
          >
            Ubah
          </button>
          <button
            className="border border-orange-700 text-orange-700 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer hover:bg-orange-700 hover:text-white active:bg-orange-800 active:text-white focus-visible:outline-2 focus-visible:outline-orange-700 focus-visible:outline-offset-1"
            onClick={() => onHapus(produk.id)}
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  );
}

export default KartuProduk;
