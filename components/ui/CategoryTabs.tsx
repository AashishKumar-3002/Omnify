import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '@/lib/utils';

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
      className="py-sm px-md"
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            className="mr-xl py-xs relative"
            onPress={() => onCategoryChange(category)}
          >
            <Text className={cn(
              "text-text-secondary font-sans-medium text-base",
              isActive && "text-text-primary font-sans-bold"
            )}>
              {category}
            </Text>
            {isActive && (
              <View className="absolute bottom-[-3px] left-0 right-0 h-[1px] bg-primary rounded" />
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CategoryTabs;