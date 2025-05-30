const fs=require("fs");
const datas="are vai birsti diye gumaite si"

fs.writeFileSync("./hamim.txt",datas)

const data=fs.readFileSync("./hamim.txt",{encoding:"utf-8"})
console.log("Kire Bilod",data)
console.log("llll")

fs.readFile("./hamim.txt",{encoding:"utf-8"},(err,data)=>{
if(err){
  console.log("file to error heee",err)
  return
}
console.log(data)
})

console.log("hsjds")
const data1="ki wo kako ki koren"

fs.writeFile("./hamim.txt",data1,(err)=>{
  console.log(err)
})

fs.readFile("./hamim.txt",{encoding:"utf-8"},(err,data)=>{
if(err){
  console.log("file to error heee",err)
  return
}
console.log(data)
})
console.log(data)