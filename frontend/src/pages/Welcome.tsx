import { isLogedinAtom } from "../store/atom/isloginatom";
import { useEffect, } from 'react'
import {  useNavigate } from 'react-router-dom'
import Loader from '../skelitons/Loader'
import { useRecoilState, useRecoilStateLoadable} from "recoil";
import { enableClick, disableClick } from "../services/clickDesEnb";

import {logedinUserInfoAtom} from "../store/atom/userInfoAtom";

//animation import
import AOS from "aos";
import "aos/dist/aos.css";
import { getUserInfoService } from "../services/getUserInfoService";
import { loadingAtom } from "../store/atom/loadingAtom";
import delay from "../services/delay";

const Welcome = () => {
    const [logedinUserInfo,setLogedinUserInfo] = useRecoilStateLoadable(logedinUserInfoAtom);
    

    

    //animatio configuration
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in ms
          easing: "ease-out", // Easing function
          once: true, // Whether animation should happen only once
        });
      }, []);



    const [loading, setLoading] = useRecoilState(loadingAtom)

    const navigate = useNavigate();
    const [logedin,setIsLogedin] = useRecoilState(isLogedinAtom);


    useEffect(()=>{
        if(localStorage.getItem("token")){
            setIsLogedin(true)
            
            //based on conditaion set the userinfo
            if(logedinUserInfo.state === "hasValue" && logedinUserInfo.contents === null){
                
                    getUserInfoService()
                    .then( (res)=>{
                        setLogedinUserInfo(res);
                    })
                
            }

            

            
            
        }else{
            setLogedinUserInfo(null);
            setIsLogedin(false);
            
            
            
        }
    },[])

    async function gotoAuth(){ //goto the signup page
        
        disableClick(); //disable click
        setLoading(true);
        await delay();
        setLoading(false)
        enableClick(); //enable click
        navigate("/signup")
        return;
        
        
    }
    
    
  return (
    <>
    {loading && <Loader></Loader>}
    <section className="bg-black bg-opacity-30 py-10 sm:py-16 h-screen">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div data-aos="fade-right">
                    <p data-aos="fade-down" className="text-base font-semibold tracking-wider text-indigo-500 uppercase">A platform where knowledge meets community.</p>
                    <h1 className="mt-4 text-4xl font-bold text-white lg:mt-8 sm:text-6xl xl:text-6xl">Share your thoughts and connect globally.</h1>
                    <p className="mt-4 text-base text-white lg:mt-8 sm:text-xl">Share your thoughts, inspire, and connect globally.</p>

                    <button data-aos="fade-up"  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-indigo-500 rounded-full lg:mt-16 hover:bg-indigo-600 focus:bg-indigo-600" 
                    onClick={()=>{
                        
                        if(logedin === true){
                            navigate("/home")
                        }else{
                            gotoAuth();
                        }
                    }}
                    >
                        {logedin?"Home":"Register"}
                        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    
                </div>

                <div data-aos="fade-left">
                    <img className="w-full " src="../../public/logo3.png" alt="" />
                </div>
            </div>
        </div>
    </section>


    </>
  )
}

export default Welcome
