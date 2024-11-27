import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Sidebar from '../../components/sidebar/sidebar';
import './calorias.css';

const CaloriasDev: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [foods, setFoods] = useState<any[]>([]);
  const [showFoodList, setShowFoodList] = useState(false);

  // Estado para controlar o modal de edição
  const [editFood, setEditFood] = useState<any | null>(null);

  const handleAddNewFood = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && calories >= 0 && fat >= 0 && protein >= 0) {
      const newFood = { name, calories, fat, protein };
      try {
        await addDoc(collection(db, 'foods'), newFood);
        alert('Alimento adicionado com sucesso!');
        setName('');
        setCalories(0);
        setFat(0);
        setProtein(0);
        setShowForm(false);
        fetchFoods();
      } catch (error) {
        alert('Erro ao adicionar alimento.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const fetchFoods = async () => {
    const foodsCollection = collection(db, 'foods');
    const foodSnapshot = await getDocs(foodsCollection);
    const foodList = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFoods(foodList);
  };
// AVISOS
  const handleDeleteFood = async (foodId: string) => {
    try {
      const foodDoc = doc(db, 'foods', foodId);
      await deleteDoc(foodDoc);
      alert('Alimento excluído com sucesso!');
      fetchFoods();
    } catch (error) {
      alert('Erro ao excluir alimento.');
    }
  };

  const handleEditFoodOpen = (food: any) => {
    setEditFood(food);
  };

  const handleEditFoodSave = async () => {
    if (editFood && editFood.name && editFood.calories >= 0 && editFood.fat >= 0 && editFood.protein >= 0) {
      try {
        const foodDoc = doc(db, 'foods', editFood.id);
        await updateDoc(foodDoc, {
          name: editFood.name,
          calories: editFood.calories,
          fat: editFood.fat,
          protein: editFood.protein,
        });
        alert('Alimento atualizado com sucesso!');
        setEditFood(null);
        fetchFoods();
      } catch (error) {
        alert('Erro ao editar alimento.');
      }
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  };

  useEffect(() => {
    if (showFoodList) {
      fetchFoods();
    }
  }, [showFoodList]);

  return (
    <>
      <Sidebar />
      <div className="dev">
        <h2>Modo Desenvolvedor</h2>
        {!showForm && !showFoodList && (
          <>
            <button onClick={() => setShowForm(true)}>Adicionar Novo Alimento</button>
            <button onClick={() => setShowFoodList(true)}>Exibir Alimentos Cadastrados</button>
          </>
        )}
        {showForm && (
          <div className="add-food-form">
            <h3>Preencha os dados do alimento:</h3>
            <form onSubmit={handleAddNewFood}>
              <div className="form-group">
                <label htmlFor="name">Nome do Alimento:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="calories">Calorias:</label>
                <input type="number" id="calories" value={calories} onChange={(e) => setCalories(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label htmlFor="fat">Gordura:</label>
                <input type="number" id="fat" value={fat} onChange={(e) => setFat(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label htmlFor="protein">Proteína:</label>
                <input type="number" id="protein" value={protein} onChange={(e) => setProtein(Number(e.target.value))} required />
              </div>
              <div className='botslist'> 
              <button type="submit">Adicionar Alimento</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        )}





        {showFoodList && (
          <div className="foods-list">
            <button onClick={() => setShowFoodList(false)}>Voltar</button>
            {foods.length > 0 ? (
              foods.map((food) => (
                <div key={food.id} className="food-item">
                  <p><strong>{food.name}</strong></p>
                  <p>Calorias: {food.calories}</p>
                  <p>Gordura: {food.fat}g</p>
                  <p>Proteína: {food.protein}g</p>
                  <button onClick={() => handleEditFoodOpen(food)}>Editar</button>
                  <button onClick={() => handleDeleteFood(food.id)}>Excluir</button>
                </div>
              ))
            ) : (
              <p>Nenhum alimento cadastrado.</p>
            )}
          </div>
        )}
        {editFood && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h3>Editar Alimento</h3>
              <label>
                Nome:
                <input type="text" value={editFood.name} onChange={(e) => setEditFood({ ...editFood, name: e.target.value })} />
              </label>
              <label>
                Calorias:
                <input type="number" value={editFood.calories} onChange={(e) => setEditFood({ ...editFood, calories: Number(e.target.value) })} />
              </label>
              <label>
                Gordura:
                <input type="number" value={editFood.fat} onChange={(e) => setEditFood({ ...editFood, fat: Number(e.target.value) })} />
              </label>
              <label>
                Proteína:
                <input type="number" value={editFood.protein} onChange={(e) => setEditFood({ ...editFood, protein: Number(e.target.value) })} />
              </label>
              <button onClick={handleEditFoodSave}>Salvar</button>
              <button onClick={() => setEditFood(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CaloriasDev;
