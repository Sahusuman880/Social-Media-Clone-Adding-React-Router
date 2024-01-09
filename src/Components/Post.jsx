import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { Postlistcontext } from "../Store/postlist-store";
function Post(props) {
  const { deletePost } = useContext(Postlistcontext);
  return (
    <div class="card post-card" style={{ width: "30rem" }}>
      <div class="card-body">
        <h5 class="card-title">
          {props.post.title}
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(props.post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p class="card-text">{props.post.body}</p>
        {props.post.tags.map((element) => {
          return (
            <span class="badge text-bg-primary tags" key={element}>
              {element}
            </span>
          );
        })}
        <div class="alert alert-info reaction" role="alert">
          {`This post reached  ${props.post.reactions} reactions`}
        </div>
      </div>
    </div>
  );
}
export default Post;
