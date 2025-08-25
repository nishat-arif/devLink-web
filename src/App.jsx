
import { BrowserRouter, Routes  , Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import { Provider } from "react-redux"
import appStore from "./utils/store/appStore"
import Connections from "./components/Connections"
import Requests from "./components/Requests";
import Error from "./components/Error"
import Password from "./components/Password"
import Chat from "./components/Chat"
import Premium from "./components/Premium"

function App() {


  return (
      <Provider store = {appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path ="/" element = {<Body/>}>  
                <Route path="/" element = {<Feed/>} />
                <Route path="/login" element = {<Login/>}/>     
                <Route path="/profile" element = {<Profile/>}/>
                <Route path="/profile/password" element = {<Password/>}/>
                <Route path="/connections" element={<Connections/>}/>
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/chat/:targetUserId" element={<Chat/>}/>
                <Route path="/premium" element={<Premium/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        </Provider>

  )
}

export default App
