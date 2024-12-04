import React, { useState } from 'react';
import './Recipes.css';
import RecipeCard from './Recipecard';
import RecipeDetails from './RecipeDetail';
import { faCoffee, faUtensils, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar';

// Interface para receita
export interface Recipe {
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  kcal: string;
  categoria: string;
}

const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('breakfast');

  // Definindo receitas
  const recipes: { [key: string]: Recipe[] } = {
    breakfast: [
      {
        name: "Iogurte com Frutas",
        kcal: "200 kcal",
        categoria: 'Leve',
        image: 'https://i.pinimg.com/736x/81/aa/e0/81aae09a7c17fabea2e489112e8cf078.jpg', // Verifique se a imagem está acessível
        description: '',
        ingredients: [
          "1 xícara de iogurte natural",
          "Granola a gosto",
          "Frutas variadas (banana, morango, kiwi)",
          "Mel a gosto",
        ],
        instructions: [
          "Coloque o iogurte em uma tigela.",
          "Adicione o mel e misture bem.",
          "Acrescente a granola e as frutas por cima.",
          "Sirva imediatamente.",
        ]
      },
      {
        name: "Omelete de Legumes",
      kcal: "150 kcal",
      categoria: "Prático",
      image:
        "https://i.pinimg.com/736x/7f/68/e6/7f68e6a250fcfc9f5b78bccab695528b.jpg",
      ingredients: [
        "2 ovos",
        "1/2 cebola picada",
        "1/4 pimentão picado",
        "1 tomate picado",
        "1 xícara de espinafre",
        "Sal e pimenta a gosto",
      ],
      description: '',
      instructions: [
        "Bata os ovos em uma tigela e tempere com sal e pimenta.",
        "Aqueça o azeite em uma frigideira antiaderente.",
        "Refogue a cebola, pimentão e tomate por alguns minutos.",
        "Adicione o espinafre e refogue até murchar.",
        "Despeje os ovos batidos na frigideira e cozinhe até a omelete estar firme.",
        "Dobre a omelete ao meio e sirva.",
      ],
      },

      {
        name: "Smoothie Verde",
      kcal: "100 kcal",
      categoria: "Prático",
      image:
        "https://i.pinimg.com/736x/72/69/fc/7269fc8fd264b802461a8cae1c671166.jpg",
      ingredients: [
        "1 banana",
        "1 xícara de espinafre",
        "1/2 maçã verde",
        "200 ml de água de coco",
        "1 colher de chia",
      ],
      instructions: [
        "Coloque todos os ingredientes no liquidificador.",
        "Bata até obter uma mistura homogênea.",
        "Sirva imediatamente.",
      ],
      description: ''
      },

      {
        name: "Aveia Overnight",
      kcal: "180 kcal",
     
      categoria: "Leve",
      image:
        "https://i.pinimg.com/736x/67/18/45/671845c12bddd9d4f3f493b3c1159325.jpg",
      ingredients: [
        "1/2 xícara de aveia em flocos",
        "1/2 xícara de leite vegetal",
        "1 colher de chia",
        "1 colher de mel",
        "Frutas frescas (morangos, blueberries)",
      ],
      instructions: [
        "Em um recipiente, misture a aveia, leite vegetal, chia e mel.",
        "Tampe e leve à geladeira durante a noite.",
        "Pela manhã, adicione as frutas frescas por cima.",
        "Sirva frio.",
      ],
      description: ''
      },

     
      // Adicione mais receitas de café da manhã se necessário
    ],
    lunch: [
      {
        name: "Salmão ao Forno com Aspargos",
      kcal: "300 kcal",
     description: '',
      categoria: "Leve",
      image:
        "https://i.pinimg.com/736x/b7/0e/16/b70e16a5ccd81ad7cfdd0b0b9aaba8ac.jpg",
      ingredients: [
        "2 filés de salmão",
        "1 maço de aspargos",
        "1 limão fatiado",
        "2 colheres de sopa de azeite de oliva",
        "1 dente de alho picado",
        "sal e pimenta a gosto",
      ],
      instructions: [
        "Pré-aqueça o forno a 200°C.",
        "Coloque os filés de salmão e os aspargos em uma assadeira.",
        "Regue com azeite de oliva e tempere com alho, sal e pimenta.",
        "Distribua as fatias de limão sobre o salmão e os aspargos.",
        "Asse por 20 minutos ou até o salmão estar cozido.",
        "Sirva imediatamente.",
      ],
      },
      {
        name: "Espaguete de Abobrinha com Molho de Tomate",
        kcal: "180 kcal",
       description: '',
        categoria: "Pratico",
        image:
          "https://i.pinimg.com/736x/06/72/55/067255654cacc13eb74a231c01f9a3b3.jpg",
        instructions: [
          "Corte as abobrinhas em espiral para formar 'espaguete'.",
          "Refogue a cebola e o alho no azeite.",
          "Adicione os tomates e cozinhe até formar um molho.",
          "Misture o 'espaguete' de abobrinha ao molho e cozinhe por 2-3 minutos.",
          "Sirva quente.",
        ],
        ingredients: [
          "2 abobrinhas",
          "1/2 cebola picada",
          "2 dentes de alho picados",
          "2 tomates maduros picados",
          "1 colher de sopa de azeite de oliva",
          "Sal e pimenta a gosto",
        ],
      },
      {
        name: "Sopa de Legumes e Grão-de-Bico",
      kcal: "250 kcal",
     description: '',
      categoria: "Leve",
      image:
        "https://i.pinimg.com/736x/fb/d1/7b/fbd17bb51c0da988ab221379e0acf539.jpg",
      instructions: [
        "Refogue cebola e alho no azeite.",
        "Adicione cenoura, abobrinha, batata e grão-de-bico.",
        "Despeje o caldo de legumes e cozinhe até os legumes ficarem macios.",
        "Tempere com sal e pimenta e sirva quente.",
      ],
      ingredients: [
        "1 cebola picada",
        "2 dentes de alho picados",
        "1 cenoura picada",
        "1 abobrinha picada",
        "2 batatas médias picadas",
        "1 xícara de grão-de-bico cozido",
        "1 litro de caldo de legumes",
        "Sal e pimenta a gosto",
      ],
      },
      {
        name: "Tacos de Alface com Frango",
      kcal: "220 kcal",
      description: "",
      categoria: "Leve",
      image:
        "https://i.pinimg.com/736x/26/2c/b2/262cb2876818c8eb7ed08d53dfcad042.jpg",
      instructions: [
        "Tempere o frango com sal, pimenta e suco de limão.",
        "Separe folhas de alface e use como 'tortillas'.",
        "Coloque o frango, tomate, abacate e coentro sobre as folhas.",
        "Sirva imediatamente.",
      ],
      ingredients: [
        "2 peitos de frango",
        "Suco de 1 limão",
        "8 folhas de alface",
        "1 tomate picado",
        "1 abacate picado",
        "Coentro fresco a gosto",
        "Sal e pimenta a gosto",
      ],
      },
    
     
      // Adicione mais receitas de almoço se necessário
    ],
    dinner: [
      {
      
        name: "Salada de Quinoa com Legumes",
        kcal: "220 kcal",
       description: "",
        categoria: "Leve",
        image:
          "https://i.pinimg.com/736x/8a/ec/6c/8aec6c96573d5ea59447d0997c7d7757.jpg",
        instructions: [
          "Cozinhe a quinoa em 2 xícaras de água até a água ser absorvida.",
          "Deixe esfriar e misture com legumes e hortelã.",
          "Tempere com suco de limão, azeite, sal e pimenta.",
          "Sirva frio.",
        ],
        ingredients: [
          "1 xícara de quinoa",
          "2 xícaras de água",
          "1 pepino picado",
          "1 tomate picado",
          "1 cenoura ralada",
          "1/2 pimentão vermelho picado",
          "1/4 xícara de folhas de hortelã picadas",
          "Suco de 1 limão",
          "2 colheres de sopa de azeite de oliva",
          "Sal e pimenta a gosto",
        ],
      },
      {
        name: "Frango Grelhado com Legumes Assados",
        kcal: "300 kcal",
       description: "",
        categoria: "Prático",
        image:
          "https://i.pinimg.com/736x/d7/4a/6e/d74a6eea99039ee959210f4c8e86ee7b.jpg",
        instructions: [
          "Tempere o frango com sal e pimenta.",
          "Grelhe o frango até estar bem cozido.",
          "Misture legumes com azeite, alecrim, sal e pimenta.",
          "Asse os legumes por 25-30 minutos.",
          "Sirva com o frango.",
        ],
        ingredients: [
          "2 peitos de frango",
          "1 abobrinha picada",
          "1 berinjela picada",
          "1 pimentão vermelho picado",
          "1 cebola roxa fatiada",
          "3 colheres de sopa de azeite de oliva",
          "1 colher de chá de alecrim seco",
          "Sal e pimenta a gosto",
        ],
      },
      {
        name: "Sopa de Lentilha",
      kcal: "280 kcal",
     description: "",
      categoria: "Leve",
      image:
        "https://i.pinimg.com/736x/e0/e7/70/e0e77038c93581a2512fa2f9353e4bd0.jpg",
      instructions: [
        "Refogue cebola e alho no azeite.",
        "Adicione cenoura, batata doce e lentilhas.",
        "Despeje o caldo de legumes e cozinhe até os legumes amolecerem.",
        "Tempere com sal e pimenta, retire o louro e sirva.",
      ],
      ingredients: [
       "Refogue cebola e alho no azeite.",
        "Adicione cenoura, batata doce e lentilhas.",
        "Despeje o caldo de legumes e cozinhe até os legumes amolecerem.",
        "Tempere com sal e pimenta, retire o louro e sirva.", 
      ]
      },
      {
        name: "Wrap de Abacate e Frango",
        kcal: "250 kcal",
        description: "",
        categoria: "Leve",
        image:
          "https://i.pinimg.com/736x/5c/81/37/5c8137dc11fb9f85d9dddc79c189afe6.jpg",
        instructions: [
          "Aqueça as tortillas.",
          "Tempere o frango com suco de limão, sal e pimenta.",
          "Coloque frango, abacate, tomate e alface em cada tortilla.",
          "Enrole e sirva.",
        ],
        ingredients: [
          "Aqueça as tortillas.",
          "Tempere o frango com suco de limão, sal e pimenta.",
          "Coloque frango, abacate, tomate e alface em cada tortilla.",
          "Enrole e sirva.",
        ]
        
      },
     

      // Adicione mais receitas de jantar se necessário
    ]
  };


  const categories = Object.keys(recipes);
  const currentRecipes = recipes[selectedCategory].slice(0, 6);

  return (
    <>
      <div className="container-dash">
        <Sidebar />


 <div className="principais">

  <div className="principais-direita">
     <div className="hea">
        <h1 className='titlereceita'> Receita do Dia </h1>
        <p className='subtitlereceita'> Descubra uma receita saudável e deliciosa para começar o seu dia com
        energia. </p>
      </div>

 <div className="menu-recipes">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              <FontAwesomeIcon icon={category === 'breakfast' ? faCoffee : category === 'lunch' ? faUtensils : faMoon} />
              {category === 'breakfast' ? 'Café da Manhã' : category === 'lunch' ? 'Almoço' : 'Jantar'}
            </button>
          ))}
        </div>


   <div className="cards-section">
          {currentRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card-container">
              <RecipeCard recipe={recipe} onClick={setSelectedRecipe} />
            </div>
          ))}
    
       
        </div>



  </div>

 

  <div className="detalhes">
        <RecipeDetails recipe={selectedRecipe} />
      </div>

 </div>
      
       


        
     
  </div>

      

  



     



    </>
  );
};

export default Recipes;
