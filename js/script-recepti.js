// Baza recepata
const recipes = {
    breakfast: {
                "Oatmeal with Chia Seeds and Blueberries": {
                    image: "pics/recipes/Breakfast/porridge.png",
                    content: `
                        <h3>Oatmeal with Chia Seeds and Blueberries</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>40 g oat flakes (whole grain)</li>
                            <li>1 teaspoon chia seeds</li>
                            <li>100 ml unsweetened almond milk (or regular low-fat milk)</li>
                            <li>50 g blueberries (fresh or frozen)</li>
                            <li>1 teaspoon walnuts (chopped)</li>
                            <li>A pinch of cinnamon</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Pour the oat flakes and milk into a saucepan and cook for 5 minutes over low heat.</li>
                            <li>Add the chia seeds and cinnamon, and stir.</li>
                            <li>Remove from heat, then top with blueberries and walnuts.</li>
                        </ol>
                    `
                },
                "Vegetable Omelet": {
                    image: "pics/recipes/Breakfast/Omelet_with_vegetables.png",
                    content: `
                        <h3>Vegetable Omelet</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>2 eggs</li>
                            <li>50 g fresh spinach</li>
                            <li>½ red bell pepper</li>
                            <li>50 g mushrooms</li>
                            <li>1 teaspoon olive oil</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Sauté the chopped mushrooms and peppers in a pan.</li>
                            <li>Add the spinach and sauté briefly.</li>
                            <li>Beat the eggs, pour over the vegetables and cook until set.</li>
                        </ol>
                    `
                },
                "Whole Wheat Toast with Avocado and Boiled Egg": {
                    image: "pics/recipes/Breakfast/Whole_Grain_Toast.png",
                    content: `
                        <h3>Whole Wheat Toast with Avocado and Boiled Egg</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>1 slice of whole wheat bread</li>
                            <li>½ avocado</li>
                            <li>1 boiled egg</li>
                            <li>A few drops of lemon juice</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Toast the bread in a toaster.</li>
                            <li>Mash the avocado with a fork, add a little lemon juice and salt.</li>
                            <li>Spread on the toast and top with the sliced boiled egg.</li>
                        </ol>
                    `
                },
                "Greek Yogurt with Walnuts and Flaxseed": {
                    image: "pics/recipes/Breakfast/Greek_Yogurt.png",
                    content: `
                        <h3>Greek Yogurt with Walnuts and Flaxseed</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>150 g Greek yogurt (no added sugar)</li>
                            <li>1 tablespoon ground flaxseed</li>
                            <li>20 g walnuts or almonds</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Pour the yogurt into a bowl.</li>
                            <li>Add the flaxseed and chopped nuts.</li>
                            <li>Stir gently and serve cold.</li>
                        </ol>
                    `
                }
            },
            lunch: {
                "Grilled Chicken with Steamed Vegetables": {
                    image: "pics/recipes/Lunch/grilled_chicken.png",
                    content: `
                        <h3>Grilled Chicken with Steamed Vegetables</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>150 g chicken breast</li>
                            <li>100 g broccoli</li>
                            <li>1 carrot</li>
                            <li>1 small zucchini</li>
                            <li>1 teaspoon olive oil</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Season the chicken breast with salt, place on a grill pan, and cook for 4–5 minutes on each side.</li>
                            <li>Steam the vegetables for 5–7 minutes.</li>
                            <li>Drizzle everything with olive oil and serve.</li>
                        </ol>
                    `
                },
                "Baked Salmon with Quinoa Salad": {
                    image: "pics/recipes/Lunch/Oven-baked_salmon.png",
                    content: `
                        <h3>Baked Salmon with Quinoa Salad</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>150 g salmon fillet</li>
                            <li>½ lemon</li>
                            <li>1 clove of garlic</li>
                            <li>50 g quinoa</li>
                            <li>½ cucumber</li>
                            <li>1 tomato</li>
                            <li>Olive oil, salt, pepper</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Season the salmon with lemon, garlic, and bake in the oven at 180°C (350°F) for about 15 minutes.</li>
                            <li>Cook the quinoa in salted water (1:2 ratio).</li>
                            <li>Mix the quinoa with the chopped cucumber and tomato, and add a teaspoon of oil.</li>
                        </ol>
                    `
                },
                "Turkey Vegetable Soup": {
                    image: "pics/recipes/Lunch/Turkey_soup.png",
                    content: `
                        <h3>Turkey Vegetable Soup</h3>
                        <p><b>Ingredients (2 servings):</b></p>
                        <ul>
                            <li>200 g turkey breast</li>
                            <li>1 carrot</li>
                            <li>1 celery root (small)</li>
                            <li>1 zucchini</li>
                            <li>A little parsley</li>
                            <li>Salt, pepper</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Boil the turkey in water for about 20 minutes.</li>
                            <li>Add the chopped vegetables and cook for another 15 minutes.</li>
                            <li>Finally, add the chopped parsley.</li>
                        </ol>
                    `
                },
                "Whole Wheat Pasta with Vegetables and Tuna": {
                    image: "pics/recipes/Lunch/pasta.png",
                    content: `
                        <h3>Whole Wheat Pasta with Vegetables and Tuna</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>70 g whole wheat pasta</li>
                            <li>1 small zucchini</li>
                            <li>½ red bell pepper</li>
                            <li>1 can of tuna in water (80 g)</li>
                            <li>1 teaspoon olive oil</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Cook the pasta according to the instructions.</li>
                            <li>Chop and briefly sauté the vegetables in oil.</li>
                            <li>Add the tuna and pasta, and mix.</li>
                        </ol>
                    `
                }
            },
            dinner: {
                "Chicken and Vegetable Salad": {
                    image: "pics/recipes/Dinner/Chicken_salad.png",
                    content: `
                        <h3>Chicken and Vegetable Salad</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>100 g cooked chicken breast</li>
                            <li>1 tomato</li>
                            <li>½ cucumber</li>
                            <li>Arugula or green lettuce</li>
                            <li>30 g feta cheese</li>
                            <li>Olive oil</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Cut the chicken into pieces.</li>
                            <li>Add the vegetables and arugula to a bowl.</li>
                            <li>Crumble the feta cheese on top and drizzle with oil.</li>
                        </ol>
                    `
                },
                "Baked Mackerel with Green Vegetables": {
                    image: "pics/recipes/Dinner/fish.png",
                    content: `
                        <h3>Baked Mackerel with Green Vegetables</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>150 g mackerel</li>
                            <li>1 clove of garlic</li>
                            <li>100 g broccoli</li>
                            <li>100 g Swiss chard</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Season the fish with salt and lemon, then bake in the oven at 180°C (350°F) for 20 minutes.</li>
                            <li>Boil the vegetables and season with garlic and olive oil.</li>
                        </ol>
                    `
                },
                "Zucchini Boats Stuffed with Ground Meat and Vegetables": {
                    image: "pics/recipes/Dinner/zucchini.png",
                    content: `
                        <h3>Zucchini Boats Stuffed with Ground Meat and Vegetables</h3>
                        <p><b>Ingredients (2 servings):</b></p>
                        <ul>
                            <li>2 zucchinis</li>
                            <li>200 g ground turkey or beef</li>
                            <li>1 onion</li>
                            <li>1 tomato</li>
                            <li>Salt, pepper</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Cut the zucchinis in half lengthwise and scoop out the centers.</li>
                            <li>Sauté the onion, meat, and tomato in a pan.</li>
                            <li>Stuff the zucchinis, place them on a baking sheet, and bake for 20 minutes at 200°C (390°F).</li>
                        </ol>
                    `
                },
                "Cheese and Vegetable Omelet": {
                    image: "pics/recipes/Dinner/omelet.png",
                    content: `
                        <h3>Cheese and Vegetable Omelet</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>2 eggs</li>
                            <li>50 g vegetables (onion, bell pepper, tomato)</li>
                            <li>20 g reduced-fat cheese</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Briefly sauté the vegetables.</li>
                            <li>Add the beaten eggs and cook like a classic omelet.</li>
                            <li>Sprinkle with cheese at the end.</li>
                        </ol>
                    `
                }
            },
            dessert: {
                "Chia Pudding with Coconut and Raspberries": {
                    image: "pics/recipes/Desert/chia_pudding.png",
                    content: `
                        <h3>Chia Pudding with Coconut and Raspberries</h3>
                        <p><b>Ingredients (1 serving):</b></p>
                        <ul>
                            <li>2 tablespoons chia seeds</li>
                            <li>150 ml coconut milk (unsweetened)</li>
                            <li>50 g raspberries</li>
                            <li>Stevia to taste</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Pour the coconut milk over the chia seeds and leave in the refrigerator for 2–3 hours.</li>
                            <li>Top with raspberries and a little stevia.</li>
                        </ol>
                    `
                },
                "Oat and Banana Cookies": {
                    image: "pics/recipes/Desert/bananna_cookies.png",
                    content: `
                        <h3>Oat and Banana Cookies</h3>
                        <p><b>Ingredients (8 pieces):</b></p>
                        <ul>
                            <li>2 ripe bananas</li>
                            <li>150 g oat flakes</li>
                            <li>50 g walnuts</li>
                            <li>1 teaspoon cinnamon</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Mash the bananas, add the oat flakes and cinnamon.</li>
                            <li>Mix into a dough, add the chopped walnuts.</li>
                            <li>Form cookies and bake for 15 minutes at 180°C (350°F).</li>
                        </ol>
                    `
                },
                "Flourless Protein Chocolate Cake": {
                    image: "pics/recipes/Desert/protein_chocolate_cake.png",
                    content: `
                        <h3>Flourless Protein Chocolate Cake</h3>
                        <p><b>Ingredients (2 servings):</b></p>
                        <ul>
                            <li>2 eggs</li>
                            <li>2 tablespoons cocoa powder</li>
                            <li>2 tablespoons almond flour</li>
                            <li>1 teaspoon stevia</li>
                            <li>2 tablespoons Greek yogurt</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Whisk the eggs with stevia.</li>
                            <li>Add the cocoa and almond flour.</li>
                            <li>Finally, mix in the yogurt and bake in a small pan for 15 minutes at 180°C (350°F).</li>
                        </ol>
                    `
                },
                "Baked Apples with Walnuts and Cinnamon": {
                    image: "pics/recipes/Desert/apples.png",
                    content: `
                        <h3>Baked Apples with Walnuts and Cinnamon</h3>
                        <p><b>Ingredients (2 servings):</b></p>
                        <ul>
                            <li>2 apples</li>
                            <li>40 g walnuts</li>
                            <li>1 teaspoon cinnamon</li>
                        </ul>
                        <p><b>Preparation:</b></p>
                        <ol>
                            <li>Cut the apples in half and scoop out the core.</li>
                            <li>Stuff with chopped walnuts and cinnamon.</li>
                            <li>Bake for 20 minutes at 180°C (350°F).</li>
                        </ol>
                    `
                }
            }
};

