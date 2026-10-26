const DEFAULT_PROFILE_IMAGE =
  'https://cdn-icons-png.freepik.com/512/8847/8847419.png';

function getProfileImageUrl(photoURL?: string | null, size = 64) {
  if (photoURL == null || photoURL === '') {
    return DEFAULT_PROFILE_IMAGE;
  }

  if (photoURL.includes('googleusercontent.com') === false) {
    return photoURL;
  }

  if (/=s\d+-c/.test(photoURL)) {
    return photoURL.replace(/=s\d+-c/, `=s${size}-c`);
  }

  return `${photoURL}=s${size}-c`;
}

export default getProfileImageUrl;
