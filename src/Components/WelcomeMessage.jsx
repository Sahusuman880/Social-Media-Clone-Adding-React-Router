function WelcomeMessage({ onGetPostClick }) {
  return (
    <>
      <center className="welcome">
        <h1>There is No post available</h1>
        <button type="button" class="btn btn-primary" onClick={onGetPostClick}>
          Get Post from Server
        </button>
      </center>
      ;
    </>
  );
}
export default WelcomeMessage;
