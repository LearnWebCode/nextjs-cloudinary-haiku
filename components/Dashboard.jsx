import Link from "next/link"
import Haiku from "@/components/Haiku"
import { getCollection } from "@/lib/db"
import DeleteForm from "@/components/DeleteForm"

async function usersHaikus(id) {
  const haikusCollection = await getCollection("haikus")
  const results = await haikusCollection.find({ author: id }).sort({ _id: -1 }).toArray()
  return results
}

export default async function Dashboard(props) {
  console.log(props)
  const haikus = await usersHaikus(props.user)

  if (haikus.length == 0) {
    return (
      <div>
        <p className="text-xl text-gray-400 max-w-lg text-center mx-auto">
          You have not created any haikus yet. Use the button in the header area to create your first haiku!
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[650px] mx-auto">
      <h2 className="text-center text-2xl text-gray-600 mb-5">Your Haikus</h2>
      {haikus.map((haiku, index) => {
        haiku._id = haiku._id.toString()
        haiku.author = haiku.author.toString()
        return (
          <div key={index} className="relative mb-7">
            <Haiku haiku={haiku} photo={haiku.photo} />

            <div className="absolute bottom-2 right-2 flex">
              <Link
                className="inline-block mr-1 bg-black/40 hover:bg-black/50 p-1 text-white/60 hover:text-white/80 rounded"
                href={`/edit/${haiku._id}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path
                    fillRule="evenodd"
                    d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <DeleteForm id={haiku._id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
