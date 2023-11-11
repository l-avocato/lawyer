
import React,{useState} from 'react'


const AddClientModal = () => {
    const [isAddClientModalOpen, setAddClientModalOpen] = useState(false);
const [newClient, setNewClient] = useState({ fullname: '', email: '', age: 0 });

  return (
    <div className="modal">
      <form >
        <label>
          Full Name:
          <input
            type="text"
            value={newClient.fullname}
            onChange={(e) => setNewClient({ ...newClient, fullname: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: parseInt(e.target.value, 10) })}
          />
        </label>
        <button type="submit">Add Client</button>
      </form>
      <button onClick={() => setAddClientModalOpen(false)}>Close</button>
    </div>
  );
};

export default AddClientModal