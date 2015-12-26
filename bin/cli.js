#!/usr/bin/env node
'use strict'
var collectJson = require('collect-json')
var domain = require('domain')
var ansi = require('ansi-escape-sequences')

function tidy (json) {
  return JSON.stringify(json, null, '  ') + '\n'
}

function halt (err) {
  console.error(ansi.format(err.message, 'red'))
  process.exit(1)
}

var d = domain.create()
d.on('error', halt)
d.run(function () {
  process.stdin
    .pipe(collectJson(tidy))
    .pipe(process.stdout)
})
