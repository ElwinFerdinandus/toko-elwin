import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://gfdkeutgojqefygoxnow.supabase.co",
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
  if (error) return alert("Data gagal diambil " + error.message);
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.nama_barang}</td>
        <td>${item.stok}</td>
        <td>${item.satuan}</td>
        <td>${item.deskripsi}</td>
      `;
    list.appendChild(row);
  });
}

window.tambahBarang = tambahBarang;
loadData();
