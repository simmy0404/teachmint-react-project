import "./Postpopup.css";

const Postpopup = (props) => {
    const {
        close,
        postData: {
            title,
            body
        }
    } = props
  return (
    <div className="post-container">
        <div className="post-title">{title}</div>
        <div className="post-body">{body}</div>
        <button onClick={close} className="post-close">close</button>
        <div className="post-modal-wrapper" onClick={close}></div>
    </div>
  );
};

export default Postpopup;
