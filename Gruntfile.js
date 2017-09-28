"use strict";

const grunt = require("grunt");
grunt.loadNpmTasks("grunt-aws-lambda");

grunt.initConfig({
    lambda_invoke: {default: {}},
    lambda_deploy: {
        default: {
            arn: "lambda arn",
            options: {
                region: "eu-west-1",
                timeout: 5,
                memory: 128
            }
        }
    },
    lambda_package: {default: {}}
});

grunt.registerTask("deploy", [
    "lambda_package",
    "lambda_deploy"
]);

grunt.registerTask("invoke", "lambda_invoke");
