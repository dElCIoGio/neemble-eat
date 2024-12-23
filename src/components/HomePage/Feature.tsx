import {Feature} from "@/components/HomePage/Features.tsx";

interface Props {
    feature: Feature
}

export function FeatureCard({feature}: Props) {
    const Icon = feature.icon

    return (
        <div className="p-8 hover:bg-gradient-to-t hover:from-amethyst-900 hover:to-white transition-all duration-150">
            <Icon className="text-amethyst-400 my-4" size={22}/>
            <h1 className="font-poppins-semibold text-lg">
                {feature.name}
            </h1>
            <p className="text-zinc-500 text-sm">
                {feature.description}
            </p>

        </div>
    );
}

