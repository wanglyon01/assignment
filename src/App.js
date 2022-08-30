import { useEffect, useState } from "react";
import SelectMonth from "./SelectMonth";

// Root Component
export default function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchAPI = async () => {
    try {
      const data = await fetch(
        "https://630dc8e8109c16b9abed36ff.mockapi.io/User"
      );
      const response = await data.json();
      function isMonth(month) {
        return response.filter(function (item) {
          return item.month === month;
        });
      }
      setPosts(isMonth(selectedMonth));
    } catch (err) {
      console.log("fetch failed", err);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, [selectedMonth]);

  const calculate = (totalexpend) => {
    let calReward;

    //rewared cauclate (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

    if (totalexpend > 100) {
      calReward = (totalexpend - 100) * 2 + 50;
    } else if (100 > totalexpend > 50) {
      calReward = 50;
    } else if (50 > totalexpend) {
      calReward = 0;
    }
    return calReward;
  };

  //Paganation
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const incrementPageNumber = () => {
    if (currentPage < pageNumbers.length - 1) {
      setCurrentPage((previousPageNumber) => previousPageNumber + 1);
    }
  };

  const decrementPageNumber = () => {
    if (currentPage > 0) {
      setCurrentPage((previousPageNumber) => previousPageNumber - 1);
    }
  };

  return (
    <>
      <p>Number of posts: {posts.length}</p>
      <p>Currently viewing: /?page={currentPage}</p>

      <button type="button" onClick={() => setPostsPerPage(2)}>
        2 posts per page
      </button>

      <button type="button" onClick={() => setPostsPerPage(5)}>
        5 posts per page
      </button>

      <button type="button" onClick={() => setPostsPerPage(10)}>
        10 posts per page
      </button>

      <SelectMonth getMonth={(e) => setSelectedMonth(e)} />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Spend</th>
            <th>Total Reward</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr>
              <td key={`${post.id}-id`}>{post.id}</td>
              <td key={`${post.FirName}-FirstName`}>{post.FirName}</td>
              <td key={`${post.Las}-LastName`}>{post.Las}</td>
              <td key={`${post.spend}-spendTotal`}>{post.spend}</td>
              <td key={`${post.reward}-reward`}>{calculate(post.spend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          type="button"
          className="first-page-btn"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(0)}
        >
          first
        </button>
        <button
          type="button"
          className="previous-page-btn"
          disabled={currentPage === 0}
          onClick={decrementPageNumber}
        >
          previous
        </button>
        <button
          type="button"
          className="next-page-btn"
          disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          onClick={incrementPageNumber}
        >
          next
        </button>

        <button
          type="button"
          className="last-page-btn"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])}
        >
          last
        </button>
      </div>
    </>
  );
}
