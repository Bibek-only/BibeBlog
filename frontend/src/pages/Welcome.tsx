import { isLogedinAtom } from "../store/atom/isloginatom";
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../skelitons/Loader'
import { useSetRecoilState } from "recoil";
import { enableClick, disableClick } from "../services/clickDesEnb";

//animation import
import AOS from "aos";
import "aos/dist/aos.css";

const Welcome = () => {
    //delay
    async function delay(){
        return new Promise((res,rej)=>{
            setTimeout(()=>{
                res("done")
            },1500)
        })
    }

    //animatio configuration
    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in ms
          easing: "ease-out", // Easing function
          once: true, // Whether animation should happen only once
        });
      }, []);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const setIsLogedin = useSetRecoilState(isLogedinAtom);

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setIsLogedin(true)
            disableClick(); //disable click
            delay()
            .then((res)=>{
                setLoading(true);
                return delay();
            })
            .then((res2)=>{
                enableClick(); //enable click
                navigate("/home")
            })
            
        }else{
            setIsLogedin(false)
        }
    },[])

    async function gotoAuth(btn: HTMLButtonElement, path:string){ //goto the signup page
        btn.disabled = true;
        disableClick(); //disable click
        
        setLoading(true);
        await delay();
        enableClick(); //enable click
        navigate(path)
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
                    onClick={(e)=>{
                        const btn = e.target as HTMLButtonElement;
                        gotoAuth(btn,"/signup");
                    }}
                    >
                        Join now
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
