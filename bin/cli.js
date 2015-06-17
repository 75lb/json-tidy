#!/usr/bin/env node
"use strict";
var tr = require("transform-tools");
var domain = require("domain");
var ansi = require("ansi-escape-sequences");

function tidy(json){
    return JSON.stringify(json, null, "  ") + "\n";
}

function halt(err){
    console.error(ansi.format(err.message, "red"));
    console.error(ansi.format("Input", [ "underline", "red" ]));
    console.error(ansi.format(err.input, "red"));
    process.exit(1);
}

var d = domain.create();
d.on("error", halt);
d.run(function(){
    process.stdin
        .pipe(tr.collectJson({ through: tidy }))
        .pipe(process.stdout);
});
