import Image from 'next/image';
import Profile from '../../../public/images/profiles/story/profile.jpg';


export default function StorySection() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="hidden lg:block w-1/4">
                <div className="sticky top-0">
                </div>
            </div>


            <div className="flex-1 mb-6">
                <div className='w-[720px] h-[120px] justify-center bg-gray-100 p-4 rounded-full shadow-md flex flex-row gap-8'>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                    <div className='items-center flex flex-col gap-1'>
                        <Image 
                            src={Profile} 
                            alt="Profile" 
                            width={62} 
                            height={62} 
                            className="rounded-full border-2 bg-gradient-to-t from-[#40E0D0] to-[#77FF00]" 
                        />
                        <p>Lisa</p>
                    </div>
                </div>
            </div>
        </div>
    );
}