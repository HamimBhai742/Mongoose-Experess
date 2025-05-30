const EventEmmiter=require("node:events");

class UpobittiPaisi extends EventEmmiter{};

const upobittiPaisi =new UpobittiPaisi();

upobittiPaisi.on("message",(name)=>{
  console.log(`Mel gaya upobbiti, akhon chill hobe ${name}`)
})

upobittiPaisi.emit('message',"Hamim")