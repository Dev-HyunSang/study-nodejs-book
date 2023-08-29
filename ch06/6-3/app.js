const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const multer = require('multer');

const app = express();
app.set('port', process.env.PORT || 3000);

// 미들웨어 간의 순서도 중요함. / 모든 미들웨어는 내부적으로 next()를 진행함.
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public'))); // 파일을 찾는 경우 next()를 호출하지 않는 경우도 있음.
app.use(cookieParser()); 
app.use(express.json());
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(path.join(__dirname, 'public')(req, res, next));
    } else {
        next();
    }
});
// Form submit 하는 경우 urlencoded를 사용해야 한다.
// => Form Data Parsing
// true면 qs, false면 querystring
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'hyunsang',
    cookie: {
        httpOnly: true,
    },
}));
app.use(multer().array());

// app.use('요청 경로', express.static('실제 경로'));
// localhost:3000/hyunsang.html → learn-express/public/hyunsang.html
// app.use('/', express.static(path.join(__dirname, 'public')));

const session = {};

app.get('/', (req,res, next) => {
    req.session.id = 'hello'; // Session의 개인의 요청 공간
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req,res) => {
    res.send('Hello, Express!');
});

app.get('/category/javascript', (req,res) => {
    res.send('Hello, JavaScript');
});

app.get('/category/:name', (req,res) => {
    res.send('Hello, Wildcard');
});

app.get('/about', (req,res) => {
    res.send('Hello, Express!');
});

app.use((req, res, next) => {
    res.status(200).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('Error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});