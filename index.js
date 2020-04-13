const fs = require("fs");

// https://stackoverflow.com/questions/30332959/memory-leak-in-node-regex-parser

function  loop(showBug) {

    let accum = [];

    while (true) {

        let xml = fs.readFileSync('./data.xml', 'utf8');  
        let json = Array.from(xml.matchAll(/<listener .*?>([\s\S]*?)<\/listener>/g));

         let first = json[0][1];
 
         if (showBug) accum.push(first);
            else 
                      accum.push(first.split('').join(''));

        let {rss,heapTotal,external} = process.memoryUsage();   

        let total = Math.round( (rss + heapTotal + external) / 1024 / 1024 );
        console.log(total +' MB');
    }

}
        
loop(true);
