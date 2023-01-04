import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useCallback } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { setPost, setPosts } from "../../state";

import { useReducer } from "react";
const ITEM_HEIGHT = 48;

const PostDelete = ({ setLoading,postUserId, postId }) => {
  

  
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggedInUserId = useSelector((state) => state.user._id);

  const deletePost = async (postId) => {
    console.log(postId,'noww post Id ');
    let response = await axios.post("http://localhost:5000/posts/post-delete", {
      postId
    });
    if(response.data.success){
     
      let updatedPosts =  response.data.newposts
      console.log(updatedPosts,'ithannu new posts');
      dispatch(setPost({ post: updatedPosts }));
      setLoading(false);
  
    }
  };
 

  const reportPost = async (postId) => {
    console.log(postId,'noww post Id ');
    let response = await axios.patch(`http://localhost:5000/posts/${postId}/report`, {
      loggedInUserId
    });
    if(response.data.success){
     
      let updatedPosts =  response.data.newposts
      console.log(updatedPosts,'ithannu new posts');
      dispatch(setPost({ post: updatedPosts }));
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {postUserId === loggedInUserId ? (
          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => {
                deletePost(postId);
               
              }}
            >
              Delete
            </Button>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Button onClick={()=>{reportPost(postId)}}>Report?</Button>
          </MenuItem>
        )}
      </Menu>
     
    </div>
  );
};

export default PostDelete;
