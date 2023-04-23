//הטופס שנפתח כשלוחצים על יצירת פרויקט חדש בדף הבית

import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
//הגדרת משתנים
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  //
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !date || !imageURL) return

    //אחרת , נגדיר את המתשנה פרמטרים 
    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await createProject(params)
    //הצגת הודעה מתאימה 
    toast.success('Project created successfully, will reflect in 30sec.')
    onClose()
  }

  //בעת לחיצה על האיקס - נהפוך את הטופס למידה 0 (בעצם נעלים אותו), ונאפס את השדות
  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }
//איפוס השדות של הטופס
  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        {/* ניצור טופס */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            {/* כותרת הטופס */}
            <p className="font-semibold">Add Project</p>
            {/* כפתור איקס לסגירת הטופס */}
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>


          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
                {/* תמונת הפרויקט */}
              <img
                src={
                  imageURL ||
                  'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                }
                alt="project title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            {/* שדה אינפוט להגדרת הכותרת של הפרויקט, שדה חובה */}
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            {/* , שדה חובה -שדה אינפוט לסכום אותו רוצים לתרום */}
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="cost (ETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            {/* שדה אינפוט למילוי תאריך סיום התוקף של הפרויקט */}
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            {/* שדה להוספת כתובת התמונה של הפרויקט */}
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          > 
          {/* שדה להוספת תיאור הפרויקט */}
            <textarea
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
            {/* כפתור לשליחת הטופס */}
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject