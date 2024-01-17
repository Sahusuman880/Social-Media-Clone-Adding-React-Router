import { Form, redirect } from "react-router-dom";

function CreatePost() {
  // const { addPost } = useContext(Postlistcontext);

  return (
    <Form method="POST" className="createpost">
      <div class="mb-3">
        <label htmlFor="exampleInputUserID" class="form-label">
          User ID
        </label>
        <input
          name="userId"
          type="text"
          class="form-control"
          id="exampleInputUserID"
          placeholder="Enter Your User ID..."
        />
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputTitle" class="form-label">
          Post Title
        </label>
        <input
          name="title"
          type="text"
          class="form-control"
          id="exampleInputTitle"
          placeholder="How are you felling today..."
        />
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputbody" class="form-label">
          About the post
        </label>
        <textarea
          name="body"
          rows="4"
          type="text"
          class="form-control"
          id="exampleInputbody"
          placeholder="Tell us more about it.."
        />
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputReaction" class="form-label">
          Number of Reactions
        </label>
        <input
          name="reactions"
          type="text"
          class="form-control"
          id="exampleInputReaction"
          placeholder="How many people reacted to your post"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="exampleInputTag" class="form-label">
          Your Tags..
        </label>
        <input
          name="tags"
          type="text"
          class="form-control"
          id="exampleInputTag"
          placeholder="Please enter tags using space..."
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </Form>
  );
}
export const createPostAction = async (data) => {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);
  postData.tags = postData.tags.split(" ");

  fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      console.log(post);
    });
  return redirect("/");
};
export default CreatePost;
