export default async function delay(){
    await new Promise((res,rej)=>{
        setTimeout(()=>{
            res("resolved")
        },1500)
    })
}