class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                /* Styling untuk search bar */
                :host {
                    display: flex;
                    align-items: center; /* Memposisikan elemen secara vertikal di tengah */
                    justify-content: center; /* Memposisikan elemen secara horizontal di tengah */
                }
                input {
                    margin-right: 8px;
                    padding: 6px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    max-width: 200px;
                }
                button {
                    padding: 6px 12px;
                    border: none;
                    border-radius: 4px;
                    background-color: #007bff;
                    color: #fff;
                    cursor: pointer;
                }
            </style>
            <input type="text" placeholder="Cari..." id="searchInput">
            <button id="searchButton">Cari</button>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('searchButton').addEventListener('click', () => {
            const searchTerm = this.shadowRoot.getElementById('searchInput').value;
        });
    }
}
customElements.define('search-bar', SearchBar);
