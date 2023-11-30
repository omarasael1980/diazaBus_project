const generarId = ()=>{
    //This method returns  a complex random number plus complex datetime
 const randomNumber =Math.random().toString(32).substring(2)
 const date = Date.now().toString(32)
return randomNumber+date
}
export default generarId