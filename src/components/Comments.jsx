import React, { useContext, useEffect } from 'react'
import { appContext } from '../contextProvider'
import './css/Comments.css'
import Parser from 'html-react-parser'

export default function Comments(props) {

    const {users, setUsers, comments, setComments} = useContext(appContext)


    useEffect(()=>{
        console.log(comments)
    }, [comments])

    return (
        <div className="commentsContainer">
            {
                comments&&
                comments.map((comment, i)=>(
                    <div key={comment.uuid} className="comment">
                        <img className="avatar" src={users.filter(user => user.username == comment.username)[0].avatar} alt="" />
                        <div className="commentBody">
                            <h3>{comment.username}</h3>
                            <p>{Parser(comment.content)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
