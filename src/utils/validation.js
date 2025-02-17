export const validateProfile = (profileData) => {
    const errors = {};

    if (!profileData.name || profileData.name.trim() === '') {
        errors.name = 'Name is required';
    }

    if (!profileData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
        errors.email = 'Valid email is required';
    }

    if (!profileData.phone || !/^\d{10}$/.test(profileData.phone)) {
        errors.phone = 'Valid phone number is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
