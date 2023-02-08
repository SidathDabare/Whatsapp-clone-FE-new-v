/** @format */
import { getDataForLoggedInUser,getChats, } from "../lib/apiFunctions"
import { useDispatch } from "react-redux"
import React, { useEffect, useState } from "react"
import { setLoggedInUserAction, setSelectedChatAction,getAllChatAction} from "../redux/actions"
import "../styles/HomePage.css"
import ProfilesContainer from "../components/ProfilesContainer"
import ChatContainer from "../components/ChatContainer"




const HomePage = () => {
  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const [profileNames, setProfileNames] = useState([])
  const [chatSelected, setChatSelected] = useState(null)
  const [createGroup, setCreateGroup] = useState([])

  const [searchTerm, setSearchTerm] = useState("")




  const changeChat = (user) => setChatSelected(user)

  useEffect(() => {
    getDataForLoggedInUser(token).then((data) =>
      dispatch(setLoggedInUserAction(data))
    )
    
    getChats(token).then((chats) => {
      //setChatItems(chats)
      dispatch(getAllChatAction(chats))
      dispatch(setSelectedChatAction(chats[0]))
    })
  }, [])
  return (
    <div className='main-container d-flex'>
      <ProfilesContainer
        profileNames={profileNames}
        // chatSelected={chatSelected}
        setProfileNames={setProfileNames}
        setChatSelect={setChatSelected}
        changeChat={changeChat}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCreateGroup={setCreateGroup}
        createGroup={createGroup}
      />
      <ChatContainer profileSelected={setChatSelected} />
    </div>
  )
}

export default HomePage
