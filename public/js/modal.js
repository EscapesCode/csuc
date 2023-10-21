const { response } = require("express");

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("myModal");
    const modalBtn = document.querySelectorAll(".modalBtn");
    const closeBtn = document.getElementsByClassName("close")[0];
    const judul = document.getElementById("judul");

    // Fungsi untuk membuka modal
    function openModal(content) {
        modal.style.display = "block";
        judul.textContent = content;
    }

    // Fungsi untuk menutup modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Event listener untuk tombol Buka Modal
    modalBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = btn.getAttribute('data-id')

            fetch(`/challange/get-data/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    openModal(data.title)
                })
                .catch((error) => {
                    console.error(error)
                })
        })

    });


    // Event listener untuk tombol Tutup (X)
    closeBtn.addEventListener("click", closeModal);

    // Event listener untuk menutup modal jika di luar area konten modal diklik
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            closeModal();
        }
    });


});
