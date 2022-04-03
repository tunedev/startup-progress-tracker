export function fetchRandomFact() {
  return fetch("https://uselessfacts.jsph.pl/random.json")
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data.text;
      } else {
        throw new Error(data);
      }
    })
    .catch((error) => {
      console.log("from fetch random stuffs error", error);
      throw new Error("Error occured while fetching random fact");
    });
}
