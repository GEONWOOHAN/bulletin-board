let articles = req.session.articles;

function deleteImage(event) {
    event.preventDefault();
    const image = event.target.parentElement;
    image.remove();
    const id = event.target.parentElement.id;
    let article = articles.filter((article) => article.id == id)[0];
    const index = articles.indexOf(article);
    article = {
        ...article,
        file: {
            images: [],
        },
    };
    articles.splice(index, 1, article);
    req.session.articles = articles;
}

deleteImageBtn.addEventListener("click", deleteImage);