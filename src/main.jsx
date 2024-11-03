import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  SignUp,
  Login,
  ChangePassword,
  UpdateAccountDetails,
  WatchHistory,
  AuthLayout,
  Profile,
  Dashboard,
} from "./Components/Authentication/authentication.js";

import {
  Home,
  Info,
  Subscription,
  LikedVideos,
  Playlist,
  YourVideos,
  SearchResults,
} from "./Pages/pages.js";
import {
  PublishVideo,
  PlayVideo,
  UserChannel,
  EditVideo,
} from "./Components/Configuration/vid.js";

//Vercel Analytics
// import { Analytics } from "@vercel/analytics/react";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <title>Next.js</title>
//       </head>
//       <body>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   );
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={<AuthLayout authentication={false}>{<Home />}</AuthLayout>}
      />
      <Route
        path="/signup"
        element={<AuthLayout authentication={false}>{<SignUp />}</AuthLayout>}
      />
      <Route
        path="/login"
        element={<AuthLayout authentication={false}>{<Login />}</AuthLayout>}
      />
      <Route
        path="/update-details"
        element={
          <AuthLayout authentication>{<UpdateAccountDetails />}</AuthLayout>
        }
      />
      <Route
        path="/change-password"
        element={<AuthLayout authentication>{<ChangePassword />}</AuthLayout>}
      />
      <Route
        path="/:username/profile"
        element={<AuthLayout authentication>{<Profile />}</AuthLayout>}
      />
      <Route
        path="/publish-video"
        element={<AuthLayout authentication>{<PublishVideo />}</AuthLayout>}
      />
      <Route
        path="/channel/:username/video/:videoId/edit"
        element={<AuthLayout authentication>{<EditVideo />}</AuthLayout>}
      />
      <Route
        path="/channel/:username"
        element={<AuthLayout authentication>{<UserChannel />}</AuthLayout>}
      />
      <Route
        path="/channel/dashboard/stats"
        element={<AuthLayout authentication>{<Dashboard />}</AuthLayout>}
      />

      {/* All-time accessible routes */}
      <Route path="/watch/:videoId" element={<PlayVideo />} />
      <Route path="/history" element={<WatchHistory />} />
      <Route path="/NexClip/info" element={<Info />} />
      <Route path="/results" element={<SearchResults />} />

      {/* UPCOMING PAGES */}
      <Route path="/playlists" element={<Playlist />} />
      <Route path="/liked-videos" element={<LikedVideos />} />
      <Route path="/:subscriberId/mysubscriptions" element={<Subscription />} />
      <Route path="/your-videos" element={<YourVideos />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
