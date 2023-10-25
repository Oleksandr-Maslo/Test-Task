const BASE_URL = "https://technical-task-api.icapgroupgmbh.com/api";

export const fetchUserData = (
  username: string,
  password: string,
) => {
  return (
    fetch(BASE_URL + '/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      }));
};

export const patchUserData = (id: number, key: string, newValue: string) => {
  return (
    fetch(BASE_URL + `/table/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [key]: newValue,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Помилка запиту:', error);
      }));
};

export const fetchTable = (page: number) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  return (
    fetch(BASE_URL + `/table?limit=${limit}&offset=${offset}`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error))
  )
};
