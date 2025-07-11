import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [visible, setVisible] = useState(false); // toggle for show/hide

  const fetchContacts = async () => {
    const res = await axios.get('http://localhost:5000/api/contacts');
    setContacts(res.data);
    setVisible(true);
  };

  const hideContacts = () => {
    setContacts([]);
    setVisible(false);
  };

  const addContact = async () => {
    if (!form.name || !form.email || !form.phone) {
      return alert("Fill all fields");
    }
    await axios.post('http://localhost:5000/api/contacts', form);
    setForm({ name: '', email: '', phone: '' });

    if (visible) fetchContacts(); // refresh list only if visible
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    if (visible) fetchContacts();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📇 Contact Keeper</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <button onClick={addContact}>Add Contact</button>

      <hr />

      {!visible ? (
        <button onClick={fetchContacts}>📂 Show Existing Contacts</button>
      ) : (
        <button onClick={hideContacts}>🙈 Hide Contacts</button>
      )}

      {visible && contacts.length > 0 && (
        <ul>
          {contacts.map(c => (
            <li key={c._id}>
              {c.name} ({c.email}, {c.phone})
              <button onClick={() => deleteContact(c._id)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      {visible && contacts.length === 0 && <p>No contacts found.</p>}
    </div>
  );
}

export default App;
