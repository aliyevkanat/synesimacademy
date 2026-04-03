export const playSound = (fileName: string): void => {
  try {
    const audio = new Audio(`/assets/audio/${fileName}`);
    setTimeout(() => audio.play().catch(() => {}), 500);
  } catch {}
};
