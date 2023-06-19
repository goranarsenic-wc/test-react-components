const API = "https://pokeapi.co/api/v2";

export const search = async (name: string) => {
  const fullUrl = `${API}/pokemon/${name}`;
  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "no-cors",
    },
  });
  if (response.status !== 404) {
    return response.json();
  }
  return undefined;
};
