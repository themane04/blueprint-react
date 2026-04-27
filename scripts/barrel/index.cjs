#!/usr/bin/env node
"use strict";

const { findDirectories } = require("./findDirectories.cjs");
const { checkBarrel } = require("./checkBarrel.cjs");
const { reporter } = require("./reporter.cjs");

const SRC_ROOT = require("path").resolve(__dirname, "../../src");

const directories = findDirectories(SRC_ROOT);
const results = directories.map(checkBarrel);
reporter(results);
