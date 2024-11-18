import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../Auth/Login/firebase-config'; // ajuste o caminho conforme necessário
import './Profile.css'; // Arquivo CSS para estilização
import Sidebar from '../../components/sidebar/sidebar';

const avatarOptions = [
    './avatar1.png',
    './avatar2.png',
    './avatar3.png',
    './avatar4.png',
    './avatar5.png',
    './avatar6.png',
    './avatar7.png',
    './avatar8.png',
];

const Profile: React.FC = () => {
    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;

    const [displayName, setDisplayName] = useState<string>(''); // Nome do usuário
    const [email, setEmail] = useState<string>(''); // Email do usuário
    const [password, setPassword] = useState<string>(''); // Senha nova do usuário
    const [profilePicture, setProfilePicture] = useState<File | null>(null); // Foto de perfil
    const [selectedAvatar, setSelectedAvatar] = useState<string>(''); // Avatar selecionado

    // Função para buscar os dados do usuário ao carregar a página
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setDisplayName(userDoc.data()?.displayName || ''); // Nome atual do usuário
                    setEmail(userDoc.data()?.email || ''); // Email atual do usuário
                    setSelectedAvatar(userDoc.data()?.photoURL || '/avatars/avatar1.png'); // Avatar atual
                }
            }
        };

        fetchUserData();
    }, [user]);

    // Função para atualizar os dados do perfil
    const handleProfileUpdate = async () => {
        if (!user) return;

        try {
            // Atualiza o nome e o email do usuário
            await updateProfile(user, { displayName });
            if (email) await updateEmail(user, email);
            if (password) await updatePassword(user, password);

            // Atualiza os dados no Firestore
            await setDoc(doc(db, 'users', user.uid), { displayName, email }, { merge: true });
        } catch (error) {
            console.error('Erro ao atualizar perfil: ', error);
        }
    };

    // Função para atualizar a foto de perfil
    const handleProfilePictureUpload = async () => {
        if (!user || !profilePicture) return;

        const storageRef = ref(storage, `profile_pictures/${user.uid}`);

        try {
            await uploadBytes(storageRef, profilePicture);
            const photoURL = await getDownloadURL(storageRef);

            await updateProfile(user, { photoURL });
            await setDoc(doc(db, 'users', user.uid), { photoURL }, { merge: true });
        } catch (error) {
            console.error('Erro ao atualizar foto de perfil: ', error);
        }
    };

    // Função para selecionar o avatar
    const handleAvatarSelection = async (avatar: string) => {
        if (!user) return;

        setSelectedAvatar(avatar);

        try {
            await updateProfile(user, { photoURL: avatar });
            await setDoc(doc(db, 'users', user.uid), { photoURL: avatar }, { merge: true });
        } catch (error) {
            console.error('Erro ao atualizar avatar: ', error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="profile-container">
                <div className="main-content">
                    <div className="profile-section">
                        <div className="profile-form">
                            <label>Nome:</label>
                            {/* Campo de texto com o nome atual do usuário */}
                            <input
                                type="text"
                                value={displayName} // Nome é exibido no input
                                onChange={(e) => setDisplayName(e.target.value)} // Atualiza o estado ao alterar
                                placeholder="Nome de usuário"
                            />
                            <label>Email:</label>
                            {/* Campo de texto com o email atual do usuário */}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao alterar
                                placeholder="Email"
                            />
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao alterar
                                placeholder="Nova senha"
                            />
                            <button onClick={handleProfileUpdate}>Atualizar Perfil</button>
                        </div>
                        <div className="profile-picture-section">
                            <div className="profile-picture-preview">
                                {/* Exibição da foto de perfil ou avatar */}
                                <img
                                    src={selectedAvatar || (profilePicture ? URL.createObjectURL(profilePicture) : 'default-profile.png')}
                                    alt="Profile"
                                    className="current-avatar"
                                />
                            </div>
                            <h3>Escolha um avatar</h3>
                            <div className="avatar-options">
                                {/* Lista de avatares para o usuário escolher */}
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
        </>
    );
};

export default Profile;
