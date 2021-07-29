import React, { useState, useRef } from 'react';

function BlogSite() {
  const [input, setInput] = useState({
    title: "",
    content: ""
  });
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getTitle = useRef();
  const getContent = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: input.title,
      content: input.content
   };
    if (input.title === "" && input.content === "") return;
    setPosts([...posts, newPost]);
    setInput({ title: "", content: "" });
    getTitle.current.value= "";
    getContent.current.value = "";
    createPostClick();
    
  };

  const handleEdit = attrs => {
    const edited = posts.map(post => {
      if (post.id === editId) {
        return {
          ...post,
          title: input.title || attrs.title,
          content: input.content || attrs.content
        };
      }
      return post
    })
    setPosts({edited});
    editClick();    
  };

  const editClick = () => {
    setIsEdit(!isEdit);
  };

  const editPostId = id => {
    setEditId(id);
    editClick();
  };
  const createPostClick = () => {
    setIsCreate(!isCreate);
  };

  const onDelete = id => {
    const newPost = posts.filter(post => post.id !== id);
    setPosts(newPost);
  };

  const handleChange = e => {
    setInput({
      ...input,
      title: e.target.value,
      content: e.target.value
    });
  }

  if (isCreate) {
    return (
     <NewPost
       getTitle={getTitle}
       getContent={getContent}
       handleChange={handleChange}
       handleSubmit={handleSubmit}
       input={input}
       setInput={setInput}
     />

    )
  } else if (isEdit) {
    const post = posts.find(post => post.id === editId)
     return (
       <EditPost {...post} handleEdit={handleEdit} handleChange={handleChange} input={input} setInput={setInput} />
     )
  } 
  return (
    <div>
     <h2>All Posts</h2>
     {!posts.length ? (
       <div><h3>No post yet</h3></div>
     ): (
       posts.map(post => (
       <Post
         {...post}
         key={post.id}
         id={post.id}
         onDelete={onDelete}
         editPostId={editPostId}
       />)
     )
     )}
        <button onClick={createPostClick}>Add New</button>
    </div>
  );
} 

function Post({
  title,
  content,
  editPostId,
  onDelete,
  id
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={() => editPostId(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

function NewPost({
  handleChange,
  getTitle,
  getContent,
  handleSubmit,
  input,
  setInput   
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          ref={getTitle}
          onChange={e => setInput({...input, title: e.target.value})}
          size="39"
          required
       />
       <label>Content:</label>
       <textarea
         onChange={e => setInput({...input, content: e.target.value})}
         cols="41"
         rows="8"
         required
         ref={getContent}
       />
       <button>Create Post</button>
      </form>
   </div>
  );
}

function EditPost({
  handleEdit,
  title,
  content,
  handleChange,
  setInput,
  input
}) {
  return (
    <div>
     <form>
      <label>Title:</label>
      <input
        type="text"
	size="39"
        defaultValue={title}
	onChange={e => setInput({...input, title: e.target.value})}
	required
      /> 
      <textarea
        defaultValue={content} 
	onChange={e => setInput({...input, content: e.target.value})}
	rows="8" 
	cols="41" 
	required
      />
      <button onClick={handleEdit}>Save Changes</button>
    </form>
    </div>
  );
}

export default BlogSite;