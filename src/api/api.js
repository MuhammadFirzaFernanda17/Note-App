// Endpoint API
export const API_ENDPOINT = 'https://notes-api.dicoding.dev/v2';

// Fungsi untuk menambah catatan baru ke API
export async function tambahCatatan(judul, deskripsi) {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: judul,
                body: deskripsi,
            }),
        });

        if (!response.ok) {
            throw new Error('Gagal menambahkan catatan.');
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Fungsi untuk mengambil semua catatan dari API
export async function ambilSemuaCatatan() {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes`, {
            method: 'GET',
        });
        const responseData = await response.json();
        return responseData.data || [];
    } catch (error) {
        console.error('Error saat mengambil catatan:', error);
        throw error;
    }
}

// Fungsi untuk mengambil detail catatan berdasarkan ID dari API
export async function ambilDetailCatatan(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes/${id}`, {
            method: 'GET',
        });
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error saat mengambil detail catatan:', error);
        throw error;
    }
}

// Fungsi untuk mengarsipkan catatan berdasarkan ID dari API
export async function arsipkanCatatan(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes/${id}/archive`, {
            method: 'POST',
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error saat mengarsipkan catatan:', error);
        throw error;
    }
}

// Fungsi untuk mengeluarkan catatan dari arsip berdasarkan ID dari API
export async function keluarkanDariArsip(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes/${id}/unarchive`, {
            method: 'POST',
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error saat mengeluarkan dari arsip catatan:', error);
        throw error;
    }
}

// Fungsi untuk menghapus catatan berdasarkan ID dari API
export async function hapusCatatan(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/notes/${id}`, {
            method: 'DELETE',
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error saat menghapus catatan:', error);
        throw error;
    }
}
