import Image from "next/image";

import Profile from "../../../public/images/profiles/story/profile.jpg";


export default function StorySection() {
    return (
        <div className="flex gap-4 w-full bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
                <Image src={Profile} alt="Profile" width={62} height={62} className="rounded-full" />
                <div className="flex">
                    <span className="font-semibold">John Doe</span>
                </div>
            </div>
        </div>
    );
}