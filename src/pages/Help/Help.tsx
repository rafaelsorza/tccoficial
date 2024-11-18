import React, { useState } from 'react';
import './Help.css';
import Sidebar from '../../components/sidebar/sidebar';

const HelpMenu: React.FC = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    return (
        <>
        <Sidebar/>
        <div className="help-menu-container">
            <div className="menu-section" onClick={() => toggleSection('Como posso me cadastrar na plataforma?')}>
                <div className="menu-title">Como posso me cadastrar na plataforma?</div>
                {openSection === 'Como posso me cadastrar na plataforma?' && (
                    <ul className="submenu">
                        <li>Você pode se cadastrar clicando no botão de "Cadastrar" ou "Registrar" e preenchendo suas informações.</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('Onde encontro informações sobre privacidade e segurança dos meus dados?')}>
                <div className="menu-title">Onde encontro informações sobre privacidade e segurança dos meus dados?</div>
                {openSection === 'Onde encontro informações sobre privacidade e segurança dos meus dados?' && (
                    <ul className="submenu">
                        <li>As informações sobre privacidade e segurança estão geralmente na seção de "Termos de Uso" ou "Política de Privacidade" do site.</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('Existe um suporte ao cliente disponível em caso de dúvidas?')}>
                <div className="menu-title">Existe um suporte ao cliente disponível em caso de dúvidas?</div>
                {openSection === 'Existe um suporte ao cliente disponível em caso de dúvidas?' && (
                    <ul className="submenu">
                        <li>Sim, normalmente há um suporte ao cliente que pode ser contatado por e-mail, chat ou telefone.</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('Como posso atualizar minhas informações pessoais?')}>
                <div className="menu-title">Como posso atualizar minhas informações pessoais?</div>
                {openSection === 'Como posso atualizar minhas informações pessoais?' && (
                    <ul className="submenu">
                        <li>Você pode atualizar suas informações acessando sua conta e editando os dados na seção "Perfil" ou "Configurações".</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('O site oferece conteúdo em diferentes idiomas?')}>
                <div className="menu-title">O site oferece conteúdo em diferentes idiomas?</div>
                {openSection === 'O site oferece conteúdo em diferentes idiomas?' && (
                    <ul className="submenu">
                        <li>Sim, muitos sites têm a opção de escolher o idioma no canto superior ou inferior da página.</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('Quais recursos interativos estão disponíveis')}>
                <div className="menu-title">Quais recursos interativos estão disponíveis</div>
                {openSection === 'Quais recursos interativos estão disponíveis' && (
                    <ul className="submenu">
                        <li>Você pode encontrar fóruns, chats ao vivo ou grupos de discussão, dependendo da plataforma.</li>
                    </ul>
                )}
            </div>

            <div className="menu-section" onClick={() => toggleSection('Onde posso encontrar avaliações ou depoimentos de outros usuários?')}>
                <div className="menu-title">Onde posso encontrar avaliações ou depoimentos de outros usuários?</div>
                {openSection === 'Onde posso encontrar avaliações ou depoimentos de outros usuários?' && (
                    <ul className="submenu">
                        <li>As avaliações costumam estar na seção de "Testemunhos" ou "Avaliações" do site. Você também pode verificar redes sociais ou fóruns externos.</li>
                    </ul>
                )}
            </div>
        </div>
        </>
    );
};

export default HelpMenu;