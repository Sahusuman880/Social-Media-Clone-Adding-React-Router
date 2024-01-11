import { createContext, useReducer } from "react";

export const Postlistcontext = createContext({
  postlist: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
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
  const addPost = (userId, title, body, reactions, tags) => {
    console.log(userId, title, body, reactions, tags);
    dispatchPostlist({
      type: "ADD_ITEM",
      payload: {
        userId,
        title,
        body,
        reactions,
        tags,
      },
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

  return (
    <Postlistcontext.Provider
      value={{ postlist, addPost, addInitialPosts, deletePost }}
    >
      {props.children}
    </Postlistcontext.Provider>
  );
};
export default PostListProvider;
