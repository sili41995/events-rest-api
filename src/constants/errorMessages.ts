const enum ErrorMessages {
  emptyStringErr = 'Value cannot be the empty string',
  missingFieldsErr = 'Missing fields',
  emailRegExpErr = 'Email must be letters, digits, dot and @',
  emailRequiredErr = 'Missing required email field',
  passwordRequiredErr = 'Missing required password field',
  passwordMinLengthErr = 'Password length must be at least 8 characters long',
  passwordMaxLengthErr = 'Password length must be no more than 48 characters long',
  passwordRepeatRequiredErr = 'Missing required password repeat field',
  passwordRepeatErr = 'The entered passwords must be the same',
  taskRequiredErr = 'Missing required task field',
  deadlineRequiredErr = 'Missing required deadline field',
  duplicateEmailErr = 'Email already use',
  incorrectCredentialsErr = 'Email or password is wrong',
  missingFileErr = 'File is absent',
  wrongPasswordErr = 'Password is wrong',
  // timeFeatureErr: 'The time is in the future',
  // amountRequiredErr: 'Missing required amount field',
  // timeRequiredErr: 'Missing required time field',
  invalidDateErr = 'To get monthly progress, you need to specify the valid year and month',
}

export default ErrorMessages;
