interface FullImageProps {
	src: string;
}

export function FullImage({src}: FullImageProps) {
	return (
		<div className={"h-full justify-center flex items-center overflow-hidden rounded-xl"}>
					<img src={src}
					     alt=""
					     className="object-cover w-full h-full"/>
				</div>
	);
}

