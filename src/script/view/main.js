import "../components/search-bar.js";
import "../components/news-list.js";

import config from "../../config/config.js"

const main = () => {
    const newsListElement = document.querySelector("news-list");
    const searchElement = document.querySelector("search-bar");
    const categoryElements = document.querySelectorAll(".filter-item");

    let category = document
        .querySelector(".filter-item.active")
        .getAttribute("data-value");
    let search = null;

    const getNews = async () => {
        try {
            let paramString = "";

            if (category) {
                paramString += `&category=${category}`;
            }

            if (search) {
                paramString += `&q=${search}`;
            }

            const result = await fetch(
                `https://newsapi.org/v2/top-headlines?country=id&pageSize=10${paramString}`,
                {
                    method: "GET",
                    headers: {
                        "X-Api-Key": config.news_api_key,
                    },
                }
            );

            const resultJson = await result.json();

            if (resultJson.status === "ok") {
                if (resultJson.totalResults) {
                    renderResult(resultJson.articles);
                } else {
                    fallbackResult(
                        `Tidak ada berita dengan kata kunci ${search} di kategori ${category}.`
                    );
                }
            } else {
                fallbackResult(resultJson.message);
            }
        } catch (error) {
            fallbackResult(error.message);
        }
    };

    const renderResult = (results) => {
        newsListElement.articles = results;
    };

    const fallbackResult = (message) => {
        newsListElement.renderError(message);
    };

    const onButtonSearchClicked = () => {
        search = searchElement.value;
        getNews();
    };

    const onFilterItemClicked = (e) => {
        document
            .querySelector(".filter-item.active")
            .classList.remove("active");

        e.target.classList.add("active");

        category = e.target.getAttribute("data-value");

        getNews();
    };

    searchElement.clickEvent = onButtonSearchClicked;

    categoryElements.forEach((item) => {
        item.addEventListener("click", onFilterItemClicked);
    });

    getNews();
};

export default main;
