import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://gfdkeutgojqefygoxnow.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZGtldXRnb2pxZWZ5Z294bm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjk5NDksImV4cCI6MjA2NTQwNTk0OX0.vWQ70YA7egXTLg8glagWKhhjmIqpohxByA5Vgnv_eMk"
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