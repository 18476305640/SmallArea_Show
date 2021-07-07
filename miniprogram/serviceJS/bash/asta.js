module.exports = function(as) {
    var strArray = as.match(/{[\s\S]*?}/gm);
    var parsed = [];
    for(var i=0; i<strArray.length; i++) {
        console.log(i,strArray[i] );
        parsed.push(JSON.parse(strArray[i]));
    }
    return parsed;
}

