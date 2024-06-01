import './compound/popup-box.js';
import './compound/wrap.js';

document.addEventListener('DOMContentLoaded', function () {
    const wrap = document.querySelector('.wrap');
    const popupBox = document.querySelector('.popup-box');
    const addNoteButton = document.querySelector('.add-box');
    const closeButton = document.querySelector('.close');
    const tambahCatatanButton = document.getElementById('tambah-catatan');
    const judulInput = document.getElementById('judul');
    const deskripsiInput = document.getElementById('deskripsi');
    const simpanButton = document.getElementById('simpan-edit');

    loadNotesFromStorage();

    judulInput.addEventListener('input', function () {
        const judul = judulInput.value.trim();
        const judulError = document.getElementById('judul-error');
        const formattedJudul = formatJudul(judul);

        if (judul.length === 0 || judul.length > 36) {
            judulError.textContent = 'Judul harus diisi dan maksimal 36 karakter.';
        } else {
            judulError.textContent = '';
        }
        judulInput.value = formattedJudul;
    });

    deskripsiInput.addEventListener('input', function () {
        let deskripsi = deskripsiInput.value.trim();
        const deskripsiError = document.getElementById('deskripsi-error');
        const formattedDeskripsi = formatDeskripsi(deskripsi);

        if (deskripsi.length > 180) {
            deskripsi = deskripsi.substring(0, 180);
            deskripsiInput.value = deskripsi;
        }

        if (deskripsi.length === 0 || deskripsi.length > 180) {
            deskripsiError.textContent = 'Deskripsi harus diisi dan maksimal 180 karakter.';
        } else {
            deskripsiError.textContent = '';
        }

        deskripsiInput.value = formattedDeskripsi;
    });

    function formatJudul(judul) {
        let formattedJudul = '';
        let currentLineLength = 0;
    
        for (let i = 0; i < judul.length; i++) {
            formattedJudul += judul[i];
            currentLineLength++;
    
            if (currentLineLength === 18) {
                formattedJudul += '\n';
            } else if (currentLineLength === 36) {
                formattedJudul += '\n';
                currentLineLength = 0;
            }
        }
    
        return formattedJudul;
    }
    
    function formatDeskripsi(deskripsi) {
        let formattedDeskripsi = '';
        for (let i = 0; i < deskripsi.length; i++) {
            formattedDeskripsi += deskripsi[i];
            if ((i + 1) % 33 === 0 && i !== 0) {
                formattedDeskripsi += '\n';
            }
        }
        return formattedDeskripsi;
    }

    addNoteButton.addEventListener('click', function () {
        popupBox.style.display = 'block';
        judulInput.value = '';
        deskripsiInput.value = '';
    });

    closeButton.addEventListener('click', function () {
        popupBox.style.display = 'none';
    });

    addNoteButton.addEventListener('click', function () {
        popupBox.style.display = 'block';
        judulInput.value = '';
        deskripsiInput.value = '';
    });

    closeButton.addEventListener('click', function () {
        popupBox.style.display = 'none';
    });

    tambahCatatanButton.addEventListener('click', function () {
    const judul = judulInput.value.trim();
    const deskripsi = deskripsiInput.value.trim();
    const judulError = document.getElementById('judul-error');
    const deskripsiError = document.getElementById('deskripsi-error');

    if (judul.length === 0 || judul.length > 18) {
        judulError.textContent = 'Judul harus diisi dan maksimal 18 karakter.';
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

    const note = createNoteElement(judul, deskripsi);
    wrap.appendChild(note);

    saveNoteToStorage(judul, deskripsi);

    popupBox.style.display = 'none';
    });

  wrap.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const parentNote = event.target.closest('.note');
        const judul = parentNote.getAttribute('data-judul');
        const deskripsi = parentNote.getAttribute('data-deskripsi');

        const editPopup = document.querySelector('.edit-popup');
        editPopup.style.display = 'block';

        document.getElementById('edit-judul').value = judul;
        document.getElementById('edit-deskripsi').value = deskripsi;

        const simpanButton = document.getElementById('simpan-edit');
        simpanButton.addEventListener('click', function () {
            const editedJudul = document.getElementById('edit-judul').value.trim();
            const editedDeskripsi = document.getElementById('edit-deskripsi').value.trim();


            const editJudulError = document.getElementById('edit-judul-error');
            if (editedJudul.length === 0 || editedJudul.length > 18) {
                editJudulError.textContent = 'Judul harus diisi dan maksimal 18 karakter.';
                return;
            } else {
                editJudulError.textContent = '';
            } 

            const editDeskripsiError = document.getElementById('edit-deskripsi-error');
            if (editedDeskripsi.length === 0 || editedDeskripsi.length > 180) {
                editDeskripsiError.textContent = 'Deskripsi harus diisi dan maksimal 180 karakter.';
                return;
            } else {
                editDeskripsiError.textContent = '';
            }
            
            parentNote.querySelector('.details p').textContent = editedJudul;
            parentNote.querySelector('.details span').textContent = editedDeskripsi;
            parentNote.setAttribute('data-judul', editedJudul);
            parentNote.setAttribute('data-deskripsi', editedDeskripsi);
            editPopup.style.display = 'none';

            updateNoteInStorage(judul, editedJudul, editedDeskripsi);

            judul = editedJudul;
            deskripsi = editedDeskripsi;
        });

        const closeEditButton = editPopup.querySelector('.close');
        closeEditButton.addEventListener('click', function () {
            editPopup.style.display = 'none';
        });
    }
    });

    wrap.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const parentNote = event.target.closest('.note');
            const judul = parentNote.getAttribute('data-judul');

            const deletePopup = document.querySelector('.delete-popup');
            deletePopup.style.display = 'block';

            document.getElementById('hapus-judul').textContent = judul;

            const hapusButton = document.getElementById('hapus-catatan');
            hapusButton.addEventListener('click', function () {
                deleteNoteFromStorage(judul);
                parentNote.remove();
                deletePopup.style.display = 'none';
            });
        }
    });

    function createNoteElement(judul, deskripsi) {
        const li = document.createElement('li');
        li.classList.add('note');
        li.setAttribute('data-judul', judul);
        li.setAttribute('data-deskripsi', deskripsi);

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
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('id-ID', options);
    }

    function saveNoteToStorage(judul, deskripsi) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ judul: judul, deskripsi: deskripsi });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotesFromStorage() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const noteElement = createNoteElement(note.judul, note.deskripsi);
            wrap.appendChild(noteElement);
        });
    }

    function deleteNoteFromStorage(judul) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(function (note) {
            return note.judul !== judul;
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function updateNoteInStorage(oldJudul, newJudul, newDeskripsi) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.map(function (note) {
            if (note.judul === oldJudul) {
                note.judul = newJudul;
                note.deskripsi = newDeskripsi;
            }
            return note;
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    });