// DOM elementi
const mealType = document.getElementById("meal-type");
const mealRecipe = document.getElementById("meal-recipe");
const recipeContent = document.getElementById("recipe-text");

// Kada se promeni tip obroka
mealType.addEventListener("change", () => {
    const type = mealType.value;
    mealRecipe.innerHTML = `<option value="">-- Izaberi recept --</option>`;
    mealRecipe.disabled = !type;

    if (type && recipes[type]) {
        Object.keys(recipes[type]).forEach(recipeName => {
            const opt = document.createElement("option");
            opt.value = recipeName;
            opt.textContent = recipeName;
            mealRecipe.appendChild(opt);
        });
    }
    // Scroll do menija i recepta
    if (type) {
        recipeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Kada se izabere recept
        mealRecipe.addEventListener("change", () => {
            const type = mealType.value;
            const selected = mealRecipe.value;
            if (type && selected && recipes[type][selected]) {
                const recipe = recipes[type][selected];
                recipeContent.innerHTML = `
                    <img src="${recipe.image}" alt="${selected}" class="recipe-image">
                    ${recipe.content}
                `;
            }
            // Scroll do recepta
        recipeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

// Klik na karticu (sliku)
document.querySelectorAll(".meal-card").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.meal;
        mealType.value = type;
        mealType.dispatchEvent(new Event("change"));
        recipeContent.innerHTML = `<h2>Izaberite recept iz menija za ${type} 🍴</h2>`;

        // Scroll do recepta nakon prikaza
        recipeContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
