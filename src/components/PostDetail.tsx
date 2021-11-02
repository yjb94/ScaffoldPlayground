import {usePost} from 'hooks/usePost';
import React from 'react';
import {View} from 'react-native';
import Text from 'components/Text/Text';

export type PostDetailProps = {
  id: Post['id'];
};

const PostDetail: React.FC<PostDetailProps> = ({id}) => {
  const {data} = usePost(id);

  return (
    <View>
      <Text fontSize={24}>{data?.title}</Text>
      <Text fontSize={16}>{data?.body}</Text>
    </View>
  );
};

export default PostDetail;
