'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

export function AddProjectModal({ onClose, onAdd, existingCategories }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '',
  });

  const [newCategory, setNewCategory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      alert('Please fill all fields');
      return;
    }
    onAdd({
      ...formData,
      price: parseFloat(formData.price),
      images: formData.imageUrl ? [formData.imageUrl] : [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 w-full max-w-xl space-y-4 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-semibold text-lg">Add Project</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg resize-none"
        />

        {!newCategory ? (
          <div className="flex gap-2">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              {existingCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button type="button" onClick={() => setNewCategory(true)} className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-1">
              <Plus size={16} /> New
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button type="button" onClick={() => { setNewCategory(false); setFormData({ ...formData, category: '' }) }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          </div>
        )}

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="url"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button type="submit" className="w-full py-2 bg-[#00E5FF] text-black rounded-lg">Add Project</button>
      </form>
    </div>
  );
}
