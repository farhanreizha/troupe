export const splitUsername = (name: string) => {
  const split = name.split(" ");
  const map = split.map((username) => {
    if (username[0] === "_" || username[0] === "-") {
      return username[1];
    }

    return username[0];
  });

  return map;
}
