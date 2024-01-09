import { createContext, useReducer } from "react";

export const Postlistcontext = createContext({
  postlist: [],
  addPost: () => {},
  deletePost: () => {},
});

function postListReducer(currentPostList, action) {
  let newPostList = [...currentPostList];

  if (action.type === "DELETE_ITEM") {
    let newPost = [...currentPostList];
    newPost.splice(action.payload.id, 1);
    newPostList = [...newPost];
  }
  return newPostList;
}

const PostListProvider = (props) => {
  const [postlist, dispatchPostlist] = useReducer(postListReducer, [
    {
      id: 0,
      title: "Going to Mumbai",
      body: "Hii friends i am going to mumbai for my vacation",
      reactions: 2,
      userId: "user-9",
      tags: ["vacation", "Mumbai", "enjoying"],
    },
    {
      id: 1,
      title: "Pass Hogaye bhai",
      body: "4 sall ki masti ke bad bhi pass hogaye.Hard to belive",
      reactions: 5,
      userId: "user-10",
      tags: ["Pass", "MCA", "4 Saal"],
    },
  ]);
  const addPost = () => {
    dispatchPostlist();
  };
  const deletePost = (id) => {
    dispatchPostlist({
      type: "DELETE_ITEM",
      payload: {
        id,
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
