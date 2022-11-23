class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.shadowDOM.querySelector("#search-input").value;
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                #search-container {
                    background-color: white;
                    padding: 15px;
                    border-radius: 12px;
                    box-shadow: 0 0 10px rgba(51, 51, 51, 0.15);
                    display: flex;
                    margin-bottom: 30px;
                }
                
                input {
                    font-size: 1rem;
                    padding: 10px 15px;
                    border: 1px solid #cfcfcf;
                    border-radius: 12px 0 0 12px;
                    width: 80%;
                }
                
                button {
                    color: #00db63 ;
                    background-color: #00db63;
                    margin: 0 auto;
                    border: none;
                    border-radius: 0 12px 12px 0;
                    width: 20%;
                }

                button:hover {
                    cursor: pointer;
                }
                
                img {
                    width: 18px;
                    height: auto;
                }
            </style>

            <div id="search-container">
                <input id="search-input" type="search" placeholder="Hot News" />
                <button id="search-button" type="submit">
                    <img src="./image//search.svg" alt="seach icon" />
                </button>
            </div>
        `;

        this.shadowDOM
            .querySelector("#search-button")
            .addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);
