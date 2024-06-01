class Wrap extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="wrap">
            <li class="add-box">
                <div class="add">
                    <i class="plus material-symbols-outlined">add</i>
                </div>
                <p>Tambah Catatan Baru</p>
            </li>
        </div>
        `;
        const wrapStyles = `
        .wrap {
            list-style-type: none;
            margin: 60px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 275px);
            gap: 10px;
        }
        
        .wrap li {
            position: relative;
            background-color: white;
            list-style:none;
            border-radius: 5px;
            padding: 15px 20px 20px;
            height: 250px;
        }
        
        .add-box, .add {
            align-items: center;
            flex-direction: column;
            justify-content: center;
            display: flex;
        }
        
        .add {
            position: relative;
            height: 85px;
            width: 85px;
            color: #7AA2E3;
            font-size: 65px;
            border-radius: 50%;
            border: 5px #7AA2E3 dashed;
        }
        
        .add:hover {
            cursor: pointer;
        }
        
        .add:hover::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            width: 100%;
            height: 100%;
            border: 5px #7AA2E3 dashed;
            border-radius: 50%;
            animation: spin 5s linear infinite;
        }
        
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @media only screen and (max-width: 768px) {
            .wrap {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 5px;
                margin: 10px;
            }
        
            .wrap li {
                height: auto;
            }
        
            .add-box {
                margin: 10px;
            }
        }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = wrapStyles;
        document.head.appendChild(styleElement);
    }
}
customElements.define('wrap-box', Wrap);
