const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false, // 필수 (NotNull)
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false, // 필수 (NotNull)
                    defaultValue: ""
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Comment',
                tableName: 'Comment',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.Post);
    }
};
