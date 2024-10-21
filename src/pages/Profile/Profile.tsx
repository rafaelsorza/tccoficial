import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../Auth/Login/firebase-config'; // ajuste o caminho conforme necessário
import './Profile.css'; // Arquivo CSS para estilização

const avatarOptions = [
    './avatar1.jfif',
    './avatar2.jfif',
    './avatar3.jfif',

    
];

const Profile: React.FC = () => {
    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;

    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [selectedAvatar, setSelectedAvatar] = useState<string>(''); // Avatar selecionado

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setDisplayName(userDoc.data()?.displayName || '');
                    setEmail(userDoc.data()?.email || '');
                    setSelectedAvatar(userDoc.data()?.photoURL || '/avatars/avatar1.png'); // Avatar atual
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleProfileUpdate = async () => {
        if (!user) return;

        try {
            await updateProfile(user, { displayName });
            if (email) await updateEmail(user, email);
            if (password) await updatePassword(user, password);

            await setDoc(doc(db, 'users', user.uid), { displayName, email }, { merge: true });
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil: ', error);
        }
    };

    const handleProfilePictureUpload = async () => {
        if (!user || !profilePicture) return;

        const storageRef = ref(storage, `profile_pictures/${user.uid}`);

        try {
            await uploadBytes(storageRef, profilePicture);
            const photoURL = await getDownloadURL(storageRef);

            await updateProfile(user, { photoURL });
            await setDoc(doc(db, 'users', user.uid), { photoURL }, { merge: true });

            alert('Foto de perfil atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil: ', error);
        }
    };

    const handleAvatarSelection = async (avatar: string) => {
        if (!user) return;

        setSelectedAvatar(avatar);

        try {
            // Atualiza o avatar no Firebase Auth
            await updateProfile(user, { photoURL: avatar });
            
            // Atualiza o avatar no banco de dados Firestore
            await setDoc(doc(db, 'users', user.uid), { photoURL: avatar }, { merge: true });

            alert('Avatar atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar avatar: ', error);
        }
    };

    return (
        <div className="profile-container">
            
            <div className="main-content">
                <h1>Personal</h1>
                <div className="profile-section">
                    <div className="profile-form">
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Nome de usuário"
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nova senha"
                        />
                        <button onClick={handleProfileUpdate}>Atualizar Perfil</button>
                    </div>
                    <div className="profile-picture-section">
                        <div className="profile-picture-preview">
                            <img
                                src={selectedAvatar || (profilePicture ? URL.createObjectURL(profilePicture) : 'default-profile.png')}
                                alt="Profile"
                                className="current-avatar"
                            />
                        </div>
                  
                        <h3>Escolha um avatar</h3>
                        <div className="avatar-options">
                            {avatarOptions.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                                    onClick={() => handleAvatarSelection(avatar)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
