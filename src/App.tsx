import { useEffect, useState } from "react";
import Header from "./components/Header";
import RingkasanProduk from "./components/RingkasanProduk";
import FormTambahProduk from "./components/FormTambahProduk";
import FormUbahProduk from "./components/FormUbahProduk";
import DaftarProduk from "./components/DaftarProduk";
import type { Produk, ProdukInput, UpdateProdukInput } from "./types";
import { ambilProduk, hapusProduk, tambahProduk, ubahProduk } from "./api/produk";

function App() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [menyimpanEdit, setMenyimpanEdit] = useState(false);
  const [produkDiedit, setProdukDiedit] = useState<Produk | null>(null);
  const [pesanError, setPesanError] = useState<string | null>(null);

  useEffect(() => {
    let aktif = true;

    ambilProduk()
      .then((data) => {
        if (aktif) {
          setProdukList(data);
        }
      })
      .catch((error: unknown) => {
        if (aktif) {
          setPesanError(
            error instanceof Error ? error.message : "Gagal memuat produk.",
          );
        }
      })
      .finally(() => {
        if (aktif) {
          setMemuat(false);
        }
      });

    return () => {
      aktif = false;
    };
  }, []);

  const muatProduk = async () => {
    try {
      setProdukList(await ambilProduk());
      setPesanError(null);
    } catch (error) {
      setPesanError(error instanceof Error ? error.message : "Gagal memuat produk.");
    } finally {
      setMemuat(false);
    }
  };

  const handleCobaLagi = () => {
    setMemuat(true);
    setPesanError(null);
    void muatProduk();
  };

  const handleTambahProduk = async (produkBaru: ProdukInput) => {
    setMenyimpan(true);
    setPesanError(null);

    try {
      const produk = await tambahProduk(produkBaru);
      setProdukList((prev) => [produk, ...prev]);
      return true;
    } catch (error) {
      setPesanError(error instanceof Error ? error.message : "Gagal menambah produk.");
      return false;
    } finally {
      setMenyimpan(false);
    }
  };

  const handleUbahProduk = async (id: number, data: UpdateProdukInput) => {
    setMenyimpanEdit(true);
    setPesanError(null);

    try {
      const produkDiperbarui = await ubahProduk(id, data);
      setProdukList((prev) =>
        prev.map((produk) => (produk.id === id ? produkDiperbarui : produk)),
      );
    } finally {
      setMenyimpanEdit(false);
    }
  };

  const handleHapusProduk = async (id: number) => {
    if (!window.confirm("Hapus produk ini dari katalog?")) {
      return;
    }

    setPesanError(null);

    try {
      await hapusProduk(id);
      setProdukList((prev) => prev.filter((produk) => produk.id !== id));
    } catch (error) {
      setPesanError(error instanceof Error ? error.message : "Gagal menghapus produk.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Header jumlahProduk={produkList.length} />
      <main className="w-full px-6 py-8 flex-1">
        {pesanError && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center gap-3 rounded-md border border-orange-200 bg-orange-50 px-4 py-3"
          >
            <p className="flex-1 text-sm text-orange-900">{pesanError}</p>
            <button
              type="button"
              onClick={handleCobaLagi}
              className="rounded border border-orange-700 px-2.5 py-1 text-xs font-semibold text-orange-700 cursor-pointer hover:bg-orange-700 hover:text-white focus-visible:outline-2 focus-visible:outline-orange-700 focus-visible:outline-offset-1"
            >
              Coba lagi
            </button>
          </div>
        )}

        {memuat ? (
          <div className="rounded-md border border-stone-200 bg-white px-5 py-10 text-center text-sm text-stone-500">
            Memuat produk...
          </div>
        ) : (
          <>
            <RingkasanProduk produkList={produkList} />
            <FormTambahProduk
              onTambahProduk={handleTambahProduk}
              sedangMenyimpan={menyimpan}
            />
            <DaftarProduk
              produkList={produkList}
              onUbah={(produk) => setProdukDiedit(produk)}
              onHapus={handleHapusProduk}
            />
          </>
        )}
      </main>

      {produkDiedit && (
        <FormUbahProduk
          produk={produkDiedit}
          sedangMenyimpan={menyimpanEdit}
          onSimpan={handleUbahProduk}
          onBatal={() => setProdukDiedit(null)}
        />
      )}
    </div>
  );
}

export default App;
