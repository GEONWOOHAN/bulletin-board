import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.articles = req.session.articles;
    next();
};

export const imageUpload = multer({
    dest: "uploads/images/",
    limits: {
        fileSize: 5000000,
    },
});