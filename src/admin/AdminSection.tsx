import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { subscribeToCollection, addItem, updateItem, deleteItem } from '../services/dataService';
import { cn } from '../lib/utils';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
}

export default function AdminSection({ 
  collectionName, 
  title, 
  fields 
}: { 
  collectionName: string; 
  title: string; 
  fields: Field[]; 
}) {
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(collectionName, setItems);
    return () => unsubscribe();
  }, [collectionName]);

  const handleEdit = (item: any) => {
    setFormData(item);
    setIsEditing(item.id);
    setShowAddForm(false);
  };

  const handleAdd = () => {
    setFormData({});
    setShowAddForm(true);
    setIsEditing(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isEditing) {
        const { id, ...data } = formData;
        await updateItem(collectionName, id, data);
        setIsEditing(null);
      } else {
        await addItem(collectionName, formData);
        setShowAddForm(false);
      }
      setFormData({});
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(collectionName, id);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{title} Items</h2>
        <button 
          onClick={handleAdd}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
        >
          <Plus size={18} />
          Add New {title}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {(showAddForm || isEditing) && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              {isEditing ? `Edit ${title}` : `Add New ${title}`}
            </h3>
            <button 
              onClick={() => { setIsEditing(null); setShowAddForm(false); }}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name} className={cn(field.type === 'textarea' ? "md:col-span-2" : "")}>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 min-h-[120px] transition-colors"
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-teal-500 transition-colors"
                    required
                  />
                )}
              </div>
            ))}
            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <button 
                type="button"
                onClick={() => { setIsEditing(null); setShowAddForm(false); }}
                className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100"
              >
                <Save size={18} />
                Save {title}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="font-bold text-slate-900 truncate pr-4">{item.title || item.name || 'Untitled'}</div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-500 line-clamp-2 mb-4">
              {item.description || item.excerpt || item.content || 'No description provided.'}
            </div>
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                className="w-full h-32 object-cover rounded-xl mb-4" 
                alt="Preview"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>ID: {item.id.slice(0, 8)}...</span>
              {item.order !== undefined && <span>Order: {item.order}</span>}
            </div>
          </div>
        ))}
        {items.length === 0 && !showAddForm && (
          <div className="md:col-span-3 py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="text-slate-300 mb-4 flex justify-center">
              <Plus size={48} />
            </div>
            <p className="text-slate-500 font-medium">No items found. Click "Add New" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
