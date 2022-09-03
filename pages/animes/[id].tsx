import { useRouter } from "next/router";
import Link from "next/link";
import { useGetSingleAnime } from "../../utils/useAPIRequests";

const singleAnime = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading, isSuccess, status } = useGetSingleAnime(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...: {console.log(error)}</div>;
  }

  return (
    <div>
      <div className="">
        <Link href="/">Return to homepage</Link>
      </div>
      <div className="">
        <div className="">
          {/* <img src={data.Media.coverImage.extraLarge}></img> */}
        </div>
        <div className={""}>
          <p>English title: {data.Media.title.english}</p>
          <p>Number of episodes: {data.Media.episodes}</p>
          <p>Episode duration: {data.Media.duration}</p>
          <p>
            Genres:{" "}
            {data.Media.genres.map((genre) => (
              <span key={genre}>{genre} </span>
            ))}
          </p>
          <p>Average score: {data.Media.averageScore}</p>
        </div>
      </div>
    </div>
  );
};

export default singleAnime;