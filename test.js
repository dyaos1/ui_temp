"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataMapper_1 = require("./src/data/data2/dataMapper");
var the_data_json_1 = require("./src/data/data2/the_data.json");
var uch = new dataMapper_1.UnitCostHandler(the_data_json_1.default.data.세부사업.내역사업[0].과제, 2021, "신규");
console.log(uch.sbjtList);
uch.init();
console.log(uch.sbjtList);
