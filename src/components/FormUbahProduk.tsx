import { useEffect, useRef, useState } from "react";
import type { Produk, UpdateProdukInput } from "../types";

interface FormUbahProdukProps {
  produk: Produk;
  sedangMenyimpan: boolean;
  onSimpan: (id: number, data: UpdateProdukInput) => Promise<void>;
  onBatal: () => void;
}

const kategoriList = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Aksesoris",
  "Audio",
  "Kamera",
];

function FormUbahProduk({
  produk,
  sedangMenyimpan,
  onSimpan,
  onBatal,
}: FormUbahProdukProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [nama, setNama] = useState(produk.nama);
  const [harga, setHarga] = useState(String(produk.harga));
  const [kategori, setKategori] = useState(produk.kategori);
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nama.trim() || !harga || !deskripsi.trim()) {
      setPesanError("Mohon lengkapi semua field.");
      return;
    }

    setPesanError(null);

    try {
      await onSimpan(produk.id, {
        nama: nama.trim(),
        harga: Number(harga),
        kategori,
        deskripsi: deskripsi.trim(),
      });
      onBatal();
    } catch (error) {
      setPesanError(
        error instanceof Error ? error.message : "Gagal menyimpan perubahan.",
      );
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="judul-ubah-produk"
      className="m-auto max-h-[calc(100vh-2rem)] w-[min(36rem,calc(100vw-2rem))] overflow-y-auto rounded-md border border-stone-200 bg-white p-0 text-stone-900 shadow-xl backdrop:bg-stone-900/40"
      onCancel={(e) => {
        e.preventDefault();
        if (!sedangMenyimpan) {
          onBatal();
        }
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current && !sedangMenyimpan) {
          onBatal();
        }
      }}
    >
      <form className="p-5" onSubmit={handleSubmit}>
        <h2 id="judul-ubah-produk" className="text-lg font-semibold mb-4">
          Ubah Produk
        </h2>

        {pesanError && (
          <p
            role="alert"
            className="mb-3 rounded border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-900"
          >
            {pesanError}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="ubah-nama" className="text-sm font-semibold text-stone-700">
              Nama Produk
            </label>
            <input
              id="ubah-nama"
              type="text"
              className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              disabled={sedangMenyimpan}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ubah-harga" className="text-sm font-semibold text-stone-700">
              Harga (Rp)
            </label>
            <input
              id="ubah-harga"
              type="number"
              min="0"
              className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              disabled={sedangMenyimpan}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ubah-kategori" className="text-sm font-semibold text-stone-700">
              Kategori
            </label>
            <select
              id="ubah-kategori"
              className="px-3 py-2 border border-stone-300 rounded text-sm cursor-pointer hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              disabled={sedangMenyimpan}
            >
              {kategoriList.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 col-span-2 max-sm:col-span-1">
            <label htmlFor="ubah-deskripsi" className="text-sm font-semibold text-stone-700">
              Deskripsi
            </label>
            <textarea
              id="ubah-deskripsi"
              rows={3}
              className="px-3 py-2 border border-stone-300 rounded text-sm hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-1 resize-y"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              disabled={sedangMenyimpan}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onBatal}
            disabled={sedangMenyimpan}
            className="rounded border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 cursor-pointer hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-stone-500 focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:text-stone-400"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={sedangMenyimpan}
            className="rounded bg-emerald-800 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-emerald-900 active:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-emerald-800 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {sedangMenyimpan ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default FormUbahProduk;
