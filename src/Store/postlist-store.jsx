import { createContext, useReducer } from "react";

export const Postlistcontext = createContext({
  postlist: [],
  addPost: () => {},
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
  return newPostList;
}

const PostListProvider = (props) => {
  const [postlist, dispatchPostlist] = useReducer(postListReducer, [
    {
      title: "Going to Mumbai",
      body: "Hii friends i am going to mumbai for my vacation",
      reactions: 2,
      userId: "user-9",
      tags: ["vacation", "Mumbai", "enjoying"],
    },
    {
      title: "Pass Hogaye bhai",
      body: "4 sall ki masti ke bad bhi pass hogaye.Hard to belive",
      reactions: 5,
      userId: "user-10",
      tags: ["Pass", "MCA", "4 Saal"],
    },
  ]);
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
  const deletePost = (index) => {
    dispatchPostlist({
      type: "DELETE_ITEM",
      payload: {
        index,
      },
    });
  };

  return (
    <Postlistcontext.Provider value={{ postlist, addPost, deletePost }}>
      {props.children}
    </Postlistcontext.Provider>
  );
};
export default PostListProvider;
