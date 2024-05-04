import {Route, Routes} from 'react-router-dom';
import Posts from './features/Posts/posts';
import Register from './features/Users/Register';
import Login from './features/Users/Login';
import PostsForm from './features/Posts/postsForm';
import Comments from './features/Comments/Comments';
import AppToolbar from './components/AppToolBar';


function App() {
    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new" element={<PostsForm />} />
                <Route path="/post/:id" element={<Comments />} />
            </Routes>
        </>
    )
}

export default App;
