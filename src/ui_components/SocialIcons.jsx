import React from 'react'

const SocialIcons = ({ link, Icon }) => {
    // link ho toh <a> use karo, link na ho toh <a> avoid karo (taaki accidental redirect/reload na ho)/
    const safeLink = link?.trim();

    return safeLink ? (
        <a
            href={safeLink}
            target='_blank'
            rel='noopener noreferrer'
            className='w-[40px] h-[40px] rounded-lg bg-[#4a4b51] flex justify-center items-center dark:text-black dark:bg-[#84858a]'
        >
            <Icon />
        </a>
    ) : (
        <div className="w-[40px] h-[40px] rounded-lg bg-[#4a4b51] flex justify-center items-center dark:text-black dark:bg-[#84858a]">
            <Icon />
        </div>
    );
}

export default SocialIcons