import {useState, createContext, useContext, useReducer} from 'react'
import styles from './Contextapi.module.css'

const posts = [
    {
        title: "U.S.A Army",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
        title: "The Society of Army",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    }
]

const PostContext = createContext()

const initialState = {
    title: "",
    content: ""
}

function reducer(state, action){
    switch(action.type){
        case "Handle Data":
            return { ...state, [action.field]: action.payload }
        default:
            throw new Error("Unknown Action!")
    }
}

export default function Contextapi() {

    const [searchQuery, setsearchQuery] = useState("")
    const [post, setPost] = useState(posts)
  return (
    <>  
        <PostContext.Provider value={{ post, searchQuery, setsearchQuery, setPost }}>
            <Header/>
            <AddPost/>
            <DisplayContent/>
        </PostContext.Provider>
    </>
  )
}

function Header(){
    //use context consumed here!
    const {post, setPost, searchQuery, setsearchQuery} = useContext(PostContext)

    const handleClearPost= ()=>{
        setPost([])
    }

    return (
        <div className={styles.header}>   
            <h1 className={styles.logo}>Social Magazine</h1>
            <span className={styles.postCount}>{post.length} post found</span>
            <div className={styles.input}>
                <input className={styles.inputPost} type="text" placeholder="search by title" value={searchQuery} onChange={ (e)=>{ setsearchQuery( e.target.value) }}/>
                <button onClick={handleClearPost} className={styles.searchPostBtn}>Clear Posts</button>
            </div>
        </div>
    )
}

function DisplayContent(){
    const {post, searchQuery} = useContext(PostContext)
    return (
        <div className={styles.dispContent}>
                {post.length > 0 ? post.filter(post=>post.title.toLowerCase().includes(searchQuery)).map((post)=> {
                return <div className={styles.innerDivContent} key={post.title}>
                        <span className={styles.title}>{post.title}</span>
                        <p className={styles.content}>{post.content}</p>
                    </div>
                }) : null}
        </div>
    )
}

function AddPost(){
    const {setPost} = useContext(PostContext)

    const [{ title, content }, dispatch] = useReducer(reducer, initialState)

    const handleData = (e)=>{
        dispatch({
            type: "Handle Data",
            field: e.target.name,
            payload: e.target.value
        })
    }

    function handleAddPostDetails(){
        setPost((posts)=> [...posts, {title, content}])
    }

    return (
        <div className={styles.addPost}>  
            <div className={styles.postTitle}>
                <input type="text" name="title" value={title} onChange={(e)=> handleData(e)} className={styles.postTitle} placeholder='post title'/>
            </div>
            <div className={styles.postContent}>
                <textarea className={styles.content} name="content" value={content} onChange={(e)=> handleData(e)} cols="40" rows="1" placeholder='post content'></textarea>
            </div>
            <button onClick={handleAddPostDetails} className={styles.addPostBtn}>Add Post</button>
        </div>
    )
}
