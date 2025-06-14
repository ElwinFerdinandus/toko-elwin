import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase setup
const supabase = createClient(
  "https://yakhuaplsfksdhoerubc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2h1YXBsc2Zrc2Rob2VydWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTExNjgsImV4cCI6MjA2NTQ2NzE2OH0.Ykfb5EP3zXM0BEUpRWw0vOIlr8NoJZpSTfB2GWUHZ1Y"
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
  <div class="card shadow-sm border-0 h-100">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h5 class="card-title mb-3">
          <i class="bi bi-box-seam text-primary"></i>
          <span class="text-dark fw-bold">${item.nama_barang}</span>
        </h5>
        <div class="row">
          <div class="col-6 mb-2">
            <span class="badge bg-success">
              <i class="bi bi-123"></i> Stok: ${item.stok}
            </span>
          </div>
          <div class="col-6 mb-2">
            <span class="badge bg-warning text-dark">
              <i class="bi bi-bounding-box-circles"></i> ${item.satuan}
            </span>
          </div>
          <div class="col-12 mt-2">
            <div class="text-muted small">
              <i class="bi bi-stickies"></i> ${item.deskripsi}
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <button class="btn btn-outline-danger btn-sm" onclick="deleteBarang(${item.id})">
          <i class="bi bi-trash"></i> Hapus
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
