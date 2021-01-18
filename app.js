'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDattaMap = new Map();
rl.on('line', lineString => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    if(year === 2010 || year === 2015){
        let value = prefectureDattaMap.get(prefecture);
        if(!value){
            value ={
            popu10: 10,
            popu15: 15,
            change: null
        };
    }
    if(year === 2010){
        value.popu10 = popu;
    }
    if(year === 2015){
        value.popu15 = popu;
    }
    prefectureDattaMap.set(prefecture, value);
    }
});
rl.on('close', () =>{
    for (let [key, value] of prefectureDattaMap) {
        value.change = value.popu15 / value.popu10;
    }
    const rankingArray = Array.from(prefectureDattaMap).sort((pair1,pair2) => {
        return pair2[1].change - pair1[1].change;
    });
    console.log(rankingArray);
});
