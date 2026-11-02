interface HeaderProps {
  jumlahProduk: number;
}

function Header({ jumlahProduk }: HeaderProps) {
  return (
    <header className="bg-emerald-800 text-white px-6 py-5">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h1 className="text-xl font-bold tracking-tight">Mini Commerce</h1>
        <p className="text-sm text-emerald-200">Katalog Produk Elektronik</p>
        {jumlahProduk > 0 && (
          <span className="ml-auto text-sm text-emerald-200">
            {jumlahProduk} produk tersedia
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
