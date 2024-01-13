import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { Postlistcontext } from "../Store/postlist-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpener from "./LoadingSpener";

function PostList() {
  const { postlist, addInitialPosts } = useContext(Postlistcontext);
  const [Fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up useEffect...");
      controller.abort();
    };
  }, []);

  return (
    <>
      {Fetching === true ? (
        <LoadingSpener />
      ) : postlist.length == 0 ? (
        <WelcomeMessage />
      ) : null}
      {postlist.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </>
  );
}

export default PostList;
