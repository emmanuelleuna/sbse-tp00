import matplotlib.pyplot as plt
import numpy as np
import ahpy

# Activer le mode interactif
plt.ion()

def update_genome_to_display(genomed, genome):
    for i in range(len(genome)):
        genomed[i + 1] += genome[i]
    genomed[0] += 1  # Incrémenter la taille
    return genomed

def init_display_genome():
    labels = [
        'Size', 
        'Gen1 (Travail multi-unités)', 
        'Gen2 (Expérience)', 
        'Gen3 (Esprit d’équipe)', 
        'Gen4 (Langue étrangère)', 
        'Gen5 (Stratégie)', 
        'Gen6 (Communication orale)', 
        'Gen7 (Informatique)'
    ]
    colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#9956FF', '#5BC0D0', '#46B2EA']

    fig, ax = plt.subplots(figsize=(12, 6))
    bars = ax.bar(labels, [0]*8, color=colors, edgecolor='black')
    ax.set_ylim(0, 1)
    ax.set_ylabel('Valeur normalisée')
    ax.set_xticklabels(labels, rotation=30, ha='right')
    ax.set_title('Genome Chart')
    ax.grid(True, axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.show()

    return fig, ax, bars

def update_display(fig, ax, bars, genome, generation):
    if genome[0] == 0:
        print("Division by zero avoided.")
        return

    normalized_genome = [
        genome[0] / 30,
        genome[1] / genome[0],
        genome[2] / genome[0],
        genome[3] / genome[0],
        genome[4] / genome[0],
        genome[5] / genome[0],
        genome[6] / genome[0],
        genome[7] / genome[0],
    ]

    for bar, new_height in zip(bars, normalized_genome):
        bar.set_height(new_height)

    ax.set_ylim(0, max(normalized_genome) * 1.2)
    ax.set_title(f'Genome Chart - Generation {generation}')
    fig.canvas.draw()
    fig.canvas.flush_events()

def ahp(GA_response):
    criteria_comparisons = {
        ("C_1", "C_2"): 2,
        ("C_1", "C_3"): 2,
        ("C_1", "C_4"): 4,
        ("C_1", "C_5"): 3,
        ("C_1", "C_6"): 2,
        ("C_1", "C_7"): 3,
        ("C_2", "C_3"): 1,
        ("C_2", "C_4"): 3,
        ("C_2", "C_5"): 2,
        ("C_2", "C_6"): 1,
        ("C_2", "C_7"): 2,
        ("C_3", "C_4"): 3,
        ("C_3", "C_5"): 2,
        ("C_3", "C_6"): 1,
        ("C_3", "C_7"): 2,
        ("C_4", "C_5"): 1/2,
        ("C_4", "C_6"): 1/3,
        ("C_4", "C_7"): 2,
        ("C_5", "C_6"): 1 / 2,
        ("C_5", "C_7"): 1,
        ("C_6", "C_7"): 2,
    }

    skills = ahpy.Compare(name='Skills', comparisons=criteria_comparisons, precision=3, random_index='saaty')
    # Fonction pour extraire le numéro du candidat
    def extract_number(key):
        return int(''.join(filter(str.isdigit, key)))

    # Tri par numéro croissant
    sorted_skills_weight = dict(sorted(skills.target_weights.items(), key=lambda item: extract_number(item[0])))

    final_skills_weight = np.array(list(sorted_skills_weight.values()))
    
    #Computing and ranking candidate using AHP
    ahp_selection = []
    for i, candidate in enumerate(GA_response):
        np_candidate = np.array(candidate)
        score = np.dot(np_candidate, final_skills_weight)
        ahp_selection.append((candidate.tolist(), score))

    # Trier la sélection AHP par score décroissant
    ahp_selection_sorted = sorted(ahp_selection, key=lambda x: x[1], reverse=True)
    
    return ahp_selection_sorted
