import {createContext, useState} from 'react'

export const PostContext = createContext(null)

function Post ({childern}) {
    const [postDetails, setPostDetails] = useState()
    return (
        <PostContext.Provider value={postDetails}>
            {childern}
        </PostContext.Provider>
    )
}

export default Post