const express = require('express');
const path = require('path');

const app = express();

// 본 미들웨어의 경우 `next()`가 없는 경우 다른 미들웨어들을 실행시키지 않음.
// 모든 미들웨어에서 실행해야하는 코드가 있는 경우 사용함.
// 함수를 여러 개 사용해도 사용할 수 있음.
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.setHeader(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.status(200).send('Hello.');
    res.json({ hello: 'hyunsang park ' });
});

app.post('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/about', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/category/javascript', (req, res) => {
    res.send('Hello, Javascript');
});

// wildcard는 다른 라우터보다 아래에 위치해야함.
app.get('/category/:name', (req, res) => {
    res.send('Hello, Wildcard');
});

// app.get('*', (req, res) => {
//     res.send('Hello, Everybody');
// })

// 404 처리 미들웨어
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// 에러 처리 미들웨어 ㅜ
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('오류 발생, 하지만 알려줄 수는 없음!');
});

app.listen(app.get('port'), () => {
    console.log('listing server on http://localhost:3000')
});