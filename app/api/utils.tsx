export const getRandomPage = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

export const getRandomResponse = (data: Array<any>) => {
  return data[Math.floor(Math.random() * data.length)];
}