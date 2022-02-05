function Api(q) {
  return fetch(
    "https://pixabay.com/api/?q=cat&page=1&key=24335530-1fa5676597020c031a07a1cad&image_type=photo&orientation=horizontal&per_page=12"
  )
    .then((res) => res.json())
    .then((q) => console.log(q.hits[1].webformatURL));
}
export default Api;
