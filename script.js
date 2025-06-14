import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase setup
const supabase = createClient(
  "https://yakhuaplsfksdhoerubc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

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

async function deleteBarang(id) {
  const confirmDelete = confirm("Yakin ingin menghapus barang ini?");
  if (!confirmDelete) return;

  const { error } = await supabase.from("barang").delete().eq("id", id);
  if (error) return alert("Gagal menghapus data: " + error.message);

  alert("Data berhasil dihapus");
  loadData();
}

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
    col.className = "col-md-6 mb-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title text-primary">
              <i class="bi bi-box-seam"></i> ${item.nama_barang}
            </h5>
            <p><strong>Stok:</strong> ${item.stok}</p>
            <p><strong>Satuan:</strong> ${item.satuan}</p>
            <p><strong>Deskripsi:</strong><br>${item.deskripsi}</p>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-danger mt-3" onclick="deleteBarang(${item.id})">
              <i class="bi bi-trash-fill"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    `;

    list.appendChild(col);
  });
}

function clearForm() {
  document.getElementById("nama_barang").value = "";
  document.getElementById("stok").value = "";
  document.getElementById("satuan").value = "";
  document.getElementById("deskripsi").value = "";
}

window.tambahBarang = tambahBarang;
window.deleteBarang = deleteBarang;
loadData();
