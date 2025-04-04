###################### First choice

# import numpy as np
# import random

# # Définition des compétences et des poids donnés par l'employeur
# skills = ['Ability to work in different business units', 'Past experience', 'Team player', 'Fluency in a foreign language', 'Strategic thinking', 'Oral communication skills', 'Computer skills']
# weights = np.array([0.15, 0.20, 0.10, 0.10, 0.15, 0.15, 0.15])  # Importance des compétences

# # Génération aléatoire des candidats (100 candidats, scores de 50 à 100 par compétence)
# num_candidates = 100
# population = np.random.randint(50, 100, (num_candidates, len(skills)))
# original_population = population.copy()  # On garde la population initiale
# print("original_population ==> ", original_population)

# def fitness(candidate):
#     """ Calcule la fitness d'un candidat en fonction des poids des compétences """
#     return np.dot(candidate, weights)

# def selection(population):
#     """ Sélectionne les meilleurs candidats réels """
#     scores = np.array([fitness(c) for c in population])
#     sorted_indices = np.argsort(scores)[::-1]  # Tri par fitness décroissante
#     print("population[sorted_indices] ==> ", population[sorted_indices])
#     return population[sorted_indices][:num_candidates // 2]  # Garde la moitié supérieure

# # def mutation(candidate, mutation_rate=0.1):
# #     """ Modifie légèrement un score de compétence (petite variation) """
# #     if random.random() < mutation_rate:
# #         idx = random.randint(0, len(candidate) - 1)
# #         candidate[idx] += random.randint(-3, 3)
# #         candidate[idx] = max(50, min(100, candidate[idx]))  # Garde les valeurs entre 50 et 100
# #     return candidate

# def mutation(candidate, mutation_rate=0.1):
#     """ Modifie légèrement un score de compétence en échangeant deux compétences """
#     if random.random() < mutation_rate:
#         idx1, idx2 = random.sample(range(len(candidate)), 2)  # Choisir deux indices au hasard
#         candidate[idx1], candidate[idx2] = candidate[idx2], candidate[idx1]  # Échange les valeurs
#     return candidate


# def genetic_algorithm(max_generations=50, num_finalists=10):
#     """ Exécute l'algorithme génétique en garantissant que seuls les candidats initiaux sont conservés """
#     global population
#     for generation in range(max_generations):
#         print(f"Génération {generation + 1}")
        
#         # Sélection des meilleurs candidats réels
#         selected = selection(population)
        
#         # Application de mutations légères (amélioration progressive)
#         new_population = [mutation(c.copy()) for c in selected]
#         new_population_list = [c.tolist() for c in new_population]  # Conversion pour comparaison
        
#         # Complétion avec uniquement des candidats de la population initiale non encore sélectionnés
#         remaining_candidates = [c for c in original_population if c.tolist() not in new_population_list]
#         new_population += remaining_candidates[:num_candidates - len(new_population)]
        
#         population = np.array(new_population)
        
#         # Vérification de convergence : Si les meilleurs scores stagnent
#         if np.std([fitness(c) for c in population]) < 1e-2:
#             print("Convergence atteinte, arrêt de l'évolution.")
#             break
    
#     # Sélection des candidats finaux pour AHP (parmi ceux d'origine uniquement)
#     population_list = [c.tolist() for c in population]
#     final_candidates = [c for c in original_population if c.tolist() in population_list]
#     finalists = sorted(final_candidates, key=fitness, reverse=True)[:num_finalists]
    
#     print("\nCandidats sélectionnés pour AHP:")
#     for i, f in enumerate(finalists):
#         print(f"Candidat {i+1}: {f}, Fitness = {fitness(f):.2f}")
#     return finalists

# # Lancer l'algorithme génétique
# finalists = genetic_algorithm()


##############Second choice
import numpy as np
import random

# Définition des compétences et des poids donnés par l'employeur
skills = ['Ability to work in different business units', 'Past experience', 'Team player', 'Fluency in a foreign language', 'Strategic thinking', 'Oral communication skills', 'Computer skills']
weights = np.array([0.15, 0.20, 0.10, 0.10, 0.15, 0.15, 0.15])  # Importance des compétences

# Génération aléatoire des candidats (100 candidats, scores de 50 à 100 par compétence)
num_candidates = 100
population = np.random.randint(1, 50, (num_candidates, len(skills)))
original_population = population.copy()  # On garde la population initiale


def fitness(candidate):
    """ Calcule la fitness d'un candidat en fonction des poids des compétences """
    return np.dot(candidate, weights)


def mutation(candidate, mutation_rate=1):
    """ Modifie légèrement un score de compétence en échangeant deux compétences """
    if random.random() < mutation_rate:
        idx1, idx2 = random.sample(range(len(candidate)), 2)  # Choisir deux indices au hasard
        candidate[idx1], candidate[idx2] = candidate[idx2], candidate[idx1]  # Échange les valeurs
    return candidate


def genetic_algorithm(max_generations=1, num_finalists=10):
    """ Exécute l'algorithme génétique avec sélection aléatoire sur une moitié de la population """
    global population
    
    for generation in range(max_generations):
        # print(f"Génération {generation + 1}")
        
        # Sélection de la moitié de la population aléatoirement
        selected_indices = np.random.choice(len(population), size=len(population) // 2, replace=False)
        selected_candidates = [population[i] for i in selected_indices]
        
        best_candidate = max(selected_candidates, key=fitness)  # Trouver le meilleur parmi eux
        
        new_population = [best_candidate]  # Conserver le meilleur sans modification
        for candidate in selected_candidates:
            if not np.array_equal(candidate, best_candidate):  # Ne pas modifier le meilleur
                new_population.append(mutation(candidate.copy()))
        
        # Complétion avec des candidats initiaux
        new_population_list = [c.tolist() for c in new_population]
        remaining_candidates = [c for c in original_population if c.tolist() not in new_population_list]
        new_population += remaining_candidates[:num_candidates - len(new_population)]
        
        population = np.array(new_population)
    
    # Trier la dernière génération selon la fitness
    population = sorted(population, key=fitness, reverse=True)
    
    # Sélection des 10 meilleurs pour AHP parmi ceux qui ont déposé leur CV
    population_list = [c.tolist() for c in population]
    final_candidates = [c for c in original_population if c.tolist() in population_list]

    finalists_mutate = sorted(population, key=fitness, reverse=True)[:num_finalists]
    finalists_including_init_candidates = sorted(final_candidates, key=fitness, reverse=True)[:num_finalists]
    
    print("\nDix meilleurs parmi ceux existant")
    for i, f in enumerate(finalists_including_init_candidates):
        print(f"Candidat {i+1}: {f}, Score_fitness = {fitness(f):.2f}")
    
    print("\nDix meilleurs parmi ceux mutés")
    for i, f in enumerate(finalists_mutate):
        print(f"Candidat {i+1}: {f}, Score_fitness = {fitness(f):.2f}")

    return finalists_including_init_candidates, finalists_mutate

# Lancer l'algorithme génétique
finalists = genetic_algorithm()



