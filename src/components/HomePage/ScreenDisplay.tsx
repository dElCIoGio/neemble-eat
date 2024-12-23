import image from "@/../public/images/dashboard.png";


export function ScreenDisplay() {
    return (
        <img src={image}
             className="mt-16 w-[80%]  shadow-[0px_4px_100px_-13px_rgba(147,_51,_234,_0.15)] rounded-2xl border border-zinc-200"
             alt=""/>
    );
}

