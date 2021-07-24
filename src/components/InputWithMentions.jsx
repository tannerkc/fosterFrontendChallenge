import './css/InputWithMentions.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { appContext } from '../contextProvider'
import ContentEditable from 'react-contenteditable';

export default function InputWithMentions() {

    const {users, setUsers, comments, setComments} = useContext(appContext)

    const [cursor, setCursor] = useState(0)
    const cursorRef = useRef(cursor); //prevents stale closure

    const [input, setInput] = useState('')
    const [mention, setMention] = useState('')
    const [showModal, setShowModal] = useState(false)

    const contentEditable = useRef()

    const handleInput = (input) =>{
        setInput(input)

        if(input.slice(-1) == '@'){
            setShowModal(true)
            setMention('@')
            setCursor(0)
        }
        if(input.slice(-1) == ' ' || input.slice(-1) == '' ){
            setShowModal(false)
            setMention('')
        }else{
            if(showModal){
                let str = input.split('@')
                let m = str[str.length - 1]
                setMention('@'+m)
            }
        }
    }

    const handleKeyDown = (e, cur)=>{
        const code = e.keyCode ? e.keyCode : e.which
        
        if(code === 38 || code === 40 || code === 13 || e.type == 'click'){
            e.preventDefault();
            if (code === 38 && cur > 0) {
                setCursor(c => --c)
                cursorRef.current = cur - 1
            }
            else if (code === 40 && cur < users.length - 1) {
                setCursor(c => ++c)
                cursorRef.current = cur + 1
            }

            if(code === 13 || e.type == 'click'){
                let str = input
                let newStr = str.replace(mention, `<span class="inputMention">@${users[cur].username}</span>&nbsp;`)
                setInput(newStr)
                contentEditable.current.focus()
                setShowModal(false)
                setMention('')
            }
        }
      }

    return (
        <div className="InputContainer">
            <ContentEditable
            className="output"
              innerRef={contentEditable}
              html={input}
              onChange={(e)=>handleInput(e.target.value)}
              onKeyDown={(e)=>handleKeyDown(e, cursorRef.current)}
            />

            {showModal&&
            <div className="mentionModal">
                {
                users.map((user, i)=>(
                    <>
                    {
                        user.username.includes(mention.substring(1))&&
                        <div className={cursor === i ? 'userMention active' : 'userMention'} key={i}
                        onClick={(e)=>handleKeyDown(e,i)}>
                            <img className="avatar" src={user.avatar} alt="" />
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    }
                    </>
                ))
                }
            </div>
            }
        </div>
    )
}
