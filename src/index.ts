import express from 'express'

const app = express()
const port = 3005

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)


// Здесь что-то вроде микро БД
const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation qa'},
        {id: 4, title: 'devops'},
    ]
}

// Здесь реализованы эндпоинты CRUD операций в соответсвии с REST API
app.get('/courses', (request, response) => {
    let foundCourses = db.courses;
    if (request.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(request.query.title as string) > -1)
    }

    response.json(foundCourses)
})
app.get('/courses/:id', (req, res) => {
    const foundCourse = db. courses.find(c => c.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    res.json(foundCourse)

})
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.CREATED_201)
        return;
    }

    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(createdCourse)
    res.status(201).json(createdCourse)
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);

    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    const foundCourse = db. courses.find(c => c.id === +req.params.id);
if (!foundCourse) {
    res.sendStatus(404)
    return;
}

    res.sendStatus(HTTP_STATUSES.NO_CONTENT)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

