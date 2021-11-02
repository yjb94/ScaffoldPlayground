import axios from 'axios';
import {useQuery} from 'react-query';

const getPost = async (id: number): Promise<Post> => {
  const {data} = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  return data;
};

export const usePost = (id: number) => {
  return useQuery(['post', id], () => getPost(id), {
    enabled: !!id,
  });
};
