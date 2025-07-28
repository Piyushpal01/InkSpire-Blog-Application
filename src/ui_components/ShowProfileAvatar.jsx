import { BASE_URL } from '@/api';
import { getUserInfo } from '@/services/apiBlog';
import { useQuery } from '@tanstack/react-query';
import { FaUserCircle } from "react-icons/fa";

const ShowProfileAvatar = ({ username }) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['users', username],
    queryFn: () => getUserInfo(username),
    enabled: !!username,
  });

  return (
    <div>
        {data?.profile_pic ? (
            <img 
                src={`${BASE_URL}${data?.profile_pic}`}
                className='w-10 h-10 rounded-full object-cover border-2 dark:border-white ' 
            />
        ) : (
            <FaUserCircle className='text-3xl dark:text-white' />
        )}
    </div>
  );
};


export default ShowProfileAvatar