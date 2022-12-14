import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import useStyles from './styles';
import {createPost, updatePost} from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const [postData, setPostData] = useState({
    creator:"",
    title:"",
    message:"",
    tags:"",
    selectedFile:""
  });

  useEffect(() => {
    if(post)
      setPostData(post);
  }, [post]);

  const handleSubmit = e => {
    e.preventDefault();
    if(currentId)
    {
      dispatch(updatePost(currentId, postData));
    }
    else
    {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator:e.target.value})}/>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})}/>
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}/>
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value})}/>
      </form>
      <div className={classes.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
        />
      </div>
      <button style={{cursor:"pointer", fontFamily:"arial", backgroundColor:"blue", color:"white", width:"100%", height:"30px", borderRadius:"10px", border:"none"}} className={classes.buttonSubmit} variant="contain" color="primary" size="large" onClick={handleSubmit} fullWidth>
        SUBMIT
      </button>
      <button style={{cursor:"pointer", fontFamily:"arial", backgroundColor:"red", color:"white", width:"100%", height:"30px", borderRadius:"10px", border:"none"}} variant="contain" color="secondary" size="small" onClick={clear} fullWidth>
        CLEAR
      </button>
    </Paper>
  )
}

export default Form;