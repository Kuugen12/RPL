import React, { useEffect, useState, useContext } from "react";
import userService from '../services/userService';
import riwayatService from '../services/riwayatService';
import { AuthContext } from '../context/AuthContext';

const UsersAdmin = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    
    const fetchUsers = async () => {
      try {
        const res = await userService.getAll();
        console.log('📥 Response from backend:', res.data);
        
        // Response format: { success: true, data: [...] }
        if (res.data.success && Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else if (Array.isArray(res.data)) {
          // Jika backend langsung return array
          setUsers(res.data);
        } else {
          console.error('❌ Unexpected response format:', res.data);
          setError('Format data tidak valid');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching users:', err);
        setError(err.message || 'Gagal memuat data users');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [user]);

  const lihatRiwayat = async (userId) => {
    try {
      const res = await riwayatService.getByUserId(userId);
      setSelectedUser(userId);
      
      // Response format: { success: true, data: [...] }
      if (res.data.success && Array.isArray(res.data.data)) {
        setRiwayat(res.data.data);
      } else if (Array.isArray(res.data)) {
        setRiwayat(res.data);
      } else {
        setRiwayat([]);
      }
    } catch (err) {
      console.error('❌ Error fetching riwayat:', err);
      setRiwayat([]);
    }
  };

  const hapusUser = async (userId) => {
    if (window.confirm("Hapus user ini?")) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        setRiwayat([]);
        setSelectedUser(null);
      } catch (err) {
        alert(err.message || 'Gagal menghapus user');
      }
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div style={{padding: "2rem", textAlign: "center"}}>
        <h2>❌ Akses Ditolak</h2>
        <p>Halaman ini hanya dapat diakses oleh admin.</p>
      </div>
    );
  }

  if (loading) {
    return <div style={{padding: "2rem"}}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{padding: "2rem", color: "red"}}>
        <h3>Error:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{maxWidth: 1100, margin: "0 auto", padding: "2rem"}}>
      <h1>Kelola User</h1>
      
      {users.length === 0 ? (
        <p>Belum ada user terdaftar.</p>
      ) : (
        <table style={{width:"100%", borderCollapse:"collapse", marginBottom:"2rem", border: "1px solid #ddd"}}>
          <thead style={{background:"#e9ecef"}}>
            <tr>
              <th style={{padding: "10px", border: "1px solid #ddd"}}>Username</th>
              <th style={{padding: "10px", border: "1px solid #ddd"}}>Email</th>
              <th style={{padding: "10px", border: "1px solid #ddd"}}>Role</th>
              <th style={{padding: "10px", border: "1px solid #ddd"}}>Daftar Sejak</th>
              <th style={{padding: "10px", border: "1px solid #ddd"}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{background: selectedUser===u.id ? "#f3f7ff" : "white"}}>
                <td style={{padding: "10px", border: "1px solid #ddd"}}>{u.username}</td>
                <td style={{padding: "10px", border: "1px solid #ddd"}}>{u.email}</td>
                <td style={{padding: "10px", border: "1px solid #ddd"}}>
                  <span className={u.role === 'admin' ? "badge bg-danger" : "badge bg-secondary"}>
                    {u.role}
                  </span>
                </td>
                <td style={{padding: "10px", border: "1px solid #ddd"}}>
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString("id-ID") : '-'}
                </td>
                <td style={{padding: "10px", border: "1px solid #ddd"}}>
                  <button onClick={()=>lihatRiwayat(u.id)} style={{marginRight:10, padding: "5px 10px"}}>
                    Riwayat
                  </button>
                  <button 
                    onClick={()=>hapusUser(u.id)} 
                    style={{background:"#dc3545", color:"white", padding: "5px 10px", border: "none", cursor: "pointer"}}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {selectedUser && (
        <div style={{marginBottom:"2rem"}}>
          <h3>Riwayat Akses User: {users.find(u=>u.id===selectedUser)?.username}</h3>
          <table style={{width:"100%", borderCollapse:"collapse", border: "1px solid #ddd"}}>
            <thead style={{background:"#e9ecef"}}>
              <tr>
                <th style={{padding: "10px", border: "1px solid #ddd"}}>Waktu</th>
                <th style={{padding: "10px", border: "1px solid #ddd"}}>Aktivitas</th>
                <th style={{padding: "10px", border: "1px solid #ddd"}}>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length===0 ? (
                <tr>
                  <td colSpan={3} style={{padding: "10px", textAlign: "center"}}>
                    Belum ada riwayat akses
                  </td>
                </tr>
              ) : riwayat.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding: "10px", border: "1px solid #ddd"}}>
                    {new Date(r.timestamp).toLocaleString("id-ID")}
                  </td>
                  <td style={{padding: "10px", border: "1px solid #ddd"}}>{r.activity}</td>
                  <td style={{padding: "10px", border: "1px solid #ddd"}}>{r.ipAddress || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;
