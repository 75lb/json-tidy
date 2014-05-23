#!/usr/bin/env node
"use strict";

var Transform = require("stream").Transform,
    transform = new Transform(),
    inputBuffer = new Buffer(0);
    
transform._transform = function(chunk, enc, done){
    inputBuffer = Buffer.concat([ inputBuffer, chunk ]);
    done();
};
transform._flush = function(done){
    this.push(JSON.stringify(JSON.parse(inputBuffer.toString()), null, "  "));
    done();
};

process.stdin.pipe(transform).pipe(process.stdout);
