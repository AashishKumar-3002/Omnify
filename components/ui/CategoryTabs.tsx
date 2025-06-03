import React from 'react';
import { Text, Pressable, ScrollView } from 'react-native';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="w-auto max-w-full px-2 py-1 mb-2 bg-background-dark/80"
      contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
      style={{ flexGrow: 0, flexShrink: 0, borderRadius: 12 }}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            className={`px-3 py-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary shadow-md' : 'bg-background-light/70'}`}
            style={{ alignSelf: 'center', marginRight: 6 }}
            onPress={() => onCategoryChange(category)}
          >
            <Text className={`text-xs font-semibold ${isActive ? 'text-background-dark' : 'text-text-secondary'}`}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryTabs;