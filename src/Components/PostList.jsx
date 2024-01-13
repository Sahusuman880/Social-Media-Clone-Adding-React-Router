import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { Postlistcontext } from "../Store/postlist-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpener from "./LoadingSpener";

function PostList() {
  const { postlist, Fetching } = useContext(Postlistcontext);

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
