import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import useHome from './hooks/useHome';
import { moderateScale, scaleFont } from '../../utils/responsive';
import Button from '../../components/Button';

const HomeScreen = () => {
  const {
    states: { posts, isOpen, editPost, setIsOpen },
    functions: { handleEdit, handleDelete, handleSave, openCreateModal },
  } = useHome();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>

        <Button text="Add" onPress={openCreateModal} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text>No post yet</Text>
          </View>
        }
      />

      {isOpen && (
        <PostModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          editPost={editPost}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  title: {
    fontSize: scaleFont(22),
    fontWeight: '700',
  },
});
