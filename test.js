const test = require("node:test");
const assert = require("node:assert");

test("create post", async () => {
    let response = await fetch("http://localhost:2121/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "test_title",
            description: "test_desc",
        }),
    }).then(async (response) => {
        return await response;
    });
    assert.equal(response.status, 200);
});
test("create repeated post", async () => {
    let response = await fetch("http://localhost:2121/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "test_title",
            description: "test_desc",
        }),
    }).then(async (response) => {
        return await response;
    });
    assert.equal(response.status, 400);
});

test("update post", async (_) => {
    let response = await fetch("http://localhost:2121/posts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            old: {
                title: "test_title",
                description: "test_desc",
            },
            new: {
                title: "test_title_updated",
                description: "test_desc",
            },
        }),
    }).then(async (response) => {
        return await response.json();
    });
    assert.equal(response.updated, true);
});
test("update invalid post", async (_) => {
    let response = await fetch("http://localhost:2121/posts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            old: {
                title: "invalid post",
                description: "test_desc",
            },
            new: {
                title: "test_title_updated",
                description: "test_desc",
            },
        }),
    }).then(async (response) => {
        return await response.json();
    });
    assert.equal(response.updated, false);
});

test("get post", async (_) => {
    let response = await fetch(
        "http://localhost:2121/posts/test_title_updated",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (response) => {
        return await response;
    });
    assert.equal(response.status, 200);
});
test("get invalid post", async (_) => {
    let response = await fetch(
        "http://localhost:2121/posts/some_invalid_post",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (response) => {
        return await response;
    });
    assert.equal(response.status, 404);
});

test("delete post", async (_) => {
    let response = await fetch(
        "http://localhost:2121/posts/test_title_updated",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (response) => {
        return await response.json();
    });
    assert.equal(response.deleted, true);
});
test("delete invalid post", async (_) => {
    let response = await fetch(
        "http://localhost:2121/posts/some_invalid_post",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (response) => {
        return await response.json();
    });
    assert.equal(response.deleted, false);
});
