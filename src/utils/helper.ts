export const getEndDate = (state: string, loading_time?: number): number => {
  console.log('.... ',state, loading_time);
  switch (state) {
    case "resting":
      return 2 * 60 * 60 * 1000;
    case "ready":
      return 0
    case "loading":
      return loading_time * 60 * 1000;
    case "in mission":
      return 5 * 60 * 60 * 1000;
    case "mission done":
      return 0;
    default:
      return 0;
  }
};

