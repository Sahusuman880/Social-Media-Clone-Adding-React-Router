import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { Postlistcontext } from "../Store/postlist-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpener from "./LoadingSpener";
import { useLoaderData } from "react-router-dom";

function PostList() {
  // const { postlist, Fetching } = useContext(Postlistcontext);
  // const { addInitialPosts } = useContext(Postlistcontext);
  const postlist = useLoaderData();

  return (
    <>
      {postlist.length == 0 ? <WelcomeMessage /> : null}
      {postlist.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </>
  );
}

export function postLoader() {
  return fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((data) => {
      return data.posts;
    });
}

export default PostList;
