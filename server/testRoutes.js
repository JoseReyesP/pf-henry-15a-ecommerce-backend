export async function getFilter() {
    const datos = {
        "filters": [
          {
            "filter": "rating",
            "order": "asc"
          },
          {
            "filter": "category",
            "type": "joyeria"
          }
        ]
      }
    const response = await(await fetch('https://pf-15a.up.railway.app/api/filter?itemsperpage=4&actualpage=1', {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })).json();

      console.log("response", response);
}