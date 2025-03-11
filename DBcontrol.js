const fs = require("fs")

async function writeFile(text,filename,path="./",encoding="utf-8"){
    try{
        const path2 = `${path}${filename}`
        fs.writeFileSync(path2,text,encoding)
        return true
    }catch(error){
        return error
    }
}
async function readFile(filename,path="./",encoding="utf-8") {
    try{
        const path2 = `${path}${filename}`
        return fs.readFileSync(path2,encoding)
    }catch(error){
        return error
    } 
}
module.exports = {writeFile, readFile}