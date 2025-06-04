export default async function delay(){
    await new Promise((res)=>{
        setTimeout(()=>{
            res("resolved")
        },1500)
    })
}