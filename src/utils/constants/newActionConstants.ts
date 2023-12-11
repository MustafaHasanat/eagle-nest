const newActionConstants = {
    nestDependencies: [
        "@nestjs/config",
        "@nestjs/typeorm",
        "@nestjs/platform-express",
        "@nestjs/serve-static",
        "@nestjs/swagger",
        "class-validator",
        "class-transformer",
        "express-session",
        "typeorm",
        "mysql2 ",
        "pg",
        "uuid",
        "bcrypt",
        "fs",
    ],
    nestDevDependencies: ["@types/multer", "@types/bcrypt"],
};

export default newActionConstants;
