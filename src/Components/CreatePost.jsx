import { useContext, useRef } from "react";
import { Postlistcontext } from "../Store/postlist-store";

function CreatePost() {
  const { addPost } = useContext(Postlistcontext);
  const userid = useRef();
  const posttitle = useRef();
  const postbody = useRef();
  const postreactions = useRef();
  const posttag = useRef();
  function postButtonClicked(event) {
    event.preventDefault();
    const userId = userid.current.value;
    const title = posttitle.current.value;
    const body = postbody.current.value;
    const reactions = postreactions.current.value;
    const tags = posttag.current.value.split(" ");
    userid.current.value = "";
    posttitle.current.value = "";
    postbody.current.value = "";
    postreactions.current.value = "";
    posttag.current.value = "";
    addPost(userId, title, body, reactions, tags);
  }

  return (
    <form className="createpost" onSubmit={postButtonClicked}>
      <div class="mb-3">
        <label htmlFor="exampleInputUserID" class="form-label">
          User ID
        </label>
        <input
          ref={userid}
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
          ref={posttitle}
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
          ref={postbody}
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
          ref={postreactions}
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
          ref={posttag}
          type="text"
          class="form-control"
          id="exampleInputTag"
          placeholder="Please enter tags using space..."
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </form>
  );
}
export default CreatePost;
