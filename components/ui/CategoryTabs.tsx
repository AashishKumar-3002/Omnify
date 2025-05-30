import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { ComponentStyles } from '../../styles';

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
      contentContainerStyle={ComponentStyles.categoryTabsContainer}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            style={ComponentStyles.categoryTab}
            onPress={() => onCategoryChange(category)}
          >
            <Text style={[
              ComponentStyles.categoryTabText,
              isActive && ComponentStyles.categoryTabActive
            ]}>
              {category}
            </Text>
            {isActive && <View style={ComponentStyles.categoryTabIndicator} />}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryTabs;