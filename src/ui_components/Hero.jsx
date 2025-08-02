import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { BASE_URL } from '@/api';
import { HiPencilAlt } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import SocialIcons from "./SocialIcons";
import ShowProfileAvatar from "./ShowProfileAvatar";


const Hero = ({ userInfo, authUsername, toggleModal }) => {
    // console.log(userInfo);

    return (
        <div className='px-6 py-9 max-container flex flex-col items-center justify-center gap-4 bg-[#F6F6F7] dark:bg-[#090a12] rounded-md'>
            <div className='flex gap-4'>
                {/* Profile pic */}
                {userInfo.profile_pic ? (
                    <div className='w-[70px] h-[70px] rounded-full overflow-hidden'>
                        <img
                            src={`${BASE_URL}${userInfo?.profile_pic}`}
                            className='w-full h-full rounded-full object-cover'
                        />
                    </div>
                ) : (<ShowProfileAvatar />)}
                
                

                {/* Name and Title */}
                <span>
                    <p className='text-[18px] text-[#181A2A] dark:text-white'>{userInfo?.first_name} {userInfo?.last_name}</p>
                    <p className='text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]'>
                        {userInfo?.job_title || "Newbie, as a user"}
                    </p>
                </span>

                {userInfo.username === authUsername && <HiPencilAlt onClick={toggleModal} className='dark:text-white text-3xl cursor-pointer' />}

            </div>

            <p className='text-[#3B3C4A] text-[16px] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]'>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eveniet in, nam quod, debitis perspiciatis dolore eos, harum inventore maxime itaque. Culpa nulla amet provident harum eius asperiores voluptates molestiae! Alias modi deleniti nesciunt. Voluptas vitae id quae, dignissimos commodi veritatis in nostrum eaque ducimus enim vero laboriosam saepe! Aperiam tempore nam pariatur molestias optio cumque quo ratione, incidunt officiis amet? Magnam molestias accusantium fuga ipsam suscipit, nobis eos fugit enim, porro ad magni aperiam culpa. Saepe dignissimos provident distinctio? Facilis voluptatibus minima quasi voluptate consequatur a rerum in similique, odio optio quo voluptas. Reiciendis ad alias quis deserunt provident? */}
                {userInfo?.bio}
            </p>

            {/* Social icons */}
            <div className='flex gap-4 justify-center items-center text-white text-xl'>
                <SocialIcons link={userInfo?.instagram || ""} Icon={FaInstagram} />
                <SocialIcons link={userInfo?.facebook || ""} Icon={FaFacebookF} />
                <SocialIcons link={userInfo?.twitter || ""} Icon={BsTwitterX} />
                <SocialIcons link={userInfo?.youtube || ""} Icon={FaYoutube} />
                <SocialIcons link={userInfo?.linkedin || ""} Icon={FaLinkedin} />
                <SocialIcons link={userInfo?.github || ""} Icon={FaGithub} />
            </div>

        </div>
    )
}

export default Hero