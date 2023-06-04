import { Navigate, Route, Routes } from "react-router-dom"

import CategoryEditor from "../pages/category-editor"
import Category from "../pages/category/index"
import Dashboard from "../pages/dashboard"
import Notes from "../pages/note"
import NoteEditor from "../pages/note-editor"
import Photo from "../pages/photo"
import NotFound from "../pages/404"
import Datapacks from "../pages/datapack"
import DatapacksEditor from "../pages/datapack-editor"

export default () => {
  return <>
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="note" element={<Notes />} />
      <Route path="note/add" element={<NoteEditor />} />
      <Route path="note/edit/:id" element={<NoteEditor />} />

      <Route path="category" element={<Category />} />
      <Route path="category/add" element={<CategoryEditor />} />
      <Route path="category/add/:id" element={<CategoryEditor />} />
      <Route path="category/edit/:id" element={<CategoryEditor />} />

      <Route path="datapack" element={<Datapacks />} />
      <Route path="datapack/add" element={<DatapacksEditor />} />
      <Route path="datapack/edit/:id" element={<DatapacksEditor/>} />

      <Route path="file/photo" element={<Photo />} />

      <Route path="404" element={<NotFound />} />

      <Route path="login" element={<Navigate to='/' />} />
      <Route path="*" element={<Navigate to='404' />} />
    </Routes>
  </>
}