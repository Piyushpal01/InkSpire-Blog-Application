import detailBanner from "../images/detailBanner.jpg"
import aboutPic from "../images/aboutPic.jpg"

const AboutPage = () => {
    return (
        <>
            <h1 className="text-[2rem] font-bold mb-4 text-center p-4 tracking-wider dark:text-gray-300">Welcome to <strong>Inkspire</strong></h1>
            <div className='px-10 py-3'>
                <div className="grid grid-cols-2 p-4 mb-10 gap-6">
                    <div>   
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-20">
                            <strong>InkSpire</strong> – where ideas find their voice and creativity breathes freely. Whether you're an aspiring writer, an avid reader, or simply someone who seeks meaning in words, InkSpire is designed to be your digital sanctuary. It’s a space where thoughts flow without restriction, stories unfold organically, and every voice finds the courage to speak up and be heard.
                        </p>
                        <p className="leading-loose text-gray-700 dark:text-gray-300 mb-4">
                            Born out of a deep passion for storytelling and a belief in the transformative power of self-expression, InkSpire isn't just a blog platform — it’s a creative movement. A place where ideas aren't just posted; they're nurtured, explored, and celebrated. Whether it’s poetry, personal journeys, opinions, or essays — each piece on InkSpire reflects a part of someone’s truth.
                        </p>
                    </div>
                    <img 
                        src={detailBanner} 
                        className="w-full max-h-[60vh] rounded-md"
                    />
                </div>
                <div className="grid grid-cols-2 p-4 mb-10 gap-6">
                    <img 
                        src={aboutPic} 
                        className="w-full max-h-[60vh] rounded-md"
                    />
                    <div>   
                        <p className="leading-loose text-gray-700 dark:text-gray-300 mb-20">
                            Our mission is to inspire connection through content — to blur the boundaries between creators and readers. We believe that everyone has something valuable to say, and through InkSpire, we're building a community where your words matter and your voice makes an impact.
                        </p>
                        <p className="leading-loose text-gray-700 dark:text-gray-300">
                            From personal reflections to deep societal insights, from trending narratives to timeless philosophies — InkSpire is the voice of a new generation of storytellers. Join us, share your voice, and be part of a platform that celebrates authenticity, encourages creativity, and truly listens.
                        </p>
                    </div>
                </div>

                <h3 className="text-[1.2rem] italic text-gray-600 dark:text-gray-400 mt-6 text-center font-bold">
                    “Write fearlessly. Read deeply. Inspire endlessly.”
                </h3>

            </div>

        </>
    )
}

export default AboutPage