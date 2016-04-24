/*global desc, task, jake, fail, complete */

"use strict";

task("default",["lint"]);

desc("Lint everthing");
task("lint",[],function(){
  var lint = require("./build/lint/lint_runner.js");

  var files = new jake.FileList();
  files.include("**/*.js");
  files.exclude("node_modules");
  files.exclude("build");

  var options = {
    node: true
  };

  var globals ={
    describe: false,
    it: false,
    beforeEach: false,
    afterEach: false
  };

  lint.validateFileList(files.toArray(), options, globals);
});
