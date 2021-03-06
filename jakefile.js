/*global desc, task, jake, fail, complete */

"use strict";

task("default",["lint", "test"]);

desc("Lint everthing");
task("lint",[],function(){
  var lint = require("./build/lint/lint_runner.js");

  var files = new jake.FileList();
  files.include("**/*.js");
  files.exclude("node_modules");
  files.exclude("build");

  var globals ={
    describe: false,
    it: false,
    beforeEach: false,
    afterEach: false
  };

  var pass = lint.validateFileList(files.toArray(), nodeLintOptions(), globals);// || fail("Lint failed");
  if (!pass) fail("Lint failed");
});

desc("Test everthing");
task("test", [], function(){
  var reporter = require("nodeunit").reporters["default"];
  reporter.run(['./src/server/_server_test.js'],null, function(failures){
    if (failures) fail("Tests failed");
    complete();
  });
}, {async: true});

desc("Integrate");
task("integrate", ["default"], function(){
  console.log("1. Make sure 'git status' is clean.");
  console.log("2. Build on the integration box.");
  console.log("   a. Walk over to integration box");
  console.log("   b. 'git pull'");
  console.log("   c. 'jake'");
  console.log("   d. If jake fails, stop! Try again after fixing the issue.");
  console.log("3. 'git checkout integration'");
  console.log("4. 'git merge master --no-ff --log'");
  console.log("5. 'git checkout master'");
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
