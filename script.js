import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://yakhuaplsfksdhoerubc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2h1YXBsc2Zrc2Rob2VydWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTExNjgsImV4cCI6MjA2NTQ2NzE2OH0.Ykfb5EP3zXM0BEUpRWw0vOIlr8NoJZpSTfB2GWUHZ1Y"
);

async function tambahBarang() {
  const nama_barang = document.getElementById("nama_barang").value;
  const stok = document.getElementById("stok").value;
  const satuan = document.getElementById("satuan").value;
  const deskripsi = document.getElementById("deskripsi").value;

  const { data, error } = await supabase
    .from("barang")
    .insert([{ nama_barang, stok, satuan, deskripsi }]);
  if (error) return alert("Data gagal ditambahkan " + error.message);
  alert("Data berhasil ditambahkan");
  loadData();
}

async function loadData() {
  const { data, error } = await supabase.from("barang").select("*");
  if (error) return alert("Data gagal diambil: " + error.message);

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    col.innerHTML = `
      <div class="card shadow h-100">
        <div class="card-body">
          <h5 class="card-title text-primary">
            <i class="bi bi-box-seam"></i> ${item.nama_barang}
          </h5>
          <ul class="list-unstyled mb-0">
            <li><strong>Stok:</strong> ${item.stok}</li>
            <li><strong>Satuan:</strong> ${item.satuan}</li>
            <li><strong>Deskripsi:</strong><br>${item.deskripsi}</li>
          </ul>
        </div>
      </div>
    `;

    list.appendChild(col);
  });
}


window.tambahBarang = tambahBarang;
loadData();
