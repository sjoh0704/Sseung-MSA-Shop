'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
 
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false, // 필수 (NotNull)
        
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false, // 필수 (NotNull)

            }
        },
        {
            sequelize, //해당 부분에 db.sequelize 객체가 들어간다. 
            timestamps: true,  //true로 하면 createdAt과 updatedAt을 생성한다.
            underscored: false, //기본적으로 테이블명과 컬럼명을 CamelCase로 바꾸는데 snake case로 변경해준다
            modelName: "Comment", //모델 이름을 설정할 수있다
            tableName: "Comment", //기본적으로 모델이름을 소문자및 복수형으로 만드는데 모델이 User면 users가된다
            paranoid:false, // true로 설정하면 deletedAt 컬럼이 생긴다. 삭제시 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );
    Comment.associate = (db) => {
    };

    return Comment;
};
