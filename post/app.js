const express = require('express');
const app = express();
const port = 8082;
const { Post, Comment } = require('./models');
// 서버 실행시 table 생성
var sequelize = require('./models/index').sequelize;
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('데이터베이스에 연결되었습니다');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('ok');
});

// Post.create({
//     user_id: 10000,
//     title: 'test입니다.',
//     description: 'dafafdaf',
//     hit: 10,
//     area: '충청도',
// });

// Comment.create({
//     PostId: 1,
//     user_id: 10000,
//     content: 'casdfasfd',
// });

app.listen(port, () => {
    console.log(`Listenting: ${port}`);
});
