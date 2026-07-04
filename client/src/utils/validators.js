export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const validateLogin = ({ email, password }) => {
  const errors = {}
  if (!isEmail(email)) errors.email = "Enter a valid email address."
  if (!password || password.length < 6) errors.password = "Password must be at least 6 characters."
  return errors
}

export const validateRegister = ({ name, email, password, acceptedTerms }) => {
  const errors = validateLogin({ email, password })
  if (!name || name.trim().length < 2) errors.name = "Enter your full name."
  if (!acceptedTerms) errors.acceptedTerms = "Accept the membership terms."
  return errors
}

export const validateAddress = ({ name, email, phone, address, city, state, postalCode }) => {
  const errors = {}
  if (!name) errors.name = "Name is required."
  if (!isEmail(email)) errors.email = "Valid email is required."
  if (!address) errors.address = "Address is required."
  if (!city) errors.city = "City is required."
  if (!state) errors.state = "State is required."
  if (!phone) errors.phone = "Phone is required."
  if (!postalCode) errors.postalCode = "Postal code is required."
  return errors
}
