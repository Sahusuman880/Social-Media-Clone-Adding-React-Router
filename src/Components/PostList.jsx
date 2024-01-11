import Post from "./Post";
import { useContext } from "react";
import { Postlistcontext } from "../Store/postlist-store";
import WelcomeMessage from "./WelcomeMessage";

function PostList() {
  const { postlist, addInitialPosts } = useContext(Postlistcontext);
  function onGetPostClick() {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => addInitialPosts(data.posts));
  }

  return (
    <>
      {postlist.length == 0 ? (
        <WelcomeMessage onGetPostClick={onGetPostClick} />
      ) : null}
      {postlist.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </>
  );
}

export default PostList;
