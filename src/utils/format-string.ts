/**
 *
 * @param str
 * @param subsLength : number String length from the ellipsis to the two ends
 * @param minLength : number Minimum length for text to add ellipsis
 */
export function fEllipsisMiddle(str?: string, subsLength: number = 10, minLength: number = 25) {
  if (str && str.length > minLength) {
    return `${str.substring(0, subsLength)}...${str.substring(
      str.length - subsLength,
      str.length
    )}`;
  }
  return str;
}

/*
/**
 *  Extracts the filename from a given URL by parsing the pathname.
 *
 * @param {string} url  - The URL from which to extract the filename.
 * @returns {string} The extracted filename or url if not file link
 */
export function getFileNameFromUrl(url: string): string {
  try {
    // Use built-in URL constructor to extract pathname from the URL
    const { pathname } = new URL(url);

    // Extract the last part of the pathname as the filename
    const parts = pathname.split('/').pop();

    const fileName = parts?.includes('?') ? parts.split('?')[0] : parts;
    return fileName || url;
  } catch (e) {
    return url;
  }
}
