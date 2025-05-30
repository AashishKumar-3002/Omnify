import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Form and input-related styles
 */
export const FormStyles = StyleSheet.create({
  // Form Containers
  formContainer: {
    padding: Spacing.md,
  },
  
  formGroup: {
    marginBottom: Spacing.lg,
  },
  
  // Input Fields
  input: {
    backgroundColor: Colors.background.light,
    borderRadius: Layout.radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider,
  },
  
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  
  // Labels
  label: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  
  requiredLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  
  // Helper Text
  helperText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  
  errorHelperText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  
  // Checkboxes and Radio Buttons
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: Layout.radius.sm,
    borderWidth: 2,
    borderColor: Colors.divider,
    backgroundColor: Colors.background.light,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  
  checkboxLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
    flex: 1,
  },
  
  // Switch
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  
  switchLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  
  // Picker/Select
  picker: {
    backgroundColor: Colors.background.light,
    borderRadius: Layout.radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.divider,
  },
  
  pickerText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },
  
  pickerPlaceholder: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.secondary,
  },
});
