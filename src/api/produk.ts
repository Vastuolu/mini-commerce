import type { Produk, ProdukInput } from "../types";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error("Tidak dapat terhubung ke server API. Pastikan backend sudah berjalan.");
  }

  if (!response.ok) {
    let pesan = `Permintaan gagal (HTTP ${response.status}).`;

    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        pesan = data.message.join(", ");
      } else if (typeof data.message === "string") {
        pesan = data.message;
      }
    } catch {
      // Respons bukan JSON, pakai pesan default.
    }

    throw new Error(pesan);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function ambilProduk(): Promise<Produk[]> {
  return request<Produk[]>("/produk");
}

export function tambahProduk(data: ProdukInput): Promise<Produk> {
  return request<Produk>("/produk", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function hapusProduk(id: number): Promise<Produk> {
  return request<Produk>(`/produk/${id}`, { method: "DELETE" });
}
