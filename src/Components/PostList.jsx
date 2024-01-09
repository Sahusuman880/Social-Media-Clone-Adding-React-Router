import Post from "./Post";
import { useContext } from "react";
import { Postlistcontext } from "../Store/postlist-store";

function PostList() {
  const { postlist } = useContext(Postlistcontext);
  return (
    <>
      {postlist.map((post, index) => (
        <Post key={post.id} post={post} index={index} />
      ))}
    </>
  );
}

export default PostList;
