import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
} from '../../../utils/responsive';

type Props = {
  post: any;
  onEdit: (post: any) => void;
  onDelete: (id: string) => void;
};

const PostCard = ({ post, onEdit, onDelete }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: post.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{post.title}</Text>

      <Text style={styles.desc}>{post.description}</Text>

      <View style={styles.row}>
        <Button text="Edit" onPress={() => onEdit(post)} />
        <Button
          text="Delete"
          variant="danger"
          onPress={() => onDelete(post.id)}
        />
      </View>
    </View>
  );
};
export default PostCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: moderateScale(12),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(10),
    elevation: 3,
  },
  image: {
    height: scaleHeight(160),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '600',
  },
  desc: {
    fontSize: scaleFont(14),
    color: '#555',
    marginTop: moderateScale(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(12),
  },
});
