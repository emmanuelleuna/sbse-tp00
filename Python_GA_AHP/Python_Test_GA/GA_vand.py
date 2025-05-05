import numpy as np
import random
from utils import *
import time

# Définition des compétences et des poids donnés par l'employeur
skills = [
    "Ability to work in different business units",
    "Past experience",
    "Team player",
    "Fluency in a foreign language",
    "Strategic thinking",
    "Oral communication skills",
    "Computer skills",
]
weights = np.array(
    [0.15, 0.20, 0.10, 0.10, 0.15, 0.15, 0.15]
)  # Importance des compétences

# Génération aléatoire des candidats (100 candidats, scores de 50 à 100 par compétence)
num_candidates = 100
population = np.random.randint(1, 50, (num_candidates, len(skills)))
original_population = population.copy()


# Fonction d'evaluation de chaque candidat
def fitness(candidate):
    return np.dot(candidate, weights)


def mutation(candidate, mutation_rate=1.0, mutation_type="swap"):
    """Appliquer une mutation au candidat selon le type spécifié"""
    if random.random() >= mutation_rate:
        return candidate  # Pas de mutation

    if mutation_type == "swap":
        idx1, idx2 = random.sample(range(len(candidate)), 2)
        candidate[idx1], candidate[idx2] = candidate[idx2], candidate[idx1]

    # elif mutation_type == "inversion":
    #     start, end = sorted(random.sample(range(len(candidate)), 2))
    #     candidate[start:end+1] = reversed(candidate[start:end+1])

    elif mutation_type == "shuffle":
        start, end = sorted(random.sample(range(len(candidate)), 2))
        sublist = candidate[start : end + 1]
        random.shuffle(sublist)
        candidate[start : end + 1] = sublist

    elif mutation_type == "random_reset":
        idx = random.randint(0, len(candidate) - 1)
        candidate[idx] = random.randint(1, 50)  # Competences du candidat

    elif mutation_type == "gaussian":
        idx = random.randint(0, len(candidate) - 1)
        candidate[idx] += int(np.random.normal(0, 1))  # Petite perturbation
        candidate[idx] = max(0, min(10, candidate[idx]))  # Clamp si nécessaire

    else:
        raise ValueError(f"Type de mutation inconnu : {mutation_type}")

    return candidate


def genetic_algorithm(max_generations=20, num_finalists=10):
    genomed = [0] * 8
    fig, ax, bars = init_display_genome()
    
    """Exécute l'algorithme génétique avec sélection aléatoire sur une moitié de la population"""
    global population

    mutation_types = ["swap", "shuffle", "random_reset", "gaussian"]
    for generation in range(max_generations):
        # print(f"Génération {generation + 1}")

        # Sélection de la moitié de la population aléatoirement
        selected_indices = np.random.choice(
            len(population), size=len(population) // 2, replace=False
        )
        selected_candidates = [population[i] for i in selected_indices]

        best_candidate = max(
            selected_candidates, key=fitness
        )  # Trouver le meilleur parmi eux

        new_population = [best_candidate]  # Conserver le meilleur sans modification
        for candidate in selected_candidates:
            if not np.array_equal(
                candidate, best_candidate
            ):  # Ne pas modifier le meilleur
                random_mutation_type = random.choice(mutation_types)
                mutated = mutation(candidate.copy(), mutation_type=random_mutation_type)
                new_population.append(mutated)
                genomed = update_genome_to_display(genomed, candidate.copy())
                

        # Complétion avec des candidats initiaux
        new_population_list = [c.tolist() for c in new_population]
        remaining_candidates = [
            c for c in original_population if c.tolist() not in new_population_list
        ]

        # Mélange aléatoire des candidats restants
        random.shuffle(remaining_candidates)

        # Completion
        new_population += remaining_candidates[
            : (num_candidates - len(new_population)) // 2
        ]

        # print(len(new_population))

        population = np.array(new_population)
        
        update_display(fig, ax, bars, genomed, (generation+1))
        time.sleep(0.5)
        # display_genome(genomed, generation)

    # Laisser le plot affiché
    plt.ioff()
    plt.show()
    
    # Trier la dernière génération selon la fitness
    population = sorted(population, key=fitness, reverse=True)

    # Sélection des 10 meilleurs pour AHP parmi ceux qui ont déposé leur CV
    population_list = [c.tolist() for c in population]
    final_candidates = [c for c in original_population if c.tolist() in population_list]

    finalists_mutate = sorted(population, key=fitness, reverse=True)[:num_finalists]
    finalists_including_init_candidates = sorted(
        final_candidates, key=fitness, reverse=True
    )[:num_finalists]

    return finalists_including_init_candidates, finalists_mutate


# Lancer l'algorithme génétique
# finalists, finalists_muted = genetic_algorithm()
