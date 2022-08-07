const removeDescriptionTags = (str: string) => str.replaceAll(/(<((?!br)[^>]+)>)/gi, '');
export default removeDescriptionTags;
