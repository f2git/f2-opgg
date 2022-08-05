export const secondToHMS = (seconds: number) => {
  const hour = seconds / 3600;
  const min = seconds % 60;
  const sec = seconds % 60;

  let timeString = '';
  if (hour > 1) timeString += `${Math.floor(hour)}시`;
  if (min > 1) timeString += ` ${min}분`;
  if (sec > 1) timeString += ` ${sec}초`;

  return timeString;
};

export const timestampToString = (timestamp: number) => {
  const dateFromTimeStamp = new Date(timestamp * 1000);
  const now = new Date();

  const gap = Math.floor((now.getTime() - dateFromTimeStamp.getTime()) / 1000 / 60);
  if (gap < 1) return '방금전';
  if (gap < 60) return `${gap}분 전`;
  const hours = Math.floor(gap / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(gap / 60 / 24);
  if (days < 30) return `${days}일 전`;
  const months = Math.floor(gap / 30 / 60 / 24);
  if (months < 12) return `${days}개월 전`;
  const years = Math.floor(gap / 365 / 60 / 24);

  return `${years}년 전`;
};

export default secondToHMS;
