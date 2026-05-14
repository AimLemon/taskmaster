import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './Dashboard.css';

const Dashboard = () => {
    // State Management
    const [user, setUser] = useState({ name: '', email: '' });
    const [tasks, setTasks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    // State Modal Detail & Edit
    const [detailTask, setDetailTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        id: '', title: '', deadline: '', description: ''
    });

    // State Grouping & Form Tambah
    const [openSubjects, setOpenSubjects] = useState({});
    const [isNewSubject, setIsNewSubject] = useState(false);
    const [form, setForm] = useState({
        subject: '', title: '', description: '', deadline: '', priority: 'Normal', color: '#3b82f6'
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ name: decoded.name, email: decoded.email });
                fetchTasks(token);
            } catch (err) {
                window.location.href = "/";
            }
        }
    }, []);

    const fetchTasks = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.log("Gagal mengambil data");
        }
    };

    // --- FUNGSI CREATE ---
    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            await axios.post('http://localhost:5000/tasks', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowAddModal(false);
            setForm({ subject: '', title: '', description: '', deadline: '', priority: 'Normal', color: '#3b82f6' });
            setIsNewSubject(false);
            fetchTasks(token);
        } catch (err) {
            alert("Gagal menyimpan tugas");
        }
    };

    // --- FUNGSI UPDATE (EDIT) ---
    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        try {
            await axios.patch(`http://localhost:5000/tasks/${editForm.id}`, editForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEditing(false);
            setDetailTask(null);
            fetchTasks(token);
            alert("Tugas berhasil diperbarui!");
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui tugas");
        }
    };

    // --- FUNGSI DELETE ---
    const handleDelete = async (id) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus tugas ini?")) {
            const token = localStorage.getItem('accessToken');
            try {
                await axios.delete(`http://localhost:5000/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDetailTask(null);
                fetchTasks(token);
                alert("Tugas berhasil dihapus!");
            } catch (err) {
                alert("Gagal menghapus tugas");
            }
        }
    };

    // Logic Grouping
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.subject]) acc[task.subject] = [];
        acc[task.subject].push(task);
        return acc;
    }, {});

    const existingSubjects = Object.keys(groupedTasks);
    const toggleSubject = (subj) => setOpenSubjects(prev => ({ ...prev, [subj]: !prev[subj] }));

    const getRemainingDays = (deadline) => {
        const target = new Date(deadline);
        const today = new Date();
        today.setHours(0,0,0,0);
        const diffTime = target - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) return `${diffDays} Hari`;
        if (diffDays === 0) return "Hari Ini";
        return "Lewat";
    };

    return (
        <div className="dashboard-container">
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="brand-section">
                    <div className="logo-placeholder">🕒</div>
                    <div className="brand-text">
                        <h1>Task Remainder</h1>
                        <p>Hai, {user.name}!</p>
                    </div>
                </div>
                <div className="nav-actions">
                    <button className="btn-add-task" onClick={() => setShowAddModal(true)}>Tambah tugas +</button>
                    <div className="profile-container" onClick={() => setShowProfileModal(true)}>
                        <div className="profile-circle">👤</div>
                        <span>Profil</span>
                    </div>
                </div>
            </nav>

            {/* PROGRESS BAR */}
            <div className="progress-section">
                <div className="progress-card">
                    <div className="progress-header">
                        <span>Progres Tugas {tasks.filter(t=>t.isCompleted).length}/{tasks.length}:</span>
                        <span>{tasks.length > 0 ? Math.round((tasks.filter(t=>t.isCompleted).length / tasks.length) * 100) : 0}%</span>
                    </div>
                    <div className="bar-outer">
                        <div className="bar-inner" style={{ width: `${tasks.length > 0 ? (tasks.filter(t=>t.isCompleted).length / tasks.length) * 100 : 0}%` }}></div>
                    </div>
                </div>
            </div>

            {/* GRID VIEW */}
            <div className="task-grid">
                {existingSubjects.map(subj => (
                    <div key={subj} className="subject-group-card">
                        <div className="subject-header-clickable" 
                             style={{ borderLeft: `6px solid ${groupedTasks[subj][0].color}` }}
                             onClick={() => toggleSubject(subj)}>
                            <div className="subj-info">
                                <span className="dot" style={{ backgroundColor: groupedTasks[subj][0].color }}></span>
                                <h3>{subj}</h3>
                            </div>
                            <span className={`arrow ${openSubjects[subj] ? 'up' : 'down'}`}>▼</span>
                        </div>
                        {openSubjects[subj] && (
                            <div className="task-dropdown-list">
                                {groupedTasks[subj].map(task => (
                                    <div key={task.id} className="task-item-row" onClick={() => setDetailTask(task)}>
                                        <div className="task-main-info">
                                            <span className="task-title-mini">{task.title}</span>
                                            <span className="task-date-mini">📅 {task.deadline}</span>
                                        </div>
                                        <span className="task-days-mini">{getRemainingDays(task.deadline)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* MODAL: DETAIL & EDIT */}
            {detailTask && (
                <div className="modal-overlay">
                    <div className="modal-box detail-box">
                        <button className="btn-close-x" onClick={() => {setDetailTask(null); setIsEditing(false);}}>×</button>
                        {!isEditing ? (
                            <>
                                <h3 style={{ color: detailTask.color }}>{detailTask.subject}</h3>
                                <div className="detail-body">
                                    <p><strong>Judul:</strong> {detailTask.title}</p>
                                    <p><strong>Deadline:</strong> {detailTask.deadline}</p>
                                    <p><strong>Sisa Waktu:</strong> {getRemainingDays(detailTask.deadline)}</p>
                                </div>
                                <div className="detail-actions">
                                    <button className="btn-edit-action" onClick={() => { setEditForm(detailTask); setIsEditing(true); }}>Edit</button>
                                    <button className="btn-delete-action" onClick={() => handleDelete(detailTask.id)}>Hapus</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <h3>Edit Tugas</h3>
                                <div className="input-group">
                                    <label>Judul</label>
                                    <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required />
                                </div>
                                <div className="input-group">
                                    <label>Deadline</label>
                                    <input type="date" value={editForm.deadline} onChange={e => setEditForm({...editForm, deadline: e.target.value})} required />
                                </div>
                                <div className="detail-actions">
                                    <button type="submit" className="btn-edit-action">Simpan</button>
                                    <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Batal</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL: TAMBAH TUGAS */}
            {showAddModal && (
                <div className="modal-overlay">
                    <form className="modal-box" onSubmit={handleSave}>
                        <button type="button" className="btn-close-x" onClick={() => setShowAddModal(false)}>×</button>
                        <h3>Buat Tugas Baru</h3>
                        <div className="input-group">
                            <label>Mata Kuliah</label>
                            {!isNewSubject && existingSubjects.length > 0 ? (
                                <div className="subject-select-wrapper">
                                    <select value={form.subject} required onChange={e => setForm({...form, subject: e.target.value})}>
                                        <option value="">Pilih Matkul</option>
                                        {existingSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <button type="button" className="btn-toggle-new" onClick={() => { setIsNewSubject(true); setForm({...form, subject: ''}) }}>+ Baru</button>
                                </div>
                            ) : (
                                <div className="subject-select-wrapper">
                                    <input type="text" placeholder="Matkul Baru" value={form.subject} required onChange={e => setForm({...form, subject: e.target.value})} />
                                    {existingSubjects.length > 0 && <button type="button" className="btn-toggle-new" onClick={() => setIsNewSubject(false)}>Batal</button>}
                                </div>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Judul Tugas</label>
                            <input type="text" value={form.title} required onChange={e => setForm({...form, title: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Deadline</label>
                            <input type="date" value={form.deadline} required onChange={e => setForm({...form, deadline: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Warna Card</label>
                            <input type="color" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
                        </div>
                        <button type="submit" className="btn-submit-form">Simpan Tugas</button>
                    </form>
                </div>
            )}

            {/* MODAL: PROFILE */}
            {showProfileModal && (
                <div className="modal-overlay">
                    <div className="modal-box profile-box">
                        <button className="btn-close-x" onClick={() => setShowProfileModal(false)}>×</button>
                        <div className="avatar-large">👤</div>
                        <p><strong>Nama:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button className="btn-logout" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;