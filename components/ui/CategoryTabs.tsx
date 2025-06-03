import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

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
      className="flex-row space-x-md px-md py-sm bg-background-medium"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            className={`px-md py-sm rounded-full ${isActive ? 'bg-primary' : 'bg-background-light'}`}
            onPress={() => onCategoryChange(category)}
          >
            <Text className={`text-sm font-medium ${isActive ? 'text-background-dark' : 'text-text-secondary'}`}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryTabs;