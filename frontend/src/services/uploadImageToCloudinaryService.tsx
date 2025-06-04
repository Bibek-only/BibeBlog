import axios from "axios";

export default async function uploadToCloudinaryService(){
    const data = new FormData();
    data.append("file","image");
    data.append("upload_preset","bibeblog");
    data.append("cloud_name","di54cxy5v");
    axios.post("https://")

}