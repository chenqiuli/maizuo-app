import axios from 'axios';

async function fetchFilmList({ cityId, type, pageNum, pageSize = 10 }) {
  const res = await axios({
    url: `/api/films?cityId=${cityId}&pageNum=${pageNum}&pageSize=${pageSize}&type=${type}`,
  });
  const { films } = res.data ?? {};
  return films;
}

export default fetchFilmList;
