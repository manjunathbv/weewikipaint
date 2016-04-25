/*global desc, task, jake, fail, complete */

"use strict";

task("default",["lint"]);

desc("Lint everthing");
task("lint",[],function(){
  var lint = require("./build/lint/lint_runner.js");

  var files = new jake.FileList();
  files.include("**/*.js");
  files.exclude("node_modules");
  //files.exclude("build");

  var globals ={
    describe: false,
    it: false,
    beforeEach: false,
    afterEach: false
  };

  var pass = lint.validateFileList(files.toArray(), nodeLintOptions(), globals);// || fail("Lint failed");
  if (!pass) fail("Lint failed");
});

function nodeLintOptions() {
  var options = {
    bitwise: true,
		curly: false,
		eqeqeq: true,
		forin: true,
		immed: true,
		latedef: false,
		newcap: true,
		noarg: true,
		noempty: true,
		nonew: true,
		regexp: true,
		undef: true,
		strict: true,
		globalstrict: true,     // "global" stricts are okay when using CommonJS modules
		trailing: true,
    node: true
  };
  return options;
}
