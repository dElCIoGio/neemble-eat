import {Hero} from "@/components/HomePage/Hero.tsx";
import TrustedBy from "@/components/HomePage/TrustedBy.tsx";
import {Features} from "@/components/HomePage/Features.tsx";
import Benefits from "@/components/HomePage/Benefits.tsx";
import Pricing from "@/components/HomePage/Pricing.tsx";
import {Testimonials} from "@/components/HomePage/Testimonials.tsx";
import {Faq} from "@/components/HomePage/Faq.tsx";
import {Cta} from "@/components/HomePage/CTA.tsx";



export function HomePage() {

    window.document.title = "Neemble Eat"

    return (
        <div>
            <Hero/>

            {/* Trusted By Section */}
            <TrustedBy/>

            {/* Features Section */}
            <Features/>

            {/* Benefits Section */}
            <Benefits/>

            {/* Pricing Section */}
            <Pricing/>

            {/* Testimonials Section */}
            <Testimonials/>

            {/* FAQs Section */}
            <Faq/>

            {/* CTA Section */}
            <Cta/>
        </div>
    );
}

