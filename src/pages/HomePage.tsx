import {Header} from "@/components/HomePage/Header.tsx"
import {Hero} from "@/components/HomePage/Hero"
import {SocialProof} from "@/components/HomePage/SocialProof"
import {Features} from "@/components/HomePage/Features"
import {Testimonials} from "@/components/HomePage/Testimonials"
import {Faq} from "@/components/HomePage/Faq"
import {Cta} from "@/components/HomePage/CTA"
import {Footer} from "@/components/HomePage/Footer.tsx"



export function HomePage() {

    window.document.title = "Neemble Eat"

    return (
        <div className="max-w-[1150px] mx-auto">
            <Header />
            <Hero />
            <SocialProof />
            <Features />
            <Testimonials />
            <Faq />
            <Cta />
            <Footer />
        </div>
    );
}

