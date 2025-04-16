import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from '@headlessui/react'
import { Fragment } from 'react'
import { usePokemonContext, Pokemon } from "../context/PokemonContext";

export default function TablePage() {
  const { pokemons } = usePokemonContext();
  
  const [memes, setMemes] = useState<Pokemon[]>([]);
  const [editingMeme, setEditingMeme] = useState<Pokemon | null>(null)
 
  const handleEdit = (meme: Pokemon) => setEditingMeme(meme)

  useEffect(() => {
  const savedMemes = localStorage.getItem('memes');
  if (savedMemes) {
    setMemes(JSON.parse(savedMemes));
  } else {
    setMemes(pokemons);
     console.log(pokemons)
  }
}, [pokemons]);


  const handleSave = () => {
    if (!editingMeme) return

    // Оновити мем у списку
    const updatedMemes = memes.map((m:Pokemon) => (m.id === editingMeme.id ? editingMeme : m))
    setMemes(updatedMemes)

    // Зберегти в localStorage
    localStorage.setItem('memes', JSON.stringify(updatedMemes))

    setEditingMeme(null)
  }

  return (
    <div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Likes</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {memes.map((meme: Pokemon) => (
              <tr key={meme.id}>
                <td className="px-6 py-4">{meme.id}</td>
                <td className="px-6 py-4">{meme.name}</td>
                <td className="px-6 py-4">{meme.likes}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(meme)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <Transition appear show={!!editingMeme} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setEditingMeme(null)}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Edit Meme
                    </DialogTitle>
                    <div className="mt-4">
                      <label className="block mb-1">Name:</label>
                      <input
                        type="text"
                        className="border w-full mb-2 p-2"
                        placeholder="Enter meme name"
                        value={editingMeme?.name}
                        onChange={(e) =>
                          setEditingMeme({ ...editingMeme!, name: e.target.value })
                        }
                      />
                      <label className="block mb-1">Image URL:</label>
                      <input
                        type="text"
                        className="border w-full mb-2 p-2"
                        value={editingMeme?.url}
                        placeholder="Enter meme image url"
                        onChange={(e) =>
                          setEditingMeme({ ...editingMeme!, url: e.target.value })
                        }
                      />
                      <label className="block mb-1">Likes:</label>
                      <input
                        type="number"
                        placeholder="Enter number of likes"
                        min={0}
                        max={99}
                        className="border w-full mb-2 p-2"
                        value={editingMeme?.likes}
                        onChange={(e) =>
                          setEditingMeme({ ...editingMeme!, likes: parseInt(e.target.value) })
                        }
                      />
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                       type="button"
                        onClick={handleSave}
                        className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingMeme(null)}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  )
}
