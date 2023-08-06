import { StoreProvider } from "easy-peasy";
import { Route, Routes } from "react-router-dom";

import {createAppStore} from "./store/store"
import { PostCount, Layout, UserCount, RequireAuth, PublicLayout } from "./components";
import { About, EditPost, Home, Missing, NewPost, PostPage, Login, SignUp, Users, Unauthorized } from "./pages";

const ROLES = { User: 2001, Admin: 3001, Moderator: 5001 };
const store = createAppStore()

const App = () => (
  <StoreProvider store={store}>

  <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="/" element={<PublicLayout children={<><Home /><PostCount /></>} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<PublicLayout children={<Unauthorized />} />} />
        <Route path="/about" element={<PublicLayout children={<About />} />} />

        {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/post" element={<PublicLayout children={ <NewPost />} /> } />
            <Route path="/post/:id" element={<PublicLayout children={ <PostPage />} />} />
            <Route path="/edit/:id" element={<PublicLayout children={ <EditPost />} />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/users" element={<PublicLayout children={<><Users /><UserCount /> </>} />} />
          </Route>
          
        {/* catch all */}
        <Route path="*" element={<PublicLayout children={<Missing />} />} />

      </Route>
    </Routes>
  </StoreProvider>

);

export default App;