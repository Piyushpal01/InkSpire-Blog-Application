import { Typography } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NoBlogPage = () => {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8 dark:text-white">
        <div>
          <FlagIcon className="w-20 h-20 mx-auto" />
          <Typography
            variant="h1"
            color="blue-gray"
            className="mt-10 !text-3xl !leading-snug md:!text-4xl"
          >
            Sorry <br /> No Blogs Found.
          </Typography>
          <div className="flex gap-8 mt-6">
            <Link to="/">
            <Button className="cursor-pointer tracking-wider font-semibold ">Back to home &rarr;</Button>
          </Link>
          <Link to="create_post">
            <Button className="cursor-pointer tracking-wider font-semibold">Go to create post &rarr;</Button>
          </Link>
          </div>
        </div>
      </div>
  )
}

export default NoBlogPage