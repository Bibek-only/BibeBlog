interface apiresponse {
    success:boolean;
    statusCode:number;
    message:string;
    data: object;
}
class apiresponse implements apiresponse {
    constructor(success:boolean=false,statusCode:number,message:string="",data:object={}){
        this.success = success,
        this.statusCode = statusCode,
        this.message = message,
        this.data=data
    }
}

export default apiresponse