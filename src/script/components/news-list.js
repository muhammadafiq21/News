import "./news-item.js";

class NewsList extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: "open" });
    }

    set articles(articles) {
        this._articles = articles;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = "";

        this._articles.forEach((article) => {
            const newsItemElement = document.createElement("news-item");
            newsItemElement.news = article;
            this.shadowDOM.appendChild(newsItemElement);
        });
    }

    renderError(message) {
        this.shadowDOM.innerHTML = `
            <style>
                .placeholder {
                    font-weight: lighter;
                    color: #9e9e9e;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            </style>
        `;

        this.shadowDOM.innerHTML += `<p class="placeholder">${message}</p>`;
    }
}

customElements.define("news-list", NewsList);
