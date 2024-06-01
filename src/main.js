import './compound/popup-box.js';
import './compound/wrap.js';
import './compound/search-bar.js';
import './loading/loading.js'
//import notesData from './data/dummy.js';
import { tambahCatatan, ambilSemuaCatatan, ambilCatatanTerarsipkan, 
    ambilDetailCatatan, arsipkanCatatan, keluarkanDariArsip, 
    hapusCatatan, validateJudul, validateDeskripsi, 
    ambilSemuaCatatanDummy, hapusCatatanDummy } from './api/api.js';

document.addEventListener('DOMContentLoaded', function () {
    const wrap = document.querySelector('.wrap');
    const popupBox = document.querySelector('.popup-box');
    const addNoteButton = document.querySelector('.add-box');
    const closeButton = document.querySelector('.close');
    const tambahCatatanButton = document.getElementById('tambah-catatan');
    const judulInput = document.getElementById('judul');
    const deskripsiInput = document.getElementById('deskripsi');
    const simpanButton = document.getElementById('simpan-edit');
 
    judulInput.addEventListener('input', function () {
        const judul = judulInput.value.trim();
        const judulError = document.getElementById('judul-error');

        if (judul.length === 0 || judul.length > 36) {
            judulError.textContent = 'Judul harus diisi dan maksimal 36 karakter.';
        } else {
            judulError.textContent = '';
        }
    });

    deskripsiInput.addEventListener('input', function () {
        let deskripsi = deskripsiInput.value.trim();
        const deskripsiError = document.getElementById('deskripsi-error');

        if (deskripsi.length > 180) {
            deskripsi = deskripsi.substring(0, 180);
            deskripsiInput.value = deskripsi;
        }

        if (deskripsi.length === 0 || deskripsi.length > 180) {
            deskripsiError.textContent = 'Deskripsi harus diisi dan maksimal 180 karakter.';
        } else {
            deskripsiError.textContent = '';
        }
    });

    addNoteButton.addEventListener('click', function () {
        popupBox.style.display = 'block';
        judulInput.value = '';
        deskripsiInput.value = '';
    });

    closeButton.addEventListener('click', function () {
        popupBox.style.display = 'none';
    });

    tambahCatatanButton.addEventListener('click', async function () {
        const judul = judulInput.value.trim();
        const deskripsi = deskripsiInput.value.trim();
        const judulError = document.getElementById('judul-error');
        const deskripsiError = document.getElementById('deskripsi-error');
    
        if (judul.length === 0 || judul.length > 36) {
            judulError.textContent = 'Judul harus diisi dan maksimal 36 karakter.';
            return;
        } else {
            judulError.textContent = '';
        }
    
        if (deskripsi.length === 0 || deskripsi.length > 180) {
            deskripsiError.textContent = 'Deskripsi harus diisi dan maksimal 180 karakter.';
            return;
        } else {
            deskripsiError.textContent = '';
        }
    
        try {
            const noteElement = createNoteElement(judul, deskripsi);
            wrap.appendChild(noteElement);
    
            saveNoteToAPI(judul, deskripsi);
    
            popupBox.style.display = 'none';
        } catch (error) {
            console.error('Error:', error);
        }
    });    
  
    function showDeletePopup(judul) {
        const deletePopup = document.querySelector('.delete-popup');
        deletePopup.style.display = 'block';
        document.getElementById('hapus-judul').textContent = judul;
        
    }

    wrap.addEventListener('click', async function (event) {
        if (event.target.classList.contains('delete')) {
            const parentNote = event.target.closest('.note');
            const id = parentNote.getAttribute('data-id'); // Menggunakan data-id sebagai pengenal catatan
    
            const deletePopup = document.querySelector('.delete-popup');
            deletePopup.style.display = 'block';
    
            const judul = parentNote.getAttribute('data-judul');
            document.getElementById('hapus-judul').textContent = judul;
    
            const hapusButton = document.getElementById('hapus-catatan');
            hapusButton.addEventListener('click', async function () {
                try {
                    await hapusCatatan(id); // Memanggil fungsi hapusCatatan dengan id
                    parentNote.remove();
                    deletePopup.style.display = 'none';
                    console.log(`Catatan dengan ID '${id}' telah dihapus.`);
                } catch (error) {
                    console.error('Error saat menghapus catatan:', error);
                    // Handle error
                }
            });
    
            // Menambahkan event listener untuk tombol batal
            const batalButton = document.getElementById('batal-hapus');
            batalButton.addEventListener('click', function () {
                deletePopup.style.display = 'none';
            });
    
            // Menambahkan event listener untuk tombol silang
            const closeDeleteButton = deletePopup.querySelector('.close');
            closeDeleteButton.addEventListener('click', function () {
                deletePopup.style.display = 'none';
            });
        }
    });

    // Fungsi untuk menghapus catatan dari API berdasarkan ID
    async function deleteNoteFromAPI(judul) {
        try {
            const catatan = await ambilSemuaCatatan();
            console.log("Catatan yang diambil dari API:", catatan); 
            const noteToDelete = catatan.find(note => note.judul === judul);
            console.log("Catatan yang akan dihapus:", noteToDelete);
            if (noteToDelete) {
                await hapusCatatan(noteToDelete.id);
                console.log(`Catatan dengan judul '${judul}' telah dihapus.`);
            } else {
                console.error(`Catatan dengan judul '${judul}' tidak ditemukan.`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    function createNoteElement(judul, deskripsi, id) {
        const li = document.createElement('li');
        li.classList.add('note');
        li.setAttribute('data-judul', judul);
        li.setAttribute('data-deskripsi', deskripsi);
        li.setAttribute('data-id', id);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');

        const judulP = document.createElement('p');
        judulP.textContent = judul;

        const judulSpan = document.createElement('span');
        judulSpan.textContent = deskripsi;

        detailsDiv.appendChild(judulP);
        detailsDiv.appendChild(judulSpan);

        const bottomContentDiv = document.createElement('div');
        bottomContentDiv.classList.add('bottom-content');

        const tanggalSpan = document.createElement('span');
        tanggalSpan.textContent = getTodayDate();

        const settingDiv = document.createElement('div');
        settingDiv.classList.add('setting');

        const settingIcon = document.createElement('i');
        settingIcon.classList.add('material-symbols-outlined');
        settingIcon.textContent = 'settings';

        const menuSettingDiv = document.createElement('div');
        menuSettingDiv.classList.add('menu-setting');

        const editButton = document.createElement('button');
        editButton.classList.add('material-symbols-outlined', 'edit');
        editButton.textContent = 'edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('material-symbols-outlined', 'delete');
        deleteButton.textContent = 'delete';
        
        menuSettingDiv.appendChild(editButton);
        menuSettingDiv.appendChild(deleteButton);

        bottomContentDiv.appendChild(tanggalSpan);
        bottomContentDiv.appendChild(settingDiv);
        bottomContentDiv.appendChild(menuSettingDiv);

        li.appendChild(detailsDiv);
        li.appendChild(bottomContentDiv);

        return li;
    }

    function getTodayDate() {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        const dateString = today.toLocaleDateString('id-ID', {year: 'numeric', month: 'numeric', day: 'numeric' });
        const timeString = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        return `${dateString}\n${timeString}`;
    }

    async function saveNoteToAPI(judul, deskripsi) {
        try {
            const response = await tambahCatatan(judul, deskripsi);
            console.log(`Catatan baru dengan judul '${judul}' telah ditambahkan.`);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    async function loadNotesFromAPI() {
        try {
            const response = await ambilSemuaCatatan();
            console.log(response);
            if (response.length > 0) {
                response.forEach(note => {
                    const noteElement = createNoteElement(note.title, note.body, note.id);
                    wrap.appendChild(noteElement);
                });
            } else {
                console.error('Respons dari API kosong.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }  

    loadNotesFromAPI();
    showLoadingIndicator();
    
//Loading Indicator saat masuk
function showLoadingIndicator() {
    const loadingIndicator = document.createElement('loading-indicator');
    document.body.appendChild(loadingIndicator);
    document.querySelector('.wrap').style.display = 'none';

    setTimeout(() => {
        hideLoadingIndicator();
    }, 5000);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
    document.querySelector('.wrap').style.display = 'grid';
}

});