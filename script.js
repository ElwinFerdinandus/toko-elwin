import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Inisialisasi Supabase
const supabase = createClient(
  "https://yakhuaplsfksdhoerubc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2h1YXBsc2Zrc2Rob2VydWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTExNjgsImV4cCI6MjA2NTQ2NzE2OH0.Ykfb5EP3zXM0BEUpRWw0vOIlr8NoJZpSTfB2GWUHZ1Y"
);

// Fungsi tambah data
async function tambahBarang() {
  const nama_barang = document.getElementById("nama_barang").value;
  const stok = document.getElementById("stok").value;
  const satuan = document.getElementById("satuan").value;
  const deskripsi = document.getElementById("deskripsi").value;

  if (!nama_barang || !stok || !satuan || !deskripsi) {
    return alert("Semua field harus diisi!");
  }

  const { error } = await supabase
    .from("barang")
    .insert([{ nama_barang, stok, satuan, deskripsi }]);

  if (error) return alert("Data gagal ditambahkan: " + error.message);

  alert("Data berhasil ditambahkan");
  clearForm();
  loadData();
}

// Fungsi hapus data
async function deleteBarang(id) {
  const konfirmasi = confirm("Yakin ingin menghapus barang ini?");
  if (!konfirmasi) return;

  const { error } = await supabase.from("barang").delete().eq("id", id);
  if (error) return alert("Gagal menghapus data: " + error.message);

  alert("Data berhasil dihapus");
  loadData();
}

// Fungsi tampilkan data
async function loadData() {
  const { data, error } = await supabase.from("barang").select("*");

  if (error) {
    alert("Gagal mengambil data: " + error.message);
    return;
  }

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <h5 class="card-title text-primary">
            <i class="bi bi-box-seam"></i> ${item.nama_barang}
          </h5>
          <p><strong>Stok:</strong> ${item.stok}</p>
          <p><strong>Satuan:</strong> ${item.satuan}</p>
          <p><strong>Deskripsi:</strong><br>${item.deskripsi}</p>
          <button class="btn btn-sm btn-danger mt-2" onclick="deleteBarang(${item.id})">
            <i class="bi bi-trash"></i> Hapus
          </button>
        </div>
      </div>
    `;

    list.appendChild(col);
  });
}

// Bersihkan form input
function clearForm() {
  document.getElementById("nama_barang").value = "";
  document.getElementById("stok").value = "";
  document.getElementById("satuan").value = "";
  document.getElementById("deskripsi").value = "";
}

// Ekspor fungsi agar bisa diakses di HTML
window.tambahBarang = tambahBarang;
window.deleteBarang = deleteBarang;

// Muat data saat pertama kali dibuka
loadData();
