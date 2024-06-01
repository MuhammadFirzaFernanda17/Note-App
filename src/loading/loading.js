class LoadingIndicator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="loading-overlay">
                <div class="loader"></div>
            </div>
        `;

        const loadingStyles = `
            #loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }

            .loader {
                border: 16px solid #f3f3f3; /* Light grey */
                border-top: 16px solid #3498db; /* Blue */
                border-radius: 50%;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = loadingStyles;
        document.head.appendChild(styleElement);
    }
}

customElements.define('loading-indicator', LoadingIndicator);
