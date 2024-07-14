
export const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

export const calculateActiveDuration = (lastResumedAt: Date) => {
    const now = new Date();
    let diffInSeconds = Math.floor((now.getTime() - lastResumedAt.getTime()) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    diffInSeconds -= hours * 3600;
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds - minutes * 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
