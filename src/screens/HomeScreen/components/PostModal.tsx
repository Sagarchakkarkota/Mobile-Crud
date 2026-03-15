import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  moderateScale,
  scaleFont,
  scaleHeight,
} from '../../../utils/responsive';
import Button from '../../../components/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: any) => void;
  editPost?: any;
};

const PostModal: React.FC<Props> = ({ isOpen, onClose, onSave, editPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setDescription(editPost.description);
      setImage(editPost.image);
    } else {
      setTitle('');
      setDescription('');
      setImage('');
    }
  }, [editPost]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res.assets && res.assets.length > 0) {
        setImage(res.assets[0].uri || '');
      }
    });
  };

  const handleSubmit = () => {
    if (!title || !description || !image) {
      Alert.alert('All fields are required');
      return;
    }

    const post = {
      id: editPost ? editPost.id : Date.now().toString(),
      title,
      description,
      image,
    };

    onSave(post);
  };

  return (
    <Modal isVisible={isOpen}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {editPost ? 'Edit Post' : 'Create Post'}
        </Text>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor={'gray'}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          placeholderTextColor={'gray'}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Button text="Select Image" onPress={pickImage} />

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.preview}
            resizeMode="contain"
          />
        )}

        <View style={styles.row}>
          <Button text="Cancel" variant="secondary" onPress={onClose} />
          <Button text="Save" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default PostModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
  },
  heading: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    marginBottom: moderateScale(12),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(6),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    fontSize: scaleFont(14),
    color: '#000',
  },
  textArea: {
    height: scaleHeight(100),
  },
  preview: {
    height: scaleHeight(120),
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(14),
  },
});
