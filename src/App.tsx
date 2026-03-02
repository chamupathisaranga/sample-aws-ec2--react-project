import { useState, useEffect } from 'react'
import './App.css'
import type { Item } from './types/item'
import { itemService } from './services/itemService'

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  // Load items on component mount
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await itemService.getAllItems()
      setItems(data)
    } catch (err) {
      setError('Failed to load items')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    setLoading(true)
    setError(null)
    try {
      if (editingId) {
        // Update existing item
        const updated = await itemService.updateItem(editingId, {
          name: formData.name,
          description: formData.description || undefined,
        })
        setItems(items.map(item => item.id === editingId ? updated : item))
        setEditingId(null)
      } else {
        // Create new item
        const newItem = await itemService.createItem({
          name: formData.name,
          description: formData.description || undefined,
        })
        setItems([...items, newItem])
      }
      setFormData({ name: '', description: '' })
    } catch (err) {
      setError('Failed to save item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: Item) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      description: item.description || '',
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', description: '' })
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      await itemService.deleteItem(id)
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      setError('Failed to delete item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Items Management</h1>
        <p className="subtitle">Manage your items with ease (Dileka)</p>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        <div className="form-container">
          <h2>{editingId ? 'Edit Item' : 'Create New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter item description (optional)"
                disabled={loading}
                rows={3}
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="items-container">
          <h2>Items List ({items.length})</h2>
          {loading && !editingId && <div className="loading">Loading...</div>}

          {items.length === 0 && !loading ? (
            <div className="empty-state">
              <p>No items yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-content">
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                    <small className="item-id">ID: {item.id}</small>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-small btn-edit"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-small btn-delete"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
