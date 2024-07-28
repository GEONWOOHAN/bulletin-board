let articles = [];

export const home = (req, res) => {
    return res.render("home", { pageTitle: "Bulltein Board", articles });
};

export const search = (req, res) => {
    const { keyword } = req.query;
    const regex = new RegExp(`${keyword}`, "i");
    if (keyword) {
        const articlesFind = articles.filter((article) => regex.test(article.title) == true);
        console.log(keyword, regex, articlesFind);
        return res.render("search", { pageTitle: "Bulltein Board", articlesFind });
    } else {
        return res.redirect("/");
    }

};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Bulltein Board Upload" });
};

export const postUpload = (req, res) => {
    const date = new Date();
    const { title, content } = req.body;
    let paths = [];
    for (let i = 0; i < req.files.length; i++) {
        paths.push(req.files[i].path);
    }
    const article = {
        title,
        content,
        id: Date.now(),
        date: `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`,
        file: {
            images: paths,
        },
        views: 0,
    };
    articles.push(article);
    req.session.articles = articles;
    return res.redirect("/");
};

export const seeArticle = (req, res) => {
    const id = req.params.id;
    let article = articles.filter((article) => article.id == id)[0];
    const index = articles.indexOf(article);
    article = {
        ...article,
        views: article.views + 1,
    };
    articles.splice(index, 1, article);
    req.session.articles = articles;
    res.render("see", { pageTitle: "Bulltein Board", article });
};

export const getEditArticle = (req, res) => {
    const id = req.params.id;
    let article = articles.filter((article) => article.id == id)[0];
    res.render("edit", { pageTitle: "Bulltein Board", article });
};

export const postEditArticle = (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    let article = articles.filter((article) => article.id == id)[0];
    const index = articles.indexOf(article);
    let paths = [];
    for (let i = 0; i < req.files.length; i++) {
        paths.push(req.files[i].path);
    }
    article = {
        ...article,
        title,
        content,
        file: {
            images: paths,
        },
    };
    articles.splice(index, 1, article);
    req.session.articles = articles;
    return res.redirect("/");
};

export const deleteArticle = (req, res) => {
    const id = req.params.id;
    articles = articles.filter((article) => article.id != id);
    req.session.articles = articles;
    return res.redirect("/");
};