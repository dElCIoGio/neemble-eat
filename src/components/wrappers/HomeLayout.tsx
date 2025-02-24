import {Header} from "@/components/HomePage/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@/components/HomePage/Footer.tsx";

function HomeLayout() {
    return (
        <main>
            <Header/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    );
}

export default HomeLayout;