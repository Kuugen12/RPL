import React, { useEffect, useState, useContext } from "react";
import userService from '../services/userService';
import riwayatService from '../services/riwayatService';
import { AuthContext } from '../context/AuthContext';

const UsersAdmin = () => {
  const { user } = useContext(AuthContext); // Ambil user dari context
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hanya admin bisa akses
  useEffect(() => {
    if (!user || user.role !== "admin") return;
    userService.getAll().then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, [user]);

  const lihatRiwayat = async (userId) => {
    const res = await riwayatService.getByUserId(userId);
    setSelectedUser(userId);
    setRiwayat(res.data);
  };

  const hapusUser = async (userId) => {
    if(window.confirm("Hapus user ini?")) {
      await userService.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      setRiwayat([]);
      setSelectedUser(null);
    }
  };

  if (!user || user.role !== "admin") return <div style={{padding: "2rem"}}>Akses hanya untuk admin.</div>;
  if (loading) return <div style={{padding: "2rem"}}>Loading...</div>;

  return (
    <div style={{maxWidth: 1100, margin: "0 auto", padding: "2rem"}}>
      <h1>Kelola User</h1>
      <table style={{width:"100%", borderCollapse:"collapse", marginBottom:"2rem"}}>
        <thead style={{background:"#e9ecef"}}>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Daftar Sejak</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{background: selectedUser===u.id ? "#f3f7ff" : "white"}}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <span className={u.role === 'admin' ? "badge bg-danger" : "badge bg-secondary"}>
                  {u.role}
                </span>
              </td>
              <td>{new Date(u.createdAt).toLocaleDateString("id-ID")}</td>
              <td>
                <button onClick={()=>lihatRiwayat(u.id)} style={{marginRight:10}}>Riwayat</button>
                <button onClick={()=>hapusUser(u.id)} style={{background:"#dc3545", color:"white"}}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div style={{marginBottom:"2rem"}}>
          <h3>Riwayat Akses User: {users.find(u=>u.id===selectedUser)?.username}</h3>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead style={{background:"#e9ecef"}}>
              <tr>
                <th>Waktu</th>
                <th>Aktivitas</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length===0 ? (
                <tr>
                  <td colSpan={3}>Belum ada riwayat akses</td>
                </tr>
              ) : riwayat.map((r,i)=>(
                <tr key={i}>
                  <td>{new Date(r.timestamp).toLocaleString("id-ID")}</td>
                  <td>{r.activity}</td>
                  <td>{r.ipAddress}</td>
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
