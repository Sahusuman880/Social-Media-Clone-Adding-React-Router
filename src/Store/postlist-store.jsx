import { createContext, useReducer, useState, useEffect } from "react";

export const Postlistcontext = createContext({
  postlist: [],
  addPost: () => {},

  deletePost: () => {},
  Fetching: false,
});

function postListReducer(currentPostList, action) {
  let newPostList = [...currentPostList];
  if (action.type === "ADD_ITEM") {
    newPostList = [
      {
        title: action.payload.title,
        body: action.payload.body,
        reactions: action.payload.reactions,
        userId: action.payload.userId,
        tags: action.payload.tags,
      },
      ...currentPostList,
    ];
  }

  if (action.type === "DELETE_ITEM") {
    let newPost = [...currentPostList];
    newPost.splice(action.payload.index, 1);
    newPostList = [...newPost];
  }

  if (action.type === "ADD_INITIAL_ITEM") {
    newPostList = action.payload.posts;
  }
  return newPostList;
}

const PostListProvider = (props) => {
  const [postlist, dispatchPostlist] = useReducer(postListReducer, []);
  const [Fetching, setFetching] = useState(false);

  const addPost = (post) => {
    console.log(post);
    dispatchPostlist({
      type: "ADD_ITEM",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostlist({
      type: "ADD_INITIAL_ITEM",
      payload: {
        posts,
      },
    });
  };
  const deletePost = (index) => {
    dispatchPostlist({
      type: "DELETE_ITEM",
      payload: {
        index,
      },
    });
  };

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
      controller.abort();
    };
  }, []);

  return (
    <Postlistcontext.Provider
      value={{ postlist, addPost, deletePost, Fetching }}
    >
      {props.children}
    </Postlistcontext.Provider>
  );
};
export default PostListProvider;
