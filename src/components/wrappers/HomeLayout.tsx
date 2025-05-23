import {Header} from "@/components/HomePage/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@/components/HomePage/Footer.tsx";

import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {CookieConsentDialog} from "@/components/HomePage/CookieConsentDialog.tsx";

function HomeLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflowX = "hidden";
        return () => {
            document.body.style.overflowX = "";
        };
    }, [location]);

    return (
        <main>
            <CookieConsentDialog/>
            <Header/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    );
}

export default HomeLayout;