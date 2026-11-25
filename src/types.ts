export interface Produk {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  deskripsi: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProdukInput = Omit<Produk, "id" | "createdAt" | "updatedAt">;
