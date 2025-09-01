import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Account from './pages/Account.tsx'
import Settings from './pages/Settings.tsx'
import Category from './pages/Category.tsx'
import StoryPlayer from './pages/StoryPlayer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='account' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='category/:categoryId' element={<Category />} />
          <Route path='story/:storyId/player' element={<StoryPlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
