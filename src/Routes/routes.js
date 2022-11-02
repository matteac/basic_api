const path = require("path");
const express = require("express");
const router = express.Router();
const Post = require(path.join(__dirname, "..", "Models", "Post.js"));

router.post("/posts", (req, res) => {
    Post.create(req.body)
        .then((post) => {
            res.json({
                created: true,
                resource: post,
            });
        })
        .catch((error) => {
            res.status(400);
            res.json({
                created: false,
                reason: "document title already exist",
            });
        });
});
router.delete("/posts/:postTitle", (req, res) => {
    if (!req.params.postTitle) {
        res.status(400);
        res.json({
            deleted: false,
            reason: "param title required",
        });
        return;
    }
    Post.deleteOne({ title: req.params.postTitle }).then((response) => {
        if (response.deletedCount == 0) {
            res.status(400);
            res.json({
                deleted: false,
                reason: "document doesn't exists",
            });
            return;
        } else if (response.deletedCount == 1) {
            res.json({
                deleted: true,
                reponse: response,
            });
            return;
        }
    });
});
router.get("/posts/:postTitle", (req, res) => {
    if (!req.params.postTitle) {
        res.status(404);
        res.json({
            error: 404,
            message: "Resource not found",
        });
        return;
    }

    Post.findOne({ title: req.params.postTitle })
        .then((post) => {
            if (post == null) {
                res.status(404);
                res.json({
                    error: 404,
                    message: "Resource not found",
                });
                return;
            } else {
                res.json(post);
            }
        })
        .catch((er) => {
            res.status(404);
            res.json({
                error: 404,
                message: "Resource not found",
            });
            return;
        });
});
router.put("/posts", (req, res) => {
    if (!req.body.old || !req.body.new) {
        res.status(400);
        res.json({
            updated: false,
            reason: "params not given",
        });
        return;
    }
    if (
        Object.keys(req.body.old).length == 0 ||
        Object.keys(req.body.new).length == 0
    ) {
        res.status(400);
        res.json({
            updated: false,
            reason: "params not given",
        });
        return;
    }

    Post.findOne(req.body.old)
        .then((post) => {
            if (post == null) {
                res.status(404);
                res.json({
                    updated: false,
                    reason: "old document doesn't exists",
                });
                return;
            }
            Post.updateOne(req.body.old, req.body.new)
                .then((response) => {
                    if (response.modifiedCount == 0) {
                        res.status(400);
                        res.json({
                            updated: false,
                            reason: "old and new document are the same",
                        });
                        return;
                    }
                    res.json({
                        updated: true,
                        response: response,
                    });
                })
                .catch((err) => {
                    res.status(400);
                    res.json({
                        updated: false,
                        reason: "new document already exist",
                    });
                });
        })
        .catch((error) => {
            res.status(500);
            res.json({
                updated: false,
                reason: error,
            });
        })
        .catch((err) => {
            res.status(500);
            res.json({
                error: err,
            });
        });
});

module.exports = router;
